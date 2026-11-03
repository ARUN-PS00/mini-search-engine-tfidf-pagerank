import { STOP_WORDS } from '../data/corpus.js';

/**
 * Lightweight Porter-style algorithmic stemmer for English terms.
 * Handles common plurals, gerunds, past tenses, and derivational suffixes.
 */
export function stemTerm(word) {
  if (!word || word.length < 3) return word;
  let w = word.toLowerCase();

  // Step 1: Plurals and basic inflectional endings
  if (w.endsWith('sses')) w = w.slice(0, -2);
  else if (w.endsWith('ies') && w.length > 4) w = w.slice(0, -3) + 'y';
  else if (w.endsWith('ss')) { /* keep */ }
  else if (w.endsWith('s') && !w.endsWith('us') && !w.endsWith('is')) w = w.slice(0, -1);

  // Step 2: Gerunds and past tenses
  if (w.endsWith('ing') && w.length > 5) {
    const base = w.slice(0, -3);
    // Double consonant cleanup (e.g. running -> run)
    if (base.length > 3 && base[base.length - 1] === base[base.length - 2]) {
      w = base.slice(0, -1);
    } else {
      w = base;
    }
  } else if (w.endsWith('ed') && w.length > 4) {
    w = w.slice(0, -2);
  }

  // Step 3: Derivational suffixes
  if (w.endsWith('ational')) w = w.slice(0, -7) + 'ate';
  else if (w.endsWith('tional')) w = w.slice(0, -6) + 'tion';
  else if (w.endsWith('alism')) w = w.slice(0, -5);
  else if (w.endsWith('ness')) w = w.slice(0, -4);
  else if (w.endsWith('ical')) w = w.slice(0, -4) + 'ic';
  else if (w.endsWith('ment') && w.length > 6) w = w.slice(0, -4);

  return w;
}

/**
 * Preprocesses a raw query with a granular, step-by-step diagnostic breakdown.
 * Designed specifically for interactive educational visualization.
 */
export function preprocessQueryWithTrace(rawQuery) {
  const t0 = performance.now();

  const original = String(rawQuery || "");

  // Stage 1: Lowercase Conversion
  const lowercased = original.toLowerCase();

  // Stage 2: Tokenization (extract alphanumeric words, strip punctuation)
  const matchedTokens = lowercased.match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || [];

  // Stage 3: Stop-words Removal
  const removedStopWords = [];
  const tokensAfterStopWords = [];

  for (const token of matchedTokens) {
    if (STOP_WORDS.has(token)) {
      removedStopWords.push(token);
    } else {
      tokensAfterStopWords.push(token);
    }
  }

  // Stage 4: Stemming / Normalization
  const stemmed = tokensAfterStopWords.map(token => ({
    original: token,
    stemmed: stemTerm(token)
  }));

  const finalTokens = stemmed.map(item => item.stemmed);

  const t1 = performance.now();

  return {
    originalQuery: original,
    lowercased,
    tokenized: matchedTokens,
    totalInitialTokens: matchedTokens.length,
    removedStopWords,
    keptTokens: tokensAfterStopWords,
    stemmed,
    finalTokens,
    uniqueTokens: Array.from(new Set(finalTokens)),
    executionTimeMs: Math.max(0.01, Number((t1 - t0).toFixed(3)))
  };
}

/**
 * Tokenize and stem raw document text for indexing.
 */
export function tokenizeText(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const tokens = lower.match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || [];
  const filtered = tokens.filter(t => !STOP_WORDS.has(t) && t.length > 1);
  return filtered.map(stemTerm);
}
