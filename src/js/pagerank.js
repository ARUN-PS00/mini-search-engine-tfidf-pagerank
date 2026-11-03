export class PageRankCalculator {
  constructor(corpus, dampingFactor = 0.85, maxIterations = 100, tolerance = 1e-6) {
    this.corpus = corpus;
    this.dampingFactor = dampingFactor;
    this.maxIterations = maxIterations;
    this.tolerance = tolerance;
    this.N = corpus.length;

    // Directed graph structures
    // outLinksMap: docId -> array of target docIds
    this.outLinksMap = new Map();
    // inLinksMap: docId -> array of source docIds (backlinks)
    this.inLinksMap = new Map();
    // outDegree: docId -> number of valid outgoing links
    this.outDegree = new Map();

    this.scores = new Map();
    this.iterationLog = [];
    this.converged = false;
    this.iterationsCompleted = 0;

    this.buildGraph();
    this.computePageRank();
  }

  buildGraph() {
    const validIds = new Set(this.corpus.map(d => d.id));

    // Initialize maps
    for (const doc of this.corpus) {
      this.inLinksMap.set(doc.id, []);
    }

    for (const doc of this.corpus) {
      // Only keep links pointing to valid documents within the corpus
      const validOutLinks = (doc.outLinks || []).filter(targetId => validIds.has(targetId));
      this.outLinksMap.set(doc.id, validOutLinks);
      this.outDegree.set(doc.id, validOutLinks.length);

      for (const targetId of validOutLinks) {
        this.inLinksMap.get(targetId).push(doc.id);
      }
    }
  }

  computePageRank() {
    const N = this.N;
    const d = this.dampingFactor;
    const teleportProb = (1 - d) / N;

    // Initial uniform distribution: PR_0(u) = 1 / N
    let currentPR = new Map();
    for (const doc of this.corpus) {
      currentPR.set(doc.id, 1 / N);
    }

    this.iterationLog = [];

    for (let iter = 1; iter <= this.maxIterations; iter++) {
      const nextPR = new Map();

      // Handle dangling nodes (nodes with 0 out-links)
      let danglingRankSum = 0;
      for (const doc of this.corpus) {
        if (this.outDegree.get(doc.id) === 0) {
          danglingRankSum += currentPR.get(doc.id);
        }
      }
      const danglingContribution = (d * danglingRankSum) / N;

      let totalDelta = 0;

      // Power iteration update for each node
      for (const doc of this.corpus) {
        let incomingRank = 0;
        const incomingSources = this.inLinksMap.get(doc.id) || [];

        for (const sourceId of incomingSources) {
          const sourceOutDegree = this.outDegree.get(sourceId);
          if (sourceOutDegree > 0) {
            incomingRank += currentPR.get(sourceId) / sourceOutDegree;
          }
        }

        const newRank = teleportProb + danglingContribution + (d * incomingRank);
        nextPR.set(doc.id, newRank);

        totalDelta += Math.abs(newRank - currentPR.get(doc.id));
      }

      this.iterationLog.push({
        iteration: iter,
        totalDelta: Number(totalDelta.toExponential(4)),
        sampleScores: {
          doc_1: Number((nextPR.get('doc_1') || 0).toFixed(6)),
          doc_3: Number((nextPR.get('doc_3') || 0).toFixed(6)),
          doc_10: Number((nextPR.get('doc_10') || 0).toFixed(6))
        }
      });

      currentPR = nextPR;

      if (totalDelta < this.tolerance) {
        this.converged = true;
        this.iterationsCompleted = iter;
        break;
      }
      this.iterationsCompleted = iter;
    }

    // Save final raw scores
    this.scores = currentPR;
  }

  getScore(docId) {
    return this.scores.get(docId) || 0;
  }

  getInLinks(docId) {
    return this.inLinksMap.get(docId) || [];
  }

  getOutLinks(docId) {
    return this.outLinksMap.get(docId) || [];
  }

  getGraphSummary() {
    let totalEdges = 0;
    for (const [, outLinks] of this.outLinksMap.entries()) {
      totalEdges += outLinks.length;
    }
    return {
      totalNodes: this.N,
      totalEdges,
      dampingFactor: this.dampingFactor,
      tolerance: this.tolerance,
      iterationsCompleted: this.iterationsCompleted,
      converged: this.converged,
      iterationLog: this.iterationLog
    };
  }

  /**
   * Generates graph nodes and links formatted for SVG force visualization.
   */
  getVisualizationGraph() {
    const nodes = this.corpus.map(doc => {
      const pr = this.getScore(doc.id);
      const inDegree = (this.inLinksMap.get(doc.id) || []).length;
      const outDegree = (this.outLinksMap.get(doc.id) || []).length;
      return {
        id: doc.id,
        title: doc.title,
        category: doc.category,
        pageRank: pr,
        inDegree,
        outDegree,
        // Radius scaled smoothly by PageRank score
        radius: 6 + Math.min(24, pr * 250)
      };
    });

    const links = [];
    for (const [sourceId, targets] of this.outLinksMap.entries()) {
      for (const targetId of targets) {
        links.push({
          source: sourceId,
          target: targetId
        });
      }
    }

    return { nodes, links };
  }
}
