import { WIKIPEDIA_CORPUS, BENCHMARK_QUERIES } from './src/data/corpus.js';
import { InvertedIndex } from './src/js/invertedIndex.js';
import { PageRankCalculator } from './src/js/pagerank.js';
import { SearchEngine } from './src/js/searchEngine.js';
import { performance } from 'perf_hooks';
import os from 'os';
import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('  MINI SEARCH ENGINE - COMPREHENSIVE BENCHMARK EVALUATION');
console.log('================================================================\n');

// 1. Hardware & Environment Telemetry
const envInfo = {
  date: new Date().toISOString(),
  localTime: new Date().toLocaleString(),
  nodeVersion: process.version,
  v8Version: process.versions.v8,
  osType: os.type(),
  osRelease: os.release(),
  osPlatform: os.platform(),
  osArch: os.arch(),
  cpuModel: os.cpus()[0].model,
  cpuCores: os.cpus().length,
  cpuSpeedMhz: os.cpus()[0].speed,
  totalMemoryBytes: os.totalmem(),
  totalMemoryGB: Number((os.totalmem() / (1024 ** 3)).toFixed(2)),
  freeMemoryGB: Number((os.freemem() / (1024 ** 3)).toFixed(2))
};

console.log('Environment Specifications:');
console.log(`  OS: ${envInfo.osType} ${envInfo.osRelease} (${envInfo.osArch})`);
console.log(`  CPU: ${envInfo.cpuModel} (${envInfo.cpuCores} threads)`);
console.log(`  RAM: ${envInfo.totalMemoryGB} GB total (${envInfo.freeMemoryGB} GB free)`);
console.log(`  Runtime: Node.js ${envInfo.nodeVersion} (V8 ${envInfo.v8Version})`);
console.log(`  Timestamp: ${envInfo.date}\n`);

// 2. Initialize Models & Indexing (Strictly outside timing loops)
const tIdx0 = performance.now();
const index = new InvertedIndex(WIKIPEDIA_CORPUS);
const tIdx1 = performance.now();

const tPr0 = performance.now();
const pageRank = new PageRankCalculator(WIKIPEDIA_CORPUS, 0.85, 100, 1e-6);
const tPr1 = performance.now();

const searchEngine = new SearchEngine(WIKIPEDIA_CORPUS, index, pageRank);
const prSummary = pageRank.getGraphSummary();

const datasetMetadata = {
  name: "Curated Simple English Wikipedia Knowledge Corpus",
  totalDocuments: WIKIPEDIA_CORPUS.length,
  totalVocabularySize: index.getVocabSize(),
  graphNodes: prSummary.totalNodes,
  graphEdges: prSummary.totalEdges,
  pageRankDampingFactor: prSummary.dampingFactor,
  pageRankIterationsToConvergence: prSummary.iterationsCompleted,
  pageRankConverged: prSummary.converged,
  indexBuildTimeMs: Number((tIdx1 - tIdx0).toFixed(2)),
  pageRankComputeTimeMs: Number((tPr1 - tPr0).toFixed(2))
};

console.log('Dataset & Index Topology:');
console.log(`  Total Documents (N): ${datasetMetadata.totalDocuments}`);
console.log(`  Unique Vocabulary Terms: ${datasetMetadata.totalVocabularySize}`);
console.log(`  Hyperlink Graph: ${datasetMetadata.graphNodes} nodes, ${datasetMetadata.graphEdges} edges`);
console.log(`  PageRank Convergence: ${datasetMetadata.pageRankConverged} in ${datasetMetadata.pageRankIterationsToConvergence} iterations (d=0.85)`);
console.log(`  Index Build Time: ${datasetMetadata.indexBuildTimeMs} ms, PageRank Calc Time: ${datasetMetadata.pageRankComputeTimeMs} ms\n`);

// 3. Define Algorithms to Compare
const algorithms = [
  { id: 'boolean_and', name: 'Boolean (AND)', run: q => searchEngine.searchBoolean(q, 'AND') },
  { id: 'boolean_or', name: 'Boolean (OR)', run: q => searchEngine.searchBoolean(q, 'OR') },
  { id: 'tfidf', name: 'TF-IDF Vector Space', run: q => searchEngine.searchTfIdf(q) },
  { id: 'hybrid', name: 'TF-IDF + PageRank Hybrid (0.70 / 0.30)', run: q => searchEngine.searchPageRankHybrid(q, 0.70, 0.30) }
];

