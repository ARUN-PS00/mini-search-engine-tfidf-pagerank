import { tokenizeText } from './preprocessor.js';

export class InvertedIndex {
  constructor(corpus) {
    this.corpus = corpus;
    this.totalDocs = corpus.length;
    // Map: term -> Map(docId -> { count: number, positions: number[] })
    this.index = new Map();
    // Map: term -> number of docs containing the term
    this.df = new Map();
    // Map: docId -> total number of indexed terms
    this.docLengths = new Map();
    // Map: docId -> Map(term -> tf)
    this.docTermFrequencies = new Map();
    // Map: docId -> Map(term -> tfIdfWeight)
    this.docVectors = new Map();
    // Map: docId -> Euclidean norm of the tfIdf vector
    this.docNorms = new Map();

    this.buildIndex();
  }

  buildIndex() {
    // Phase 1: Tokenize documents and populate postings
    for (const doc of this.corpus) {
      const fullText = `${doc.title} ${doc.summary} ${doc.content}`;
      const tokens = tokenizeText(fullText);
      this.docLengths.set(doc.id, tokens.length);

      const termCounts = new Map();
      const termPositions = new Map();

      tokens.forEach((token, index) => {
        termCounts.set(token, (termCounts.get(token) || 0) + 1);
        if (!termPositions.has(token)) termPositions.set(token, []);
        termPositions.get(token).push(index);
      });

      // Calculate term frequency normalized by doc length: TF = count / docLength
      const docLength = tokens.length || 1;
      const tfMap = new Map();

      for (const [term, count] of termCounts.entries()) {
        const tf = count / docLength;
        tfMap.set(term, { count, tf, positions: termPositions.get(term) });

        if (!this.index.has(term)) {
          this.index.set(term, new Map());
        }
        this.index.get(term).set(doc.id, {
          count,
          tf,
          positions: termPositions.get(term)
        });
      }

      this.docTermFrequencies.set(doc.id, tfMap);
    }

    // Phase 2: Compute Document Frequency (DF) for each term
    for (const [term, postings] of this.index.entries()) {
      this.df.set(term, postings.size);
    }

    // Phase 3: Compute TF-IDF Vectors and Euclidean Norms for each document
    for (const doc of this.corpus) {
      const tfMap = this.docTermFrequencies.get(doc.id);
      const vector = new Map();
      let sumOfSquares = 0;

      for (const [term, info] of tfMap.entries()) {
        const idf = this.calculateIdf(term);
        const weight = info.tf * idf;
        vector.set(term, weight);
        sumOfSquares += weight * weight;
      }

      this.docVectors.set(doc.id, vector);
      this.docNorms.set(doc.id, Math.sqrt(sumOfSquares) || 1e-9);
    }
  }

  /**
   * Standard smoothed IDF formula:
   * IDF(t) = ln((N + 1) / (DF(t) + 1)) + 1
   * Ensures rare words receive higher weight, while terms present in all docs receive modest weight without zeroing out.
   */
  calculateIdf(term) {
    const docFreq = this.df.get(term) || 0;
    const N = this.totalDocs;
    return Math.log((N + 1) / (docFreq + 1)) + 1;
  }

  getPostings(term) {
    return this.index.get(term) || new Map();
  }

  getDocById(docId) {
    return this.corpus.find(d => d.id === docId);
  }

  getVocabSize() {
    return this.index.size;
  }

  /**
   * Detailed breakdown for a single document and query terms.
   */
  getDetailedScoringForDoc(docId, queryTokens) {
    const doc = this.getDocById(docId);
    if (!doc) return null;

    const tfMap = this.docTermFrequencies.get(docId) || new Map();
    const docLength = this.docLengths.get(docId) || 1;
    const termBreakdowns = [];
    let dotProduct = 0;

    // Calculate Query vector weights (TF in query * IDF)
    const queryCounts = {};
    queryTokens.forEach(t => {
      queryCounts[t] = (queryCounts[t] || 0) + 1;
    });

    let querySumSquares = 0;
    const queryWeights = {};

    queryTokens.forEach(token => {
      const qTf = queryCounts[token] / queryTokens.length;
      const idf = this.calculateIdf(token);
      const qWeight = qTf * idf;
      queryWeights[token] = qWeight;
      querySumSquares += qWeight * qWeight;
    });

    const queryNorm = Math.sqrt(querySumSquares) || 1e-9;
    const docNorm = this.docNorms.get(docId) || 1e-9;

    queryTokens.forEach(token => {
      const post = tfMap.get(token);
      const rawCount = post ? post.count : 0;
      const tf = rawCount / docLength;
      const df = this.df.get(token) || 0;
      const idf = this.calculateIdf(token);
      const docWeight = tf * idf;
      const qWeight = queryWeights[token] || 0;
      const termContribution = qWeight * docWeight;

      dotProduct += termContribution;

      termBreakdowns.push({
        term: token,
        rawCount,
        tf: Number(tf.toFixed(6)),
        df,
        idf: Number(idf.toFixed(4)),
        docWeight: Number(docWeight.toFixed(6)),
        queryWeight: Number(qWeight.toFixed(6)),
        termContribution: Number(termContribution.toFixed(6)),
        positions: post ? post.positions.slice(0, 5) : []
      });
    });

    const cosineSimilarity = dotProduct / (queryNorm * docNorm);

    return {
      docId,
      docTitle: doc.title,
      docLength,
      termBreakdowns,
      dotProduct: Number(dotProduct.toFixed(6)),
      queryNorm: Number(queryNorm.toFixed(6)),
      docNorm: Number(docNorm.toFixed(6)),
      cosineSimilarity: Number(cosineSimilarity.toFixed(6))
    };
  }
}
