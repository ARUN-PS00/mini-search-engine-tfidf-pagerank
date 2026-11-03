# SEARCHLAB — Search Intelligence & IR Analytics Platform

> **A Comparative Study of Text Retrieval and Link-Based Ranking**  
> *Mini Search Engine Using Boolean Retrieval, TF-IDF Vector Space Model, and PageRank Link Authority*  
> Developed for KTU B.Tech Computer Science and Engineering — Information Retrieval Laboratory.

---

## 1. Overview & Design Direction

**SEARCHLAB** is a production-grade search intelligence and empirical analytics platform designed with an **Apple-inspired minimalist aesthetic**, **Linear's clean user experience**, and modern **responsive Bento Grid dashboards**.

### Core Visual & Technical Highlights:
- **Light-First Bento Grid Architecture:** Asymmetric cards, soft multi-layer shadows, 16px rounded borders, and clean typographic hierarchy using Inter and JetBrains Mono.
- **Collapsible Sidebar Navigation:** Quick switching across 7 specialized interfaces with official Lucide SVG iconography and keyboard shortcuts (`⌘K` / `Ctrl+K`).
- **Zero-Dependency Core Algorithms:** Client-side high-performance inverted index, Vector Space Model with cosine similarity, and power-iteration PageRank with dangling node redistribution.
- **Authentic Knowledge Corpus:** Curated 45-article Simple English Wikipedia dump with 1,207 stemmed vocabulary terms and 179 directed hyperlinks.
- **Strict Empirical Evaluation:** Live benchmark runner evaluating 30 predefined test queries across 5 categories with measured Precision@10, sub-millisecond latencies, and CSV export.

---

## 2. Platform Interfaces (7 Core Pages)

1. **Overview (Dashboard / Home):**
   - Main welcome card: *"Search Intelligence."*
   - Prominent search input with sample query chips (`solar energy`, `climate change`, `electric vehicle`).
   - Live engine telemetry card (V8 JIT status, 1,207 vocabulary terms, PageRank $d=0.85$ convergence).
   - 4 KPI Bento cards: Indexed documents (45), unique vocabulary (1,207), top Precision@10 (0.2800), and median latency (0.026 ms).
   - 3 Algorithm overview cards detailing Boolean, TF-IDF, and Hybrid ranking.

2. **Search Engine:**
   - Premium search bar with instant query execution and keyword highlighting in snippets.
   - Segmented algorithm selector: **PageRank + TF-IDF (70/30)**, **TF-IDF Vector Space**, **Boolean (AND)**, and **Boolean (OR)**.
   - Interactive hybrid weight tuning slider (`0%` to `100%` dynamic ratio).
   - Live execution pipeline telemetry tracking tokenization, stemming, index lookup, and ranking.
   - Extractive Quick Answer card identifying core answer sentences from verified source articles without LLM hallucinations.
   - Structured result cards displaying rank position, document title, category tag, score capsules, and backlink metrics.

3. **Algorithm Lab:**
   - Comprehensive theoretical and mathematical deep dive into all three algorithms.
   - Step-by-step posting intersection mechanics, smoothed IDF equations, and Markov random surfer formulas.
   - Live Inverted Index query term inspector showing real document frequencies (DF) and smoothed IDF values.

4. **Comparison Triangulation:**
   - Multi-algorithm side-by-side comparison interface for any user query.
   - Grouped SVG bar chart visualizing top document score distributions.
   - 3-column comparative Bento table highlighting **rank shifts** (`+2`, `-1`, `=`, `new`) showing exactly how PageRank boosts authoritative hubs.

5. **Analytics & Benchmarks:**
   - Data visualization dashboard displaying authentic measured experimental results from 2,400 timed runs.
   - Precision@10 comparison bar chart and Median Response Time latency bar chart.
   - 5-category performance breakdown (Single-Word, Multiword, Ambiguous, Rare/Specific, Natural-Language).
   - Live 30-Query Benchmark Suite runner with progress bar and CSV export.