// 4. Warm-Up Runs (5 full iterations across all 30 queries)
console.log('Executing 5 warm-up passes across all 30 queries...');
for (let w = 0; w < 5; w++) {
  for (const bq of BENCHMARK_QUERIES) {
    for (const algo of algorithms) {
      algo.run(bq.query);
    }
  }
}
console.log('Warm-up completed successfully.\n');

// 5. Benchmark Measurement Configuration
const NUM_REPETITIONS = 20;
console.log(`Executing Benchmark: ${BENCHMARK_QUERIES.length} queries × ${algorithms.length} algorithms × ${NUM_REPETITIONS} repetitions = ${BENCHMARK_QUERIES.length * algorithms.length * NUM_REPETITIONS} runs...`);

// Data structures for results
const queryMeasurements = {};
BENCHMARK_QUERIES.forEach(bq => {
  queryMeasurements[bq.id] = {
    queryInfo: bq,
    groundTruthSet: new Set(bq.relevantDocIds),
    algoRuns: {}
  };
  algorithms.forEach(a => {
    queryMeasurements[bq.id].algoRuns[a.id] = {
      latencies: [],
      lastResult: null
    };
  });
});

// Interleaved repetition runs to eliminate cache bias
for (let rep = 0; rep < NUM_REPETITIONS; rep++) {
  for (const bq of BENCHMARK_QUERIES) {
    for (const algo of algorithms) {
      const t0 = performance.now();
      const res = algo.run(bq.query);
      const t1 = performance.now();
      queryMeasurements[bq.id].algoRuns[algo.id].latencies.push(t1 - t0);
      if (rep === NUM_REPETITIONS - 1) {
        queryMeasurements[bq.id].algoRuns[algo.id].lastResult = res;
      }
    }
  }
}

console.log('All benchmark runs completed. Aggregating statistics...\n');

