import { WIKIPEDIA_CORPUS, BENCHMARK_QUERIES } from './src/data/corpus.js';
import { InvertedIndex } from './src/js/invertedIndex.js';
import { PageRankCalculator } from './src/js/pagerank.js';
import { SearchEngine } from './src/js/searchEngine.js';
import { performance } from 'perf_hooks';

const index = new InvertedIndex(WIKIPEDIA_CORPUS);
const pageRank = new PageRankCalculator(WIKIPEDIA_CORPUS, 0.85);
const searchEngine = new SearchEngine(WIKIPEDIA_CORPUS, index, pageRank);

const algorithms = [
  { id: 'boolean_and', name: 'Boolean (AND)', run: q => searchEngine.searchBoolean(q, 'AND') },
  { id: 'boolean_or', name: 'Boolean (OR)', run: q => searchEngine.searchBoolean(q, 'OR') },
  { id: 'tfidf', name: 'TF-IDF', run: q => searchEngine.searchTfIdf(q) },
  { id: 'hybrid', name: 'TF-IDF + PageRank', run: q => searchEngine.searchPageRankHybrid(q, 0.70, 0.30) }
];

// Warm up 10 cycles
for (let w = 0; w < 10; w++) {
  for (const bq of BENCHMARK_QUERIES) {
    for (const algo of algorithms) {
      algo.run(bq.query);
    }
  }
}

const REPETITIONS = 15;
// Record measurements: queryId -> algoId -> array of times
const measurements = {};
BENCHMARK_QUERIES.forEach(bq => {
  measurements[bq.id] = {};
  algorithms.forEach(a => {
    measurements[bq.id][a.id] = [];
  });
});

for (let r = 0; r < REPETITIONS; r++) {
  for (const bq of BENCHMARK_QUERIES) {
    for (const algo of algorithms) {
      const t0 = performance.now();
      algo.run(bq.query);
      const t1 = performance.now();
      measurements[bq.id][algo.id].push(t1 - t0);
    }
  }
}

console.log('Interleaved 15 repetitions results:');
algorithms.forEach(algo => {
  const queryMedians = [];
  const allTimes = [];
  BENCHMARK_QUERIES.forEach(bq => {
    const times = [...measurements[bq.id][algo.id]].sort((a, b) => a - b);
    const mid = Math.floor(times.length / 2);
    const med = times.length % 2 !== 0 ? times[mid] : (times[mid - 1] + times[mid]) / 2;
    queryMedians.push(med);
    allTimes.push(...times);
  });

  queryMedians.sort((a, b) => a - b);
  const midQ = Math.floor(queryMedians.length / 2);
  const medianOfMedians = queryMedians.length % 2 !== 0 ? queryMedians[midQ] : (queryMedians[midQ - 1] + queryMedians[midQ]) / 2;

  allTimes.sort((a, b) => a - b);
  const midA = Math.floor(allTimes.length / 2);
  const pooledMedian = allTimes.length % 2 !== 0 ? allTimes[midA] : (allTimes[midA - 1] + allTimes[midA]) / 2;
  const meanTime = allTimes.reduce((a, b) => a + b, 0) / allTimes.length;

  console.log(`${algo.name.padEnd(20)}: Median of Medians = ${medianOfMedians.toFixed(4)} ms | Pooled Median = ${pooledMedian.toFixed(4)} ms | Mean = ${meanTime.toFixed(4)} ms`);
});