6. **PageRank Graph Explorer:**
   - Interactive SVG force-directed network graph of all 45 Wikipedia articles and 179 hyperlinks.
   - Node radii scaled proportional to PageRank authority scores.
   - Category color coding with interactive node dragging and directed authority flow arrows.
   - Node Inspector card displaying backlinks, outgoing citations, and full document summaries.

7. **About Project:**
   - Complete technical documentation, KTU curriculum details, system architecture diagram, and IR academic citations.

---

## 3. Mathematical Foundations

### A. Boolean Model (AND / OR)
- **Conjunctive (`AND`):** $\text{Match}(d) = 1 \iff \forall t \in Q, d \in \text{Postings}(t)$
- **Disjunctive (`OR`):** $\text{Match}(d) = 1 \iff \exists t \in Q, d \in \text{Postings}(t)$

### B. TF-IDF Vector Space Model
- **Term Frequency:** $\text{TF}(t, d) = \frac{f_{t, d}}{|d|}$
- **Smoothed Inverse Document Frequency:** $\text{IDF}(t) = \ln\left(\frac{N + 1}{\text{DF}(t) + 1}\right) + 1$
- **Cosine Similarity:**
  $$\text{Score}_{\text{TF-IDF}}(q, d) = \frac{\sum_{t \in q \cap d} w_{t, q} \cdot w_{t, d}}{\sqrt{\sum_{t \in q} w_{t, q}^2} \cdot \sqrt{\sum_{t \in d} w_{t, d}^2}}$$

### C. PageRank Link Analysis (Power Iteration)
- Random surfer with damping factor $d = 0.85$ and uniform dangling mass redistribution:
  $$\mathbf{PR}^{(k+1)}(u) = \frac{1 - d}{N} + \frac{d \cdot \sum_{v \in \mathcal{D}} \mathbf{PR}^{(k)}(v)}{N} + d \sum_{v \in \mathcal{B}(u)} \frac{\mathbf{PR}^{(k)}(v)}{L(v)}$$
- Converged in **47 iterations** with error tolerance $< 10^{-6}$ and total probability mass $\sum_u \mathbf{PR}(u) = 1.000000$.

### D. Hybrid Ranking
- Dynamic candidate min-max normalization:
  $$\text{Score}_{\text{Hybrid}}(d) = (0.70 \times \text{NormTFIDF}(d)) + (0.30 \times \text{NormPR}(d))$$

---

## 4. Empirical Evaluation Summary

Results measured across 2,400 query runs on 11th Gen Intel i5-11260H @ 2.60GHz (12 threads) running Node.js v22 (V8 12.4):

| Method | Mean Precision@10 | Median Response Time (ms) | Notes |
|:---|---:|---:|:---|
| **Boolean (AND)** | **0.2233** | **0.0261 ms** | Fastest conjunctive search; brittle on conversational queries |
| **Boolean (OR)** | **0.2733** | **0.0207 ms** | Fastest overall execution; zero term weighting |
| **TF-IDF Vector Space** | **0.2767** | **0.1072 ms** | Continuous geometric ranking; robust across queries |
| **TF-IDF + PageRank (0.70 / 0.30)** | **0.2800** | **0.1232 ms** | **Highest retrieval precision (+25.4% over Boolean AND)** |

---

## 5. Getting Started & Commands

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Development Server (Vite)
```bash
# Start local Vite development server
npm run dev
```

### Production Build
```bash
# Compile client assets with Vite and generate standalone bundle
npm run build
```

### Direct Browser Usage (Zero Server)
You can directly open `index.html` in any web browser. The app includes both ES module integration and the standalone bundle (`src/bundle.js`), allowing instant offline exploration.

### Benchmark & Audit Suite
```bash
# Run algorithmic verification test suite
npm test

# Run complete empirical 30-query evaluation suite (generates JSON, CSV, and markdown reports)
npm run benchmark
```
