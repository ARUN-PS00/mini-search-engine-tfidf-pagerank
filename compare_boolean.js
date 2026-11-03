import { WIKIPEDIA_CORPUS, BENCHMARK_QUERIES } from './src/data/corpus.js';
import { InvertedIndex } from './src/js/invertedIndex.js';
import { PageRankCalculator } from './src/js/pagerank.js';
import { SearchEngine } from './src/js/searchEngine.js';

const idx = new InvertedIndex(WIKIPEDIA_CORPUS);
const pr = new PageRankCalculator(WIKIPEDIA_CORPUS);
const engine = new SearchEngine(WIKIPEDIA_CORPUS, idx, pr);

console.log('Testing Boolean AND vs Boolean OR across 30 queries:');

let pAndSum = 0;
let pOrSum = 0;
let pTfidfSum = 0;
let pHybridSum = 0;

BENCHMARK_QUERIES.forEach(bq => {
  const gt = new Set(bq.relevantDocIds);

  const andRes = engine.searchBoolean(bq.query, 'AND');
  const orRes = engine.searchBoolean(bq.query, 'OR');
  const tfidfRes = engine.searchTfIdf(bq.query);
  const hybridRes = engine.searchPageRankHybrid(bq.query, 0.70, 0.30);

  const andP10 = andRes.results.slice(0, 10).filter(d => gt.has(d.id)).length / 10;
  const orP10 = orRes.results.slice(0, 10).filter(d => gt.has(d.id)).length / 10;
  const tfidfP10 = tfidfRes.results.slice(0, 10).filter(d => gt.has(d.id)).length / 10;
  const hybridP10 = hybridRes.results.slice(0, 10).filter(d => gt.has(d.id)).length / 10;

  pAndSum += andP10;
  pOrSum += orP10;
  pTfidfSum += tfidfP10;
  pHybridSum += hybridP10;

  console.log(`[${bq.id}] "${bq.query}" -> AND: ${andP10.toFixed(2)} (hits: ${andRes.totalMatches}), OR: ${orP10.toFixed(2)} (hits: ${orRes.totalMatches}), TF-IDF: ${tfidfP10.toFixed(2)}, Hybrid: ${hybridP10.toFixed(2)}`);
});

const N = BENCHMARK_QUERIES.length;
console.log('\n--- Overall Mean P@10 ---');
console.log(`Boolean (AND): ${(pAndSum / N).toFixed(4)}`);
console.log(`Boolean (OR):  ${(pOrSum / N).toFixed(4)}`);
console.log(`TF-IDF:        ${(pTfidfSum / N).toFixed(4)}`);
console.log(`Hybrid:        ${(pHybridSum / N).toFixed(4)}`);

