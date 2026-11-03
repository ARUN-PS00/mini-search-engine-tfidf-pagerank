import { WIKIPEDIA_CORPUS, BENCHMARK_QUERIES } from './src/data/corpus.js';

console.log('=== BENCHMARK QUERIES RELEVANCE AUDIT ===\n');

const docMap = new Map(WIKIPEDIA_CORPUS.map(d => [d.id, d]));

BENCHMARK_QUERIES.forEach((q, idx) => {
  console.log(`[${q.id}] Category: ${q.category} | Query: "${q.query}"`);
  console.log(`  Description: ${q.description}`);
  console.log(`  Relevant Docs (${q.relevantDocIds.length}):`);
  q.relevantDocIds.forEach(id => {
    const doc = docMap.get(id);
    if (!doc) {
      console.error(`  ERROR: docId ${id} not found in corpus!`);
    } else {
      console.log(`    - ${doc.id}: "${doc.title}" (${doc.category})`);
    }
  });
  console.log('');
});

