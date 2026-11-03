import { preprocessQueryWithTrace } from './preprocessor.js';

export class ExtractiveQuickAnswerEngine {
  constructor(searchEngine, relevanceThreshold = 0.10) {
    this.searchEngine = searchEngine;
    this.relevanceThreshold = relevanceThreshold;

    // Regex to detect natural language question intent patterns
    this.questionPatternRegex = /^(what|who|when|where|why|how|which|whose|can|does|is|are|tell me about|explain)\b/i;
  }

  /**
   * Check if user input is phrased as a question
   */
  isQuestion(query) {
    if (!query) return false;
    const trimmed = query.trim();
    return trimmed.endsWith('?') || this.questionPatternRegex.test(trimmed);
  }

  /**
   * Extract question type: "WHAT", "WHO", "HOW", "WHY", etc.
   */
  detectQuestionType(query) {
    const trimmed = query.trim().toLowerCase();
    const match = trimmed.match(this.questionPatternRegex);
    return match ? match[1].toUpperCase() : 'GENERAL';
  }

  /**
   * Main Extractive Answer Pipeline
   */
  extractAnswer(rawQuery) {
    const t0 = performance.now();
    const query = String(rawQuery || "").trim();
    const isQ = this.isQuestion(query);
    const qType = this.detectQuestionType(query);

    // Stage 1: Preprocess query
    const trace = preprocessQueryWithTrace(query);
    const queryTokens = trace.finalTokens;

    if (queryTokens.length === 0) {
      return {
        found: false,
        isQuestion: isQ,
        questionType: qType,
        message: "Please enter a specific question or topic.",
        executionTimeMs: Number((performance.now() - t0).toFixed(2))
      };
    }

    // Stage 2: Retrieve candidate articles via TF-IDF Vector Space Model
    const searchRes = this.searchEngine.searchTfIdf(query);
    const candidates = searchRes.results || [];

    // Stage 3: Source article selection with strict relevance threshold
    const bestDoc = candidates.length > 0 ? candidates[0] : null;

    if (!bestDoc || bestDoc.score < this.relevanceThreshold) {
      return {
        found: false,
        isQuestion: isQ,
        questionType: qType,
        message: "I couldn't find a sufficiently relevant answer in the indexed collection.",
        relevanceScore: bestDoc ? bestDoc.score : 0,
        thresholdUsed: this.relevanceThreshold,
        suggestedCandidates: candidates.slice(0, 3).map(c => ({ id: c.id, title: c.title, score: c.score })),
        executionTimeMs: Number((performance.now() - t0).toFixed(2))
      };
    }

    // Stage 4: Sentence Tokenization & Extraction from authentic article content
    const fullText = `${bestDoc.summary} ${bestDoc.mathDetails ? this.searchEngine.index.getDocById(bestDoc.id).content : ''}`;
    // Split on sentence boundaries (period/question/exclamation followed by space or line break)
    const rawSentences = fullText
      .split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 320);

    const queryTokenSet = new Set(queryTokens);

    // Stage 5: Sentence Scoring & Contextual Ranking
    const scoredSentences = rawSentences.map((sentence, index) => {
      const lower = sentence.toLowerCase();
      const sentenceWords = lower.match(/[a-z0-9]+/g) || [];
      const totalWords = sentenceWords.length || 1;

      // Match count & term overlap
      let matchedCount = 0;
      const matchedTerms = [];
      queryTokens.forEach(t => {
        if (sentenceWords.includes(t)) {
          matchedCount++;
          matchedTerms.push(t);
        }
      });

      // Position bias: the first 2 sentences of Wikipedia articles often contain the core definition
      const positionWeight = index === 0 ? 1.6 : index === 1 ? 1.3 : 1.0;

      // Question-type specific bonuses
      let questionFitBonus = 1.0;
      if (qType === 'WHO' && (lower.includes('invented') || lower.includes('born') || lower.includes('scientist') || lower.includes('pioneer'))) {
        questionFitBonus = 1.5;
      } else if (qType === 'WHAT' && (lower.includes('is a') || lower.includes('is the') || lower.includes('refers to') || lower.includes('defined as'))) {
        questionFitBonus = 1.6;
      } else if (qType === 'HOW' && (lower.includes('by') || lower.includes('using') || lower.includes('works') || lower.includes('process') || lower.includes('convert'))) {
        questionFitBonus = 1.4;
      }

      // Density score
      const termDensity = matchedCount / totalWords;
      const sentenceScore = (matchedCount * 2.0 + termDensity * 10.0) * positionWeight * questionFitBonus;

      return {
        sentenceIndex: index,
        text: sentence,
        score: Number(sentenceScore.toFixed(4)),
        matchedCount,
        matchedTerms,
        termDensity: Number(termDensity.toFixed(4)),
        positionWeight,
        questionFitBonus
      };
    });

    // Sort sentences by relevance score
    scoredSentences.sort((a, b) => b.score - a.score);

    // Pick top 2 to 3 distinct informative sentences
    const topSentences = scoredSentences
      .filter(s => s.matchedCount > 0)
      .slice(0, 3)
      .sort((a, b) => a.sentenceIndex - b.sentenceIndex); // Re-order chronologically for natural flow

    // If no sentence matched query terms directly, fall back to leading summary sentence
    const finalSentences = topSentences.length > 0 ? topSentences : [
      { text: bestDoc.summary, score: 1.0, matchedTerms: queryTokens }
    ];

    const extractedAnswerText = finalSentences.map(s => s.text).join(' ');

    const t1 = performance.now();

    return {
      found: true,
      isQuestion: isQ,
      questionType: qType,
      answer: extractedAnswerText,
      sourceDoc: {
        id: bestDoc.id,
        title: bestDoc.title,
        url: bestDoc.url,
        category: bestDoc.category,
        relevanceScore: Number(bestDoc.score.toFixed(4))
      },
      extractedSentences: finalSentences,
      allScoredSentences: scoredSentences.slice(0, 6),
      executionTimeMs: Math.max(0.05, Number((t1 - t0).toFixed(2)))
    };
  }
}
