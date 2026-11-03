import { BENCHMARK_QUERIES } from '../data/corpus.js';

export class EvaluationEngine {
  constructor(searchEngine) {
    this.searchEngine = searchEngine;
    this.benchmarkQueries = BENCHMARK_QUERIES;
    this.lastEvaluationResults = null;
  }

  /**
   * Run full genuine benchmark test suite across all 30 benchmark queries.
   * Computes authentic Precision@10, latency, and per-category breakdowns.
   */
  async runFullBenchmark(onProgress = null) {
    const algorithms = [
      { id: 'boolean', name: 'Boolean (AND)', run: q => this.searchEngine.searchBoolean(q, 'AND') },
      { id: 'tfidf', name: 'TF-IDF Vector Space', run: q => this.searchEngine.searchTfIdf(q) },
      { id: 'hybrid', name: 'PageRank + TF-IDF (0.7/0.3)', run: q => this.searchEngine.searchPageRankHybrid(q, 0.70, 0.30) }
    ];

    const detailedQueryRuns = [];
    const algoMetrics = {
      boolean: { latencies: [], precisions: [] },
      tfidf: { latencies: [], precisions: [] },
      hybrid: { latencies: [], precisions: [] }
    };

    // Category tracking
    const categoryMetrics = {};

    const totalRuns = this.benchmarkQueries.length * algorithms.length;
    let completedRuns = 0;

    for (let qIdx = 0; qIdx < this.benchmarkQueries.length; qIdx++) {
      const bq = this.benchmarkQueries[qIdx];
      const groundTruthSet = new Set(bq.relevantDocIds);

      if (!categoryMetrics[bq.category]) {
        categoryMetrics[bq.category] = {
          count: 0,
          boolean: [],
          tfidf: [],
          hybrid: []
        };
      }
      categoryMetrics[bq.category].count++;

      const queryEntry = {
        queryId: bq.id,
        category: bq.category,
        queryText: bq.query,
        description: bq.description,
        totalRelevantInCorpus: bq.relevantDocIds.length,
        results: {}
      };

      for (const algo of algorithms) {
        const res = algo.run(bq.query);
        const top10 = res.results.slice(0, 10);

        let relevantCount = 0;
        top10.forEach(item => {
          if (groundTruthSet.has(item.id)) {
            relevantCount++;
          }
        });

        // Precision@10: relevant in top 10 / 10
        const pAt10 = relevantCount / 10.0;

        algoMetrics[algo.id].latencies.push(res.executionTimeMs);
        algoMetrics[algo.id].precisions.push(pAt10);
        categoryMetrics[bq.category][algo.id].push(pAt10);

        queryEntry.results[algo.id] = {
          retrievedCount: top10.length,
          relevantInTop10: relevantCount,
          precisionAt10: Number(pAt10.toFixed(4)),
          latencyMs: res.executionTimeMs,
          topDocTitles: top10.map(d => d.title)
        };

        completedRuns++;
        if (onProgress) {
          onProgress(completedRuns / totalRuns, `Evaluating Q${qIdx + 1}/30 [${bq.category}]: "${bq.query}" — ${algo.name}`);
        }

        await new Promise(r => setTimeout(r, 6));
      }

      detailedQueryRuns.push(queryEntry);
    }

    // Compute overall summaries
    const summary = {};

    for (const algo of algorithms) {
      const precs = algoMetrics[algo.id].precisions;
      const lats = algoMetrics[algo.id].latencies;

      const avgPrecision = precs.reduce((a, b) => a + b, 0) / precs.length;
      const sortedLats = [...lats].sort((a, b) => a - b);
      const mid = Math.floor(sortedLats.length / 2);
      const medianLatency = sortedLats.length % 2 !== 0
        ? sortedLats[mid]
        : (sortedLats[mid - 1] + sortedLats[mid]) / 2;

      summary[algo.id] = {
        name: algo.name,
        meanPrecisionAt10: Number(avgPrecision.toFixed(4)),
        medianLatencyMs: Number(medianLatency.toFixed(2)),
        minLatencyMs: Number(Math.min(...lats).toFixed(2)),
        maxLatencyMs: Number(Math.max(...lats).toFixed(2))
      };
    }

    // Compute category summaries
    const categorySummary = {};
    for (const [catName, catData] of Object.entries(categoryMetrics)) {
      categorySummary[catName] = {
        count: catData.count,
        booleanP10: Number((catData.boolean.reduce((a, b) => a + b, 0) / catData.boolean.length).toFixed(4)),
        tfidfP10: Number((catData.tfidf.reduce((a, b) => a + b, 0) / catData.tfidf.length).toFixed(4)),
        hybridP10: Number((catData.hybrid.reduce((a, b) => a + b, 0) / catData.hybrid.length).toFixed(4))
      };
    }

    this.lastEvaluationResults = {
      timestamp: new Date().toISOString(),
      numTestQueries: this.benchmarkQueries.length,
      algorithms: algorithms.map(a => a.id),
      summary,
      categorySummary,
      detailedRuns: detailedQueryRuns
    };

    return this.lastEvaluationResults;
  }

  /**
   * Generates exportable CSV string with complete benchmark evaluation metrics.
   */
  exportToCsv() {
    if (!this.lastEvaluationResults) return null;

    const rows = [];
    rows.push(['Query_ID', 'Category', 'Query_Text', 'Algorithm', 'Retrieved_Top10_Count', 'Relevant_Found', 'Precision@10', 'Latency_ms'].join(','));

    for (const run of this.lastEvaluationResults.detailedRuns) {
      for (const algoId of ['boolean', 'tfidf', 'hybrid']) {
        const item = run.results[algoId];
        rows.push([
          `"${run.queryId}"`,
          `"${run.category}"`,
          `"${run.queryText}"`,
          `"${algoId}"`,
          item.retrievedCount,
          item.relevantInTop10,
          item.precisionAt10,
          item.latencyMs
        ].join(','));
      }
    }

    rows.push('');
    rows.push(['--- SUMMARY METRICS BY ALGORITHM ---'].join(','));
    rows.push(['Algorithm', 'Mean_Precision@10', 'Median_Latency_ms', 'Min_Latency_ms', 'Max_Latency_ms'].join(','));

    for (const algoId of ['boolean', 'tfidf', 'hybrid']) {
      const s = this.lastEvaluationResults.summary[algoId];
      rows.push([
        `"${s.name}"`,
        s.meanPrecisionAt10,
        s.medianLatencyMs,
        s.minLatencyMs,
        s.maxLatencyMs
      ].join(','));
    }

    rows.push('');
    rows.push(['--- CATEGORY BREAKDOWN ---'].join(','));
    rows.push(['Category', 'Query_Count', 'Boolean_Mean_P@10', 'TF-IDF_Mean_P@10', 'Hybrid_Mean_P@10'].join(','));

    for (const [cat, data] of Object.entries(this.lastEvaluationResults.categorySummary)) {
      rows.push([
        `"${cat}"`,
        data.count,
        data.booleanP10,
        data.tfidfP10,
        data.hybridP10
      ].join(','));
    }

    return rows.join('\n');
  }
}
