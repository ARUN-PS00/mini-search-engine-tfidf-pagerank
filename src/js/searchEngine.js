import { preprocessQueryWithTrace } from './preprocessor.js';

export class SearchEngine {
  constructor(corpus, invertedIndex, pageRankCalculator) {
    this.corpus = corpus;
    this.index = invertedIndex;
    this.pageRank = pageRankCalculator;
  }

  /**
   * Boolean Retrieval Engine (AND / OR)
   */
  searchBoolean(rawQuery, mode = 'AND') {
    const t0 = performance.now();
    const trace = preprocessQueryWithTrace(rawQuery);
    const tokens = trace.finalTokens;

    if (tokens.length === 0) {
      return {
        algorithm: 'Boolean',
        mode,
        queryTrace: trace,
        tokens: [],
        results: [],
        matches: [],
        totalMatches: 0,
        allExplanations: new Map(),
        executionTimeMs: Number((performance.now() - t0).toFixed(2))
      };
    }

    // Retrieve posting sets for all tokens
    const tokenPostings = tokens.map(token => {
      const postings = this.index.getPostings(token);
      return {
        token,
        docIds: new Set(postings.keys())
      };
    });

    let matchingDocIds = [];
    const explanations = new Map();

    if (mode === 'AND') {
      // Find intersection: document must contain ALL query tokens
      matchingDocIds = this.corpus
        .filter(doc => tokenPostings.every(tp => tp.docIds.has(doc.id)))
        .map(doc => doc.id);

      // Generate explainability log for every document in corpus
      for (const doc of this.corpus) {
        const presentTokens = tokens.filter(t => this.index.getPostings(t).has(doc.id));
        const missingTokens = tokens.filter(t => !this.index.getPostings(t).has(doc.id));
        const isMatch = missingTokens.length === 0;

        explanations.set(doc.id, {
          isMatch,
          matchedTermsCount: presentTokens.length,
          totalTermsCount: tokens.length,
          presentTokens,
          missingTokens,
          reason: isMatch
            ? `Matched: Contains all required terms [${presentTokens.join(', ')}].`
            : `Excluded: Missing term(s) [${missingTokens.join(', ')}].`
        });
      }
    } else {
      // Disjunctive OR: document contains AT LEAST ONE query token
      const unionSet = new Set();
      tokenPostings.forEach(tp => {
        tp.docIds.forEach(id => unionSet.add(id));
      });
      matchingDocIds = Array.from(unionSet);

      for (const doc of this.corpus) {
        const presentTokens = tokens.filter(t => this.index.getPostings(t).has(doc.id));
        const missingTokens = tokens.filter(t => !this.index.getPostings(t).has(doc.id));
        const isMatch = presentTokens.length > 0;

        explanations.set(doc.id, {
          isMatch,
          matchedTermsCount: presentTokens.length,
          totalTermsCount: tokens.length,
          presentTokens,
          missingTokens,
          reason: isMatch
            ? `Matched: Contains ${presentTokens.length}/${tokens.length} query terms [${presentTokens.join(', ')}].`
            : `Excluded: Contains none of the query terms.`
        });
      }
    }

    // Rank matching documents by number of matched terms, then title
    const results = matchingDocIds.map(docId => {
      const doc = this.index.getDocById(docId);
      const explanation = explanations.get(docId);
      return {
        id: doc.id,
        title: doc.title,
        url: doc.url,
        summary: doc.summary,
        category: doc.category,
        score: explanation.matchedTermsCount / tokens.length,
        rawScore: explanation.matchedTermsCount,
        explanation
      };
    }).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

    const t1 = performance.now();

    return {
      algorithm: 'Boolean',
      mode,
      queryTrace: trace,
      tokens,
      results: results.slice(0, 10),
      totalMatches: results.length,
      allExplanations: explanations,
      executionTimeMs: Math.max(0.05, Number((t1 - t0).toFixed(2)))
    };
  }

  /**
   * TF-IDF Vector Space Model with Cosine Similarity
   */
  searchTfIdf(rawQuery) {
    const t0 = performance.now();
    const trace = preprocessQueryWithTrace(rawQuery);
    const tokens = trace.finalTokens;

    if (tokens.length === 0) {
      return {
        algorithm: 'TF-IDF',
        queryTrace: trace,
        results: [],
        totalMatches: 0,
        executionTimeMs: Number((performance.now() - t0).toFixed(2))
      };
    }

    const candidateScores = [];

    for (const doc of this.corpus) {
      const details = this.index.getDetailedScoringForDoc(doc.id, tokens);
      if (details.cosineSimilarity > 0) {
        candidateScores.push({
          id: doc.id,
          title: doc.title,
          url: doc.url,
          summary: doc.summary,
          category: doc.category,
          score: details.cosineSimilarity,
          cosineSimilarity: details.cosineSimilarity,
          mathDetails: details
        });
      }
    }

    candidateScores.sort((a, b) => b.score - a.score);

    const t1 = performance.now();

    return {
      algorithm: 'TF-IDF',
      queryTrace: trace,
      tokens,
      results: candidateScores.slice(0, 10),
      allCandidates: candidateScores,
      totalMatches: candidateScores.length,
      executionTimeMs: Math.max(0.05, Number((t1 - t0).toFixed(2)))
    };
  }