// 6. Aggregate Statistics
function calculateMedian(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function calculateMean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calculateStdDev(arr, mean) {
  const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

const detailedQueries = [];
const categoryAggregates = {};
const algoOverall = {};

algorithms.forEach(a => {
  algoOverall[a.id] = {
    id: a.id,
    name: a.name,
    precisions: [],
    queryMedianLatencies: [],
    allLatencies: []
  };
});

BENCHMARK_QUERIES.forEach(bq => {
  const qData = queryMeasurements[bq.id];
  const cat = bq.category;

  if (!categoryAggregates[cat]) {
    categoryAggregates[cat] = {
      category: cat,
      queryCount: 0,
      precisions: { boolean_and: [], boolean_or: [], tfidf: [], hybrid: [] },
      latencies: { boolean_and: [], boolean_or: [], tfidf: [], hybrid: [] }
    };
  }
  categoryAggregates[cat].queryCount++;

  const queryDetail = {
    id: bq.id,
    category: bq.category,
    query: bq.query,
    description: bq.description,
    relevantDocIds: bq.relevantDocIds,
    totalRelevantInCorpus: bq.relevantDocIds.length,
    results: {}
  };

  algorithms.forEach(algo => {
    const runInfo = qData.algoRuns[algo.id];
    const latencies = runInfo.latencies;
    const medLat = calculateMedian(latencies);
    const meanLat = calculateMean(latencies);
    const res = runInfo.lastResult;
    const top10 = res.results.slice(0, 10);

    let relevantFound = 0;
    top10.forEach(d => {
      if (qData.groundTruthSet.has(d.id)) relevantFound++;
    });

    // Precision@10: relevant in top 10 / 10
    const pAt10 = relevantFound / 10.0;

    queryDetail.results[algo.id] = {
      retrievedCount: top10.length,
      relevantFoundInTop10: relevantFound,
      precisionAt10: Number(pAt10.toFixed(4)),
      medianLatencyMs: Number(medLat.toFixed(4)),
      meanLatencyMs: Number(meanLat.toFixed(4)),
      allLatenciesMs: latencies.map(l => Number(l.toFixed(4))),
      top10Docs: top10.map((d, rank) => ({
        rank: rank + 1,
        id: d.id,
        title: d.title,
        score: Number(d.score.toFixed(4)),
        isRelevant: qData.groundTruthSet.has(d.id)
      }))
    };

    algoOverall[algo.id].precisions.push(pAt10);
    algoOverall[algo.id].queryMedianLatencies.push(medLat);
    algoOverall[algo.id].allLatencies.push(...latencies);

    categoryAggregates[cat].precisions[algo.id].push(pAt10);
    categoryAggregates[cat].latencies[algo.id].push(medLat);
  });

  detailedQueries.push(queryDetail);
});

// Summary by algorithm
const summaryByAlgorithm = {};
algorithms.forEach(algo => {
  const aData = algoOverall[algo.id];
  const meanP10 = calculateMean(aData.precisions);
  const stdP10 = calculateStdDev(aData.precisions, meanP10);
  const medianOfMedians = calculateMedian(aData.queryMedianLatencies);
  const pooledMedian = calculateMedian(aData.allLatencies);
  const meanLat = calculateMean(aData.allLatencies);
  const stdLat = calculateStdDev(aData.allLatencies, meanLat);
  const minLat = Math.min(...aData.allLatencies);
  const maxLat = Math.max(...aData.allLatencies);

  summaryByAlgorithm[algo.id] = {
    id: algo.id,
    name: algo.name,
    meanPrecisionAt10: Number(meanP10.toFixed(4)),
    stdPrecisionAt10: Number(stdP10.toFixed(4)),
    medianLatencyMs: Number(medianOfMedians.toFixed(4)),
    pooledMedianLatencyMs: Number(pooledMedian.toFixed(4)),
    meanLatencyMs: Number(meanLat.toFixed(4)),
    stdLatencyMs: Number(stdLat.toFixed(4)),
    minLatencyMs: Number(minLat.toFixed(4)),
    maxLatencyMs: Number(maxLat.toFixed(4))
  };
});

// Category Summary
const categorySummary = {};
Object.entries(categoryAggregates).forEach(([cat, cData]) => {
  categorySummary[cat] = {
    category: cat,
    queryCount: cData.queryCount,
    meanPrecisionAt10: {
      boolean_and: Number(calculateMean(cData.precisions.boolean_and).toFixed(4)),
      boolean_or: Number(calculateMean(cData.precisions.boolean_or).toFixed(4)),
      tfidf: Number(calculateMean(cData.precisions.tfidf).toFixed(4)),
      hybrid: Number(calculateMean(cData.precisions.hybrid).toFixed(4))
    },
    medianLatencyMs: {
      boolean_and: Number(calculateMedian(cData.latencies.boolean_and).toFixed(4)),
      boolean_or: Number(calculateMedian(cData.latencies.boolean_or).toFixed(4)),
      tfidf: Number(calculateMedian(cData.latencies.tfidf).toFixed(4)),
      hybrid: Number(calculateMedian(cData.latencies.hybrid).toFixed(4))
    }
  };
});

// Best performing method
const bestP10Algo = Object.values(summaryByAlgorithm).reduce((prev, curr) => curr.meanPrecisionAt10 > prev.meanPrecisionAt10 ? curr : prev);
const fastestAlgo = Object.values(summaryByAlgorithm).reduce((prev, curr) => curr.medianLatencyMs < prev.medianLatencyMs ? curr : prev);

const evaluationSummary = {
  metadata: {
    title: "Mini Search Engine Comparative Evaluation Summary",
    project: "Mini Search Engine Using TF-IDF and PageRank: A Comparative Study of Text Retrieval and Link-Based Ranking",
    date: envInfo.date,
    environment: envInfo,
    dataset: datasetMetadata,
    benchmarkParameters: {
      totalQueries: BENCHMARK_QUERIES.length,
      categoriesCount: Object.keys(categorySummary).length,
      warmUpCycles: 5,
      measuredRepetitionsPerQuery: NUM_REPETITIONS,
      totalTimedExecutions: BENCHMARK_QUERIES.length * algorithms.length * NUM_REPETITIONS,
      evaluationMetric: "Precision@10 (Number of relevant documents in top 10 / 10)",
      timingBoundary: "Search execution only (excludes dataset loading, indexing, and UI rendering)"
    }
  },
  keyFindings: {
    bestPrecisionAt10Method: {
      name: bestP10Algo.name,
      id: bestP10Algo.id,
      meanPrecisionAt10: bestP10Algo.meanPrecisionAt10
    },
    fastestMethodByMedianLatency: {
      name: fastestAlgo.name,
      id: fastestAlgo.id,
      medianLatencyMs: fastestAlgo.medianLatencyMs
    }
  },
  summaryByAlgorithm,
  categorySummary,
  detailedQueries
};

// 7. Write evaluation_summary.json
const jsonPath = path.resolve('evaluation_summary.json');
fs.writeFileSync(jsonPath, JSON.stringify(evaluationSummary, null, 2), 'utf-8');
console.log(`Saved evaluation summary to: ${jsonPath}`);

// 8. Generate evaluation_results.csv
const csvRows = [];
// Header
csvRows.push(['Query_ID', 'Category', 'Query_Text', 'Algorithm', 'Retrieved_Top10_Count', 'Relevant_Found_Top10', 'Precision@10', 'Median_Latency_ms', 'Mean_Latency_ms', 'Min_Latency_ms', 'Max_Latency_ms'].join(','));

// Per query detailed rows
detailedQueries.forEach(q => {
  algorithms.forEach(algo => {
    const r = q.results[algo.id];
    csvRows.push([
      `"${q.id}"`,
      `"${q.category}"`,
      `"${q.query.replace(/"/g, '""')}"`,
      `"${algo.name}"`,
      r.retrievedCount,
      r.relevantFoundInTop10,
      r.precisionAt10,
      r.medianLatencyMs,
      r.meanLatencyMs,
      Math.min(...r.allLatenciesMs),
      Math.max(...r.allLatenciesMs)
    ].join(','));
  });
});

// Spacer & Summary Section
csvRows.push('');
csvRows.push(['# SUMMARY COMPARISON TABLE ACROSS ALL 30 BENCHMARK QUERIES'].join(','));
csvRows.push(['Algorithm_ID', 'Algorithm_Name', 'Mean_Precision@10', 'StdDev_Precision@10', 'Median_Response_Time_ms', 'Pooled_Median_Latency_ms', 'Mean_Response_Time_ms', 'Min_Latency_ms', 'Max_Latency_ms'].join(','));

algorithms.forEach(algo => {
  const s = summaryByAlgorithm[algo.id];
  csvRows.push([
    `"${s.id}"`,
    `"${s.name}"`,
    s.meanPrecisionAt10,
    s.stdPrecisionAt10,
    s.medianLatencyMs,
    s.pooledMedianLatencyMs,
    s.meanLatencyMs,
    s.minLatencyMs,
    s.maxLatencyMs
  ].join(','));
});

// Spacer & Category Breakdown Section
csvRows.push('');
csvRows.push(['# CATEGORY BREAKDOWN TABLE'].join(','));
csvRows.push(['Category', 'Query_Count', 'Boolean_AND_P@10', 'Boolean_OR_P@10', 'TFIDF_P@10', 'Hybrid_P@10', 'Boolean_AND_Median_ms', 'Boolean_OR_Median_ms', 'TFIDF_Median_ms', 'Hybrid_Median_ms'].join(','));

Object.values(categorySummary).forEach(cat => {
  csvRows.push([
    `"${cat.category}"`,
    cat.queryCount,
    cat.meanPrecisionAt10.boolean_and,
    cat.meanPrecisionAt10.boolean_or,
    cat.meanPrecisionAt10.tfidf,
    cat.meanPrecisionAt10.hybrid,
    cat.medianLatencyMs.boolean_and,
    cat.medianLatencyMs.boolean_or,
    cat.medianLatencyMs.tfidf,
    cat.medianLatencyMs.hybrid
  ].join(','));
});

const csvPath = path.resolve('evaluation_results.csv');
fs.writeFileSync(csvPath, csvRows.join('\n'), 'utf-8');
console.log(`Saved evaluation CSV results to: ${csvPath}\n`);

// Print Comparison Table
console.log('================================================================');
console.log('  FINAL COMPARISON TABLE');
console.log('================================================================');
console.log('| Method                                | Mean Precision@10 | Median Response Time (ms) |');
console.log('|---------------------------------------|------------------:|--------------------------:|');
algorithms.forEach(algo => {
  const s = summaryByAlgorithm[algo.id];
  console.log(`| ${s.name.padEnd(37)} | ${s.meanPrecisionAt10.toFixed(4).padStart(17)} | ${s.medianLatencyMs.toFixed(4).padStart(25)} |`);
});
console.log('================================================================\n');

