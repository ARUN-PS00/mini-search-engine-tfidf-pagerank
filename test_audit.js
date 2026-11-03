import { WIKIPEDIA_CORPUS, BENCHMARK_QUERIES } from './src/data/corpus.js';
import { InvertedIndex } from './src/js/invertedIndex.js';
import { PageRankCalculator } from './src/js/pagerank.js';
import { SearchEngine } from './src/js/searchEngine.js';
import { ExtractiveQuickAnswerEngine } from './src/js/quickAnswer.js';
import { EvaluationEngine } from './src/js/evaluation.js';

console.log('=== AUDITING IR SEARCH ENGINE IMPLEMENTATION ===\n');

// 1. Corpus integrity
console.log(`Corpus Document Count: ${WIKIPEDIA_CORPUS.length}`);
console.log(`Benchmark Queries Count: ${BENCHMARK_QUERIES.length}`);

// 2. Inverted Index construction
const index = new InvertedIndex(WIKIPEDIA_CORPUS);
console.log(`Inverted Index Vocabulary Size: ${index.getVocabSize()} unique terms`);

// 3. PageRank calculation
const pageRank = new PageRankCalculator(WIKIPEDIA_CORPUS, 0.85);
const prSummary = pageRank.getGraphSummary();
console.log(`PageRank Summary: Nodes=${prSummary.totalNodes}, Edges=${prSummary.totalEdges}, Converged=${prSummary.converged} in ${prSummary.iterationsCompleted} iterations`);

let sumPR = 0;
for (const doc of WIKIPEDIA_CORPUS) {
  sumPR += pageRank.getScore(doc.id);
}
console.log(`Sum of PageRank scores across all nodes: ${sumPR.toFixed(6)} (Expected ~ 1.0)`);

// 4. Search Engine initialization
const searchEngine = new SearchEngine(WIKIPEDIA_CORPUS, index, pageRank);
const qaEngine = new ExtractiveQuickAnswerEngine(searchEngine);
const evalEngine = new EvaluationEngine(searchEngine);

// Test empty and invalid inputs
console.log('\n--- Testing Edge Cases & Invalid Inputs ---');
const emptyQueries = ['', '   ', '!!!???', 'a', 'the', null, undefined];
for (const eq of emptyQueries) {
  try {
    const bRes = searchEngine.searchBoolean(eq, 'AND');
    const tRes = searchEngine.searchTfIdf(eq);
    const hRes = searchEngine.searchPageRankHybrid(eq);
    const qRes = qaEngine.extractAnswer(eq);
    console.log(`Query: ${JSON.stringify(eq)} -> Boolean results count: ${bRes.results ? bRes.results.length : (bRes.matches ? 'has matches but NO results property!' : 'undefined')}, TF-IDF count: ${tRes.results.length}, Hybrid count: ${hRes.results.length}, QA found: ${qRes.found}`);
    
    // Test comparison with empty query
    const comp = searchEngine.runComparison(eq);
    console.log(`  Comparison on ${JSON.stringify(eq)} succeeded.`);
  } catch (err) {
    console.error(`  ERROR on ${JSON.stringify(eq)}: ${err.message}`);
  }
}

// 5. Test all 3 search methods on sample queries
console.log('\n--- Testing Search Methods on "solar energy" ---');
const sampleQ = 'solar energy';
const boolAndRes = searchEngine.searchBoolean(sampleQ, 'AND');
const boolOrRes = searchEngine.searchBoolean(sampleQ, 'OR');
const tfidfRes = searchEngine.searchTfIdf(sampleQ);
const hybridRes = searchEngine.searchPageRankHybrid(sampleQ, 0.70, 0.30);

console.log(`Boolean AND matches: ${boolAndRes.totalMatches}, top: ${boolAndRes.results.slice(0, 3).map(r => r.title).join(', ')}`);
console.log(`Boolean OR matches: ${boolOrRes.totalMatches}, top: ${boolOrRes.results.slice(0, 3).map(r => r.title).join(', ')}`);
console.log(`TF-IDF matches: ${tfidfRes.totalMatches}, top: ${tfidfRes.results.slice(0, 3).map(r => `${r.title} (${r.score.toFixed(4)})`).join(', ')}`);
console.log(`Hybrid matches: ${hybridRes.totalMatches}, top: ${hybridRes.results.slice(0, 3).map(r => `${r.title} (${r.score.toFixed(4)}, PR=${r.rawPageRank.toFixed(4)})`).join(', ')}`);

// 6. Test Quick Answer
console.log('\n--- Testing Quick Answer on "what is solar energy" ---');
const qaRes = qaEngine.extractAnswer('what is solar energy');
console.log(`QA Found: ${qaRes.found}, Best Doc: ${qaRes.sourceTitle}, Answer snippet: ${qaRes.extractedSentence ? qaRes.extractedSentence.slice(0, 100) : 'None'}`);

console.log('\nAudit complete.');