  /**
   * PageRank + TF-IDF Hybrid Ranking
   * Final Score = 0.70 * Normalized TF-IDF + 0.30 * Normalized PageRank
   */
  searchPageRankHybrid(rawQuery, tfIdfWeight = 0.70, pageRankWeight = 0.30) {
    const t0 = performance.now();
    const tfIdfResults = this.searchTfIdf(rawQuery);
    const candidates = tfIdfResults.allCandidates || [];

    if (candidates.length === 0) {
      return {
        algorithm: 'PageRank + TF-IDF',
        queryTrace: tfIdfResults.queryTrace,
        results: [],
        totalMatches: 0,
        executionTimeMs: Math.max(0.05, Number((performance.now() - t0).toFixed(2)))
      };
    }

    // Find min and max for normalization
    let minTfIdf = Infinity;
    let maxTfIdf = -Infinity;
    let minPR = Infinity;
    let maxPR = -Infinity;

    candidates.forEach(c => {
      const pr = this.pageRank.getScore(c.id);
      if (c.cosineSimilarity < minTfIdf) minTfIdf = c.cosineSimilarity;
      if (c.cosineSimilarity > maxTfIdf) maxTfIdf = c.cosineSimilarity;
      if (pr < minPR) minPR = pr;
      if (pr > maxPR) maxPR = pr;
    });

    const tfIdfRange = maxTfIdf - minTfIdf || 1;
    const prRange = maxPR - minPR || 1;

    const hybridResults = candidates.map(c => {
      const rawPR = this.pageRank.getScore(c.id);
      // Min-max normalization into [0, 1]
      const normTfIdf = (c.cosineSimilarity - minTfIdf) / tfIdfRange;
      const normPR = (rawPR - minPR) / prRange;

      // Combined formula: 0.70 * Norm TF-IDF + 0.30 * Norm PageRank
      const finalScore = (tfIdfWeight * normTfIdf) + (pageRankWeight * normPR);

      return {
        id: c.id,
        title: c.title,
        url: c.url,
        summary: c.summary,
        category: c.category,
        score: Number(finalScore.toFixed(6)),
        rawTfIdf: Number(c.cosineSimilarity.toFixed(6)),
        normalizedTfIdf: Number(normTfIdf.toFixed(4)),
        rawPageRank: Number(rawPR.toFixed(6)),
        normalizedPageRank: Number(normPR.toFixed(4)),
        inDegree: (this.pageRank.getInLinks(c.id) || []).length,
        outDegree: (this.pageRank.getOutLinks(c.id) || []).length,
        inLinks: this.pageRank.getInLinks(c.id),
        outLinks: this.pageRank.getOutLinks(c.id),
        mathDetails: c.mathDetails,
        formulaString: `${tfIdfWeight.toFixed(2)} × ${normTfIdf.toFixed(4)} + ${pageRankWeight.toFixed(2)} × ${normPR.toFixed(4)} = ${finalScore.toFixed(4)}`
      };
    });

    hybridResults.sort((a, b) => b.score - a.score);

    const t1 = performance.now();

    return {
      algorithm: 'PageRank + TF-IDF',
      queryTrace: tfIdfResults.queryTrace,
      tokens: tfIdfResults.tokens,
      results: hybridResults.slice(0, 10),
      totalMatches: hybridResults.length,
      dampingFactor: this.pageRank.dampingFactor,
      weights: { tfIdf: tfIdfWeight, pageRank: pageRankWeight },
      executionTimeMs: Math.max(0.05, Number((t1 - t0).toFixed(2)))
    };
  }

