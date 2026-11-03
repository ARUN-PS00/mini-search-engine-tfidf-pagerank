import { WIKIPEDIA_CORPUS, BENCHMARK_QUERIES } from './src/data/corpus.js';
import { InvertedIndex } from './src/js/invertedIndex.js';
import { PageRankCalculator } from './src/js/pagerank.js';
import { SearchEngine } from './src/js/searchEngine.js';
import { performance } from 'perf_hooks';
import os from 'os';

console.log('=== RIGOROUS BENCHMARK EXECUTION ===');

// System specs
console.log(`Node.js: ${process.version}`);
console.log(`OS: ${os.type()} ${os.release()} (${os.arch()})`);
console.log(`CPU: ${os.cpus()[0].model} (${os.cpus().length} cores)`);
console.log(`Memory: ${(os.totalmem() / (1024**3)).toFixed(2)} GB`);

// Initialize components (excluded from search timing)
const index = new InvertedIndex(WIKIPEDIA_CORPUS);
const pageRank = new PageRankCalculator(WIKIPEDIA_CORPUS, 0.85);
const searchEngine = new SearchEngine(WIKIPEDIA_CORPUS, index, pageRank);

const algorithms = [
  { id: 'boolean_and', name: 'Boolean (AND)', run: q => searchEngine.searchBoolean(q, 'AND') },
  { id: 'boolean_or', name: 'Boolean (OR)', run: q => searchEngine.searchBoolean(q, 'OR') },
  { id: 'tfidf', name: 'TF-IDF', run: q => searchEngine.searchTfIdf(q) },
  { id: 'hybrid', name: 'TF-IDF + PageRank', run: q => searchEngine.searchPageRankHybrid(q, 0.70, 0.30) }
];

// Warm-up runs (5 iterations across all queries)
console.log('Executing 5 warm-up cycles across all 30 queries...');
for (let w = 0; w < 5; w++) {
  for (const bq of BENCHMARK_QUERIES) {
    for (const algo of algorithms) {
      algo.run(bq.query);
    }
  }
}
console.log('Warm-up completed.');

// Benchmark parameters
const REPETITIONS = 10;
console.log(`Running ${REPETITIONS} measured repetitions per query across all algorithms...`);

const perQueryResults = [];
const algoAggregates = {};
algorithms.forEach(a => {
  algoAggregates[a.id] = {
    name: a.name,
    precisions: [],
    medianLatencies: [],
    allLatencies: []
  };
});

for (let qIdx = 0; qIdx < BENCHMARK_QUERIES.length; qIdx++) {
  const bq = BENCHMARK_QUERIES[qIdx];
  const groundTruth = new Set(bq.relevantDocIds);
  const qEntry = {
    queryId: bq.id,
    category: bq.category,
    query: bq.query,
    description: bq.description,
    totalRelevant: bq.relevantDocIds.length,
    methods: {}
  };

  for (const algo of algorithms) {
    const runTimes = [];
    let searchResult = null;

    for (let r = 0; r < REPETITIONS; r++) {
      const t0 = performance.now();
      const res = algo.run(bq.query);
      const t1 = performance.now();
      runTimes.push(t1 - t0);
      if (r === 0) searchResult = res;
    }

    // Sort runTimes to calculate median
    runTimes.sort((a, b) => a - b);
    const mid = Math.floor(runTimes.length / 2);
    const medianTime = runTimes.length % 2 !== 0
      ? runTimes[mid]
      : (runTimes[mid - 1] + runTimes[mid]) / 2;

    const top10 = searchResult.results.slice(0, 10);
    let relevantCount = 0;
    top10.forEach(d => {
      if (groundTruth.has(d.id)) relevantCount++;
    });
    const pAt10 = relevantCount / 10.0;

    qEntry.methods[algo.id] = {
      precisionAt10: pAt10,
      relevantFoundInTop10: relevantCount,
      totalRetrieved: top10.length,
      medianTimeMs: Number(medianTime.toFixed(4)),
      allTimesMs: runTimes.map(t => Number(t.toFixed(4))),
      topDocs: top10.map(d => ({ id: d.id, title: d.title, score: d.score }))
    };

    algoAggregates[algo.id].precisions.push(pAt10);
    algoAggregates[algo.id].medianLatencies.push(medianTime);
    algoAggregates[algo.id].allLatencies.push(...runTimes);
  }

  perQueryResults.push(qEntry);
}

// Calculate summary stats
console.log('\n=== EVALUATION RESULTS SUMMARY ===\n');

const summaryTable = [];

algorithms.forEach(algo => {
  const agg = algoAggregates[algo.id];
  const meanP10 = agg.precisions.reduce((a, b) => a + b, 0) / agg.precisions.length;
  
  // Overall median of per-query medians
  const sortedMedians = [...agg.medianLatencies].sort((a, b) => a - b);
  const midMed = Math.floor(sortedMedians.length / 2);
  const overallMedian = sortedMedians.length % 2 !== 0
    ? sortedMedians[midMed]
    : (sortedMedians[midMed - 1] + sortedMedians[midMed]) / 2;

  // Also median of ALL measured runs
  const sortedAll = [...agg.allLatencies].sort((a, b) => a - b);
  const midAll = Math.floor(sortedAll.length / 2);
  const pooledMedian = sortedAll.length % 2 !== 0
    ? sortedAll[midAll]
    : (sortedAll[midAll - 1] + sortedAll[midAll]) / 2;

  const meanLatency = agg.allLatencies.reduce((a, b) => a + b, 0) / agg.allLatencies.length;
  const minLatency = Math.min(...agg.allLatencies);
  const maxLatency = Math.max(...agg.allLatencies);

  summaryTable.push({
    id: algo.id,
    name: algo.name,
    meanPrecisionAt10: Number(meanP10.toFixed(4)),
    medianLatencyMs: Number(overallMedian.toFixed(4)),
    pooledMedianLatencyMs: Number(pooledMedian.toFixed(4)),
    meanLatencyMs: Number(meanLatency.toFixed(4)),
    minLatencyMs: Number(minLatency.toFixed(4)),
    maxLatencyMs: Number(maxLatency.toFixed(4))
  });
});

console.table(summaryTable);

