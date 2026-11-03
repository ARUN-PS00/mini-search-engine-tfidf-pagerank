import fs from 'fs';
import path from 'path';

console.log('=== BUILDING STANDALONE BUNDLE (src/bundle.js) ===\n');

const files = [
  './src/data/corpus.js',
  './src/data/benchmarkSummary.js',
  './src/js/preprocessor.js',
  './src/js/invertedIndex.js',
  './src/js/pagerank.js',
  './src/js/searchEngine.js',
  './src/js/quickAnswer.js',
  './src/js/evaluation.js',
  './src/js/charts.js',
  './src/js/graphVisualizer.js',
  './src/js/app.js'
];

let bundleBody = '';

for (const filePath of files) {
  const code = fs.readFileSync(filePath, 'utf-8');
  // Strip import statements
  let cleanCode = code.replace(/^\s*import\s+.*?;?\s*$/gm, '');
  // Replace export const / export class / export function / export default
  cleanCode = cleanCode.replace(/^\s*export\s+const\s+/gm, 'const ');
  cleanCode = cleanCode.replace(/^\s*export\s+function\s+/gm, 'function ');
  cleanCode = cleanCode.replace(/^\s*export\s+class\s+/gm, 'class ');
  cleanCode = cleanCode.replace(/^\s*export\s+default\s+/gm, '');

  bundleBody += `\n// --- MODULE: ${path.basename(filePath)} ---\n` + cleanCode + '\n';
}

const finalBundle = `/**
 * SEARCHLAB — Search Intelligence & IR Analytics Platform
 * Production Standalone Bundle: Complete, self-contained implementation of Boolean, TF-IDF,
 * PageRank, Extractive Quick Answer, 30-Query Benchmark Suite, and Bento Grid UI.
 */
(function () {
  'use strict';
${bundleBody}
})();
`;

fs.writeFileSync('./src/bundle.js', finalBundle, 'utf-8');
console.log(`Bundle built successfully! Size: ${fs.statSync('./src/bundle.js').size} bytes.`);