  /**
   * Run All Three Algorithms Side-by-Side and calculate rank shifts
   */
  runComparison(rawQuery) {
    const t0 = performance.now();

    const booleanRes = this.searchBoolean(rawQuery, 'AND');
    const tfIdfRes = this.searchTfIdf(rawQuery);
    const hybridRes = this.searchPageRankHybrid(rawQuery);

    // Map rankings to compute positional differences
    const tfIdfRankMap = new Map();
    tfIdfRes.results.forEach((r, idx) => tfIdfRankMap.set(r.id, idx + 1));

    const booleanRankMap = new Map();
    booleanRes.results.forEach((r, idx) => booleanRankMap.set(r.id, idx + 1));

    // Annotate hybrid results with rank shifts relative to pure TF-IDF
    const annotatedHybrid = hybridRes.results.map((r, idx) => {
      const currentRank = idx + 1;
      const tfIdfRank = tfIdfRankMap.get(r.id);
      let rankShift = 0; // Positive means PageRank pushed it higher
      let badge = 'same';

      if (tfIdfRank === undefined) {
        badge = 'new';
      } else {
        rankShift = tfIdfRank - currentRank;
        if (rankShift > 0) badge = `+${rankShift}`;
        else if (rankShift < 0) badge = `${rankShift}`;
        else badge = '=';
      }

      return {
        ...r,
        rank: currentRank,
        tfIdfRank,
        rankShift,
        rankBadge: badge
      };
    });

    const totalTimeMs = Math.max(0.1, Number((performance.now() - t0).toFixed(2)));

    return {
      query: rawQuery,
      totalTimeMs,
      boolean: booleanRes,
      tfIdf: tfIdfRes,
      hybrid: {
        ...hybridRes,
        results: annotatedHybrid
      }
    };
  }

  /**
   * Execute Search Pipeline with fine-grained event timings for live animated pipeline
   */
  async executePipelineWithTelemetry(rawQuery, algorithm = 'hybrid', onStageChange = null) {
    const pipelineStages = [
      { id: 'query_input', name: 'Query Input', status: 'pending', durationMs: 0 },
      { id: 'preprocessing', name: 'Preprocessing', status: 'pending', durationMs: 0 },
      { id: 'index_lookup', name: 'Index Lookup', status: 'pending', durationMs: 0 },
      { id: 'scoring', name: 'Scoring Engine', status: 'pending', durationMs: 0 },
      { id: 'ranking', name: 'Ranking & Sorting', status: 'pending', durationMs: 0 },
      { id: 'results', name: 'Results Delivered', status: 'pending', durationMs: 0 }
    ];

    const notify = (stageIdx, status, extra = {}) => {
      pipelineStages[stageIdx].status = status;
      Object.assign(pipelineStages[stageIdx], extra);
      if (onStageChange) onStageChange([...pipelineStages]);
    };

    // Stage 1: Query Input
    notify(0, 'active');
    const t0 = performance.now();
    await new Promise(r => setTimeout(r, 60)); // Micro-pause for visual clarity
    notify(0, 'done', { durationMs: Number((performance.now() - t0).toFixed(2)), detail: `Query: "${rawQuery}"` });

    // Stage 2: Preprocessing
    notify(1, 'active');
    const t1 = performance.now();
    const trace = preprocessQueryWithTrace(rawQuery);
    await new Promise(r => setTimeout(r, 80));
    notify(1, 'done', {
      durationMs: Number((performance.now() - t1).toFixed(2)),
      detail: `${trace.finalTokens.length} tokens extracted (${trace.removedStopWords.length} stop words removed)`
    });

    // Stage 3: Index Lookup
    notify(2, 'active');
    const t2 = performance.now();
    let totalPostingsHit = 0;
    trace.finalTokens.forEach(t => {
      totalPostingsHit += (this.index.getPostings(t) || new Map()).size;
    });
    await new Promise(r => setTimeout(r, 70));
    notify(2, 'done', {
      durationMs: Number((performance.now() - t2).toFixed(2)),
      detail: `Retrieved ${totalPostingsHit} posting records across ${this.corpus.length} docs`
    });

    // Stage 4: Scoring Engine
    notify(3, 'active');
    const t3 = performance.now();
    let rawResults;
    if (algorithm === 'boolean') {
      rawResults = this.searchBoolean(rawQuery, 'AND');
    } else if (algorithm === 'tfidf') {
      rawResults = this.searchTfIdf(rawQuery);
    } else {
      rawResults = this.searchPageRankHybrid(rawQuery);
    }
    await new Promise(r => setTimeout(r, 90));
    notify(3, 'done', {
      durationMs: Number((performance.now() - t3).toFixed(2)),
      detail: `Computed real scores for ${rawResults.totalMatches} candidate documents`
    });

    // Stage 5: Ranking
    notify(4, 'active');
    const t4 = performance.now();
    await new Promise(r => setTimeout(r, 60));
    notify(4, 'done', {
      durationMs: Number((performance.now() - t4).toFixed(2)),
      detail: `Sorted top ${rawResults.results.length} results by relevance`
    });

    // Stage 6: Results
    notify(5, 'done', { detail: `${rawResults.results.length} results rendered to UI` });

    return {
      results: rawResults,
      stages: pipelineStages
    };
  }
}
