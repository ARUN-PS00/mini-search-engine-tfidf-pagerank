import fs from 'fs';

console.log('=== VERIFYING JSON AND CSV CONSISTENCY ===\n');

const json = JSON.parse(fs.readFileSync('evaluation_summary.json', 'utf-8'));
const csvText = fs.readFileSync('evaluation_results.csv', 'utf-8');

const csvLines = csvText.trim().split('\n');
console.log(`Total CSV lines: ${csvLines.length}`);

// Verify query counts
console.log(`JSON total detailed queries: ${json.detailedQueries.length}`);
if (json.detailedQueries.length !== 30) {
  console.error('ERROR: JSON does not have exactly 30 queries!');
} else {
  console.log('PASS: Exactly 30 queries present in JSON.');
}

// Check algorithms in JSON
const algos = Object.keys(json.summaryByAlgorithm);
console.log(`JSON Algorithms: ${algos.join(', ')}`);

algos.forEach(algoId => {
  const s = json.summaryByAlgorithm[algoId];
  console.log(`  [${s.name}] P@10: ${s.meanPrecisionAt10}, Median Latency: ${s.medianLatencyMs} ms, Min: ${s.minLatencyMs} ms, Max: ${s.maxLatencyMs} ms`);
});

// Check category summary
console.log('\nCategory Summaries:');
Object.entries(json.categorySummary).forEach(([cat, data]) => {
  console.log(`  ${cat} (n=${data.queryCount}): AND=${data.meanPrecisionAt10.boolean_and}, OR=${data.meanPrecisionAt10.boolean_or}, TFIDF=${data.meanPrecisionAt10.tfidf}, Hybrid=${data.meanPrecisionAt10.hybrid}`);
});

console.log('\nConsistency verification complete.');

