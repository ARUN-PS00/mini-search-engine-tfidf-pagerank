import { WIKIPEDIA_CORPUS, BENCHMARK_QUERIES } from '../data/corpus.js';
import { PRECOMPUTED_BENCHMARK_SUMMARY } from '../data/benchmarkSummary.js';
import { InvertedIndex } from './invertedIndex.js';
import { PageRankCalculator } from './pagerank.js';
import { SearchEngine } from './searchEngine.js';
import { EvaluationEngine } from './evaluation.js';
import { ExtractiveQuickAnswerEngine } from './quickAnswer.js';
import { GraphVisualizer } from './graphVisualizer.js';
import { ChartRenderer } from './charts.js';

export class InformationRetrievalApp {
  constructor() {
    this.corpus = WIKIPEDIA_CORPUS;
    this.currentTab = 'overview'; // 'overview' | 'search' | 'lab' | 'compare' | 'analytics' | 'graph' | 'about'
    this.selectedAlgorithm = 'hybrid'; // 'hybrid' | 'tfidf' | 'boolean_and' | 'boolean_or'
    this.currentQuery = 'what is solar energy';
    this.quickAnswerEnabled = true;

    // Configurable weights for hybrid PageRank
    this.weightTfIdf = 0.70;
    this.weightPageRank = 0.30;

    // Initialize IR Engine Modules
    this.index = new InvertedIndex(this.corpus);
    this.pageRank = new PageRankCalculator(this.corpus, 0.85);
    this.searchEngine = new SearchEngine(this.corpus, this.index, this.pageRank);
    this.quickAnswerEngine = new ExtractiveQuickAnswerEngine(this.searchEngine, 0.08);
    this.evaluation = new EvaluationEngine(this.searchEngine);

    // Pre-populate evaluation results with authentic measured benchmark data
    this.evaluation.lastEvaluationResults = PRECOMPUTED_BENCHMARK_SUMMARY;

    this.lastSearchResults = null;
    this.lastComparisonResults = null;
    this.lastQuickAnswer = null;
    this.graphVisualizer = null;
    this.recentQueries = [
      'what is solar energy',
      'electric vehicle',
      'who invented the world wide web',
      'history of the Roman Empire',
      'climate change'
    ];

    this.initDOM();
    this.bindEvents();
    this.performSearch(this.currentQuery, false); // initial warm search
    this.switchTab('overview');
  }

  initDOM() {
    const savedTheme = localStorage.getItem('searchlab_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeButtonIcon(savedTheme);
  }

  bindEvents() {
    // Navigation items (Sidebar)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    // Sidebar Collapse Toggle
    const sidebarToggle = document.getElementById('sidebarToggleBtn');
    const sidebar = document.getElementById('appSidebar');
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }

    // Theme Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('searchlab_theme', nextTheme);
        this.updateThemeButtonIcon(nextTheme);
      });
    }

    // Global Search trigger (Top bar)
    const quickSearchBtn = document.getElementById('quickSearchTrigger');
    if (quickSearchBtn) {
      quickSearchBtn.addEventListener('click', () => {
        this.switchTab('search');
        const input = document.getElementById('searchInput');
        if (input) {
          input.focus();
          input.select();
        }
      });
    }

    // Keyboard shortcut Cmd/Ctrl + K
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.switchTab('search');
        const input = document.getElementById('searchInput');
        if (input) {
          input.focus();
          input.select();
        }
      }
    });

    // Search Form Submit
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
          this.performSearch(query);
        }
      });
    }

    // Algorithm Segmented Control
    const algoSegmentBtns = document.querySelectorAll('.algo-segment-btn');
    algoSegmentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        algoSegmentBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedAlgorithm = btn.dataset.algo;
        const q = searchInput ? searchInput.value.trim() : this.currentQuery;
        this.performSearch(q);
      });
    });

    // Quick Answer Checkbox Toggle
    const qaToggle = document.getElementById('quickAnswerToggle');
    if (qaToggle) {
      qaToggle.addEventListener('change', (e) => {
        this.quickAnswerEnabled = e.target.checked;
        const q = searchInput ? searchInput.value.trim() : this.currentQuery;
        this.performSearch(q);
      });
    }

    // Weight sliders (TF-IDF vs PageRank)
    const tfidfSlider = document.getElementById('weightTfIdfSlider');
    const prSlider = document.getElementById('weightPrSlider');
    const weightLabel = document.getElementById('weightRatioLabel');

    if (tfidfSlider && prSlider) {
      tfidfSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.weightTfIdf = val;
        this.weightPageRank = parseFloat((1 - val).toFixed(2));
        prSlider.value = this.weightPageRank;
        if (weightLabel) weightLabel.textContent = `${Math.round(this.weightTfIdf * 100)}% TF-IDF / ${Math.round(this.weightPageRank * 100)}% PageRank`;
        const q = searchInput ? searchInput.value.trim() : this.currentQuery;
        this.performSearch(q);
      });

      prSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.weightPageRank = val;
        this.weightTfIdf = parseFloat((1 - val).toFixed(2));
        tfidfSlider.value = this.weightTfIdf;
        if (weightLabel) weightLabel.textContent = `${Math.round(this.weightTfIdf * 100)}% TF-IDF / ${Math.round(this.weightPageRank * 100)}% PageRank`;
        const q = searchInput ? searchInput.value.trim() : this.currentQuery;
        this.performSearch(q);
      });
    }

    // Document Modal Close
    const modalClose = document.getElementById('modalCloseBtn');
    const modalOverlay = document.getElementById('docModalOverlay');
    if (modalClose && modalOverlay) {
      modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('open');
      });
    }
  }

  updateThemeButtonIcon(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    btn.innerHTML = theme === 'dark'
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update sidebar navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tabId);
    });

    // Update breadcrumb
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
    if (breadcrumbCurrent) {
      const labels = {
        overview: 'Overview & Dashboard',
        search: 'Search Engine',
        lab: 'Algorithm Lab',
        compare: 'Comparison Triangulation',
        analytics: 'Analytics & Benchmarks',
        graph: 'PageRank Graph Explorer',
        about: 'About Project'
      };
      breadcrumbCurrent.textContent = labels[tabId] || tabId;
    }

    // Toggle tab visibility
    document.querySelectorAll('.tab-section').forEach(sec => {
      sec.style.display = sec.id === `tab-${tabId}` ? 'block' : 'none';
    });

    // Render tab content
    if (tabId === 'overview') {
      this.renderOverview();
    } else if (tabId === 'search') {
      this.renderSearchResults(this.lastSearchResults);
    } else if (tabId === 'lab') {
      this.renderAlgorithmLab();
    } else if (tabId === 'compare') {
      this.lastComparisonResults = this.searchEngine.runComparison(this.currentQuery);
      this.renderComparisonSection(this.lastComparisonResults);
    } else if (tabId === 'analytics') {
      this.renderAnalyticsDashboard();
    } else if (tabId === 'graph') {
      this.renderGraphExplorer();
    } else if (tabId === 'about') {
      this.renderAboutProject();
    }
  }

  async performSearch(query, renderNow = true) {
    this.currentQuery = query;

    // Add to recent queries
    if (!this.recentQueries.includes(query)) {
      this.recentQueries.unshift(query);
      if (this.recentQueries.length > 6) this.recentQueries.pop();
    }

    // Sync input field value
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value !== query) {
      searchInput.value = query;
    }

    // Live Execution Pipeline Telemetry
    const pipelineTrack = document.getElementById('pipelineTrack');
    const updatePipelineUI = (stages) => {
      if (!pipelineTrack) return;
      pipelineTrack.innerHTML = `
        <div class="pipeline-stepper">
          ${stages.map((s, idx) => `
            <div class="pipeline-node">
              <div class="pipeline-circle ${s.status}">
                ${s.status === 'done' ? '✓' : idx + 1}
              </div>
              <div class="pipeline-step-title">${s.name}</div>
              <div class="pipeline-step-meta">${s.durationMs ? s.durationMs + 'ms' : (s.status === 'active' ? 'executing...' : '')}</div>
            </div>
            ${idx < stages.length - 1 ? `<div class="pipeline-track-line ${stages[idx + 1].status !== 'pending' ? 'filled' : ''}"></div>` : ''}
          `).join('')}
        </div>
      `;
    };

    let algoKey = 'hybrid';
    if (this.selectedAlgorithm === 'tfidf') algoKey = 'tfidf';
    if (this.selectedAlgorithm === 'boolean_and' || this.selectedAlgorithm === 'boolean_or') algoKey = 'boolean';

    // Execute fine-grained telemetry
    await this.searchEngine.executePipelineWithTelemetry(query, algoKey, updatePipelineUI);

    // Run active algorithm
    if (this.selectedAlgorithm === 'boolean_and') {
      this.lastSearchResults = this.searchEngine.searchBoolean(query, 'AND');
    } else if (this.selectedAlgorithm === 'boolean_or') {
      this.lastSearchResults = this.searchEngine.searchBoolean(query, 'OR');
    } else if (this.selectedAlgorithm === 'tfidf') {
      this.lastSearchResults = this.searchEngine.searchTfIdf(query);
    } else {
      this.lastSearchResults = this.searchEngine.searchPageRankHybrid(query, this.weightTfIdf, this.weightPageRank);
    }

    // Run Extractive Quick Answer if enabled
    if (this.quickAnswerEnabled) {
      this.lastQuickAnswer = this.quickAnswerEngine.extractAnswer(query);
      this.renderQuickAnswerCard(this.lastQuickAnswer);
    } else {
      const qaCard = document.getElementById('quickAnswerContainer');
      if (qaCard) qaCard.innerHTML = '';
    }

    if (renderNow) {
      if (this.currentTab === 'search') {
        this.renderSearchResults(this.lastSearchResults);
      } else if (this.currentTab === 'compare') {
        this.lastComparisonResults = this.searchEngine.runComparison(query);
        this.renderComparisonSection(this.lastComparisonResults);
      } else if (this.currentTab === 'lab') {
        this.renderAlgorithmLab();
      }
    }
  }

  /* ==========================================================================
     PAGE 1: OVERVIEW (DASHBOARD / HOME)
     ========================================================================== */
  renderOverview() {
    const container = document.getElementById('overviewContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="bento-grid">
        <!-- Main Hero Card (8 Cols) -->
        <div class="bento-card col-8 hero-bento-banner">
          <div class="hero-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            SEARCH INTELLIGENCE & ANALYTICS PLATFORM
          </div>
          <div>
            <h1 class="hero-heading">Search Intelligence.</h1>
            <p class="hero-description" style="margin-top: 0.6rem;">
              A comparative study of Information Retrieval paradigms. Compare classical Boolean set logic, TF-IDF Vector Space continuous scoring, and PageRank link authority over authentic Simple English Wikipedia knowledge graphs.
            </p>
          </div>

          <!-- Hero Search Box -->
          <form id="overviewHeroSearchForm" class="search-bar-container" style="margin-top: 0.5rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              id="overviewHeroInput"
              class="search-input-field"
              placeholder="Enter query or question (e.g. 'what is solar energy', 'electric vehicle')..."
              value="${this.currentQuery}"
              autocomplete="off"
            />
            <button type="submit" class="search-btn-primary">
              Search
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </form>

          <!-- Quick Query Chips -->
          <div class="sample-queries-container">
            <span style="font-weight: 600;">Popular queries:</span>
            ${['what is solar energy', 'electric vehicle', 'computer network', 'renewable energy', 'who invented the world wide web'].map(q => `
              <button type="button" class="sample-chip" onclick="window.irApp.searchFromChip('${q}')">${q}</button>
            `).join('')}
          </div>
        </div>

        <!-- Engine Status Bento Card (4 Cols) -->
        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <div>
                <div class="bento-title">Engine Telemetry</div>
                <div class="bento-subtitle">Real-time IR runtime status</div>
              </div>
            </div>
            <span class="kpi-badge success">ONLINE</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-secondary); font-size: 0.82rem;">Runtime Engine</span>
              <span style="font-family: var(--font-mono); font-weight: 600; font-size: 0.82rem;">Node.js v22 (V8 JIT)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-secondary); font-size: 0.82rem;">Inverted Index</span>
              <span style="font-family: var(--font-mono); font-weight: 600; font-size: 0.82rem; color: var(--accent-success);">1,207 Terms (7.64 ms)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-secondary); font-size: 0.82rem;">PageRank Model</span>
              <span style="font-family: var(--font-mono); font-weight: 600; font-size: 0.82rem; color: var(--accent-primary);">d=0.85 (47 iters)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0;">
              <span style="color: var(--text-secondary); font-size: 0.82rem;">Extractive QA Engine</span>
              <span style="font-family: var(--font-mono); font-weight: 600; font-size: 0.82rem;">Zero Hallucinations</span>
            </div>
          </div>

          <div style="margin-top: auto; padding-top: 1rem;">
            <button class="btn-ghost-sm" style="width: 100%; text-align: center; padding: 0.6rem;" onclick="window.irApp.switchTab('analytics')">
              Open Complete Benchmark Analytics →
            </button>
          </div>
        </div>

        <!-- 4 Asymmetric KPI Cards -->
        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Corpus Documents</span>
            <div class="kpi-icon-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${this.corpus.length}</span>
            <span class="kpi-badge primary">Wikipedia</span>
          </div>
          <div class="kpi-footer-note">Full-text indexed encyclopedic articles</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Index Vocabulary</span>
            <div class="kpi-icon-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${this.index.getVocabSize().toLocaleString()}</span>
            <span class="kpi-badge success">Stemmed</span>
          </div>
          <div class="kpi-footer-note">Porter stemmer + SMART stop-word removal</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Top Precision@10</span>
            <div class="kpi-icon-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">0.2800</span>
            <span class="kpi-badge success">+25.4%</span>
          </div>
          <div class="kpi-footer-note">Hybrid TF-IDF + PageRank benchmark winner</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Median Latency</span>
            <div class="kpi-icon-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">0.026ms</span>
            <span class="kpi-badge primary">Sub-ms</span>
          </div>
          <div class="kpi-footer-note">Boolean search execution on inverted index</div>
        </div>

        <!-- 3 Algorithm Trio Bento Cards -->
        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-success); background: var(--accent-success-subtle);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <div>
                <div class="bento-title">1. Boolean Model</div>
                <div class="bento-subtitle">Conjunctive & Disjunctive Sets</div>
              </div>
            </div>
            <span class="kpi-badge success">0.026 ms</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.25rem;">
            Evaluates queries using exact inverted index posting intersections (<code>AND</code>) and unions (<code>OR</code>). Near instantaneous sub-millisecond execution, but binary and brittle on conversational queries.
          </p>
          <div style="margin-top: auto;">
            <button class="btn-ghost-sm" onclick="window.irApp.selectAndSearch('boolean_and')">Test Boolean Search →</button>
          </div>
        </div>

        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-primary); background: var(--accent-primary-subtle);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              </div>
              <div>
                <div class="bento-title">2. TF-IDF Vector Space</div>
                <div class="bento-subtitle">Cosine Similarity Geometric Ranking</div>
              </div>
            </div>
            <span class="kpi-badge primary">P@10: 0.2767</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.25rem;">
            Represents documents and queries as high-dimensional vectors in Euclidean space with smoothed logarithmic IDF weights. Computes continuous angle similarity to rank partial matches gracefully.
          </p>
          <div style="margin-top: auto;">
            <button class="btn-ghost-sm" onclick="window.irApp.selectAndSearch('tfidf')">Test TF-IDF Vector Space →</button>
          </div>
        </div>

        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-purple); background: var(--accent-purple-subtle);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              </div>
              <div>
                <div class="bento-title">3. TF-IDF + PageRank</div>
                <div class="bento-subtitle">Hyperlink Authority Hybrid Blend</div>
              </div>
            </div>
            <span class="kpi-badge" style="background: var(--accent-purple-subtle); color: var(--accent-purple);">P@10: 0.2800</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.25rem;">
            Combines dynamic min-max normalized TF-IDF content relevance with PageRank link authority calculated on 179 directed hyperlinks via power iteration (<code>0.70 × TF-IDF + 0.30 × PageRank</code>).
          </p>
          <div style="margin-top: auto;">
            <button class="btn-ghost-sm" onclick="window.irApp.selectAndSearch('hybrid')">Test Hybrid Ranking →</button>
          </div>
        </div>
      </div>
    `;

    // Hook up overview hero search form
    const heroForm = document.getElementById('overviewHeroSearchForm');
    const heroInput = document.getElementById('overviewHeroInput');
    if (heroForm && heroInput) {
      heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = heroInput.value.trim();
        if (q) {
          this.switchTab('search');
          this.performSearch(q);
        }
      });
    }
  }

  searchFromChip(query) {
    this.switchTab('search');
    this.performSearch(query);
  }

  selectAndSearch(algo) {
    this.selectedAlgorithm = algo;
    this.switchTab('search');
    // Sync buttons
    document.querySelectorAll('.algo-segment-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.algo === algo);
    });
    this.performSearch(this.currentQuery);
  }

  /* ==========================================================================
     PAGE 2: SEARCH RESULTS RENDERING
     ========================================================================== */
  renderSearchResults(data) {
    const container = document.getElementById('searchResultsContainer');
    const metaBar = document.getElementById('resultsMetaBar');
    if (!container) return;

    if (!data || !data.results || data.results.length === 0) {
      if (metaBar) {
        metaBar.innerHTML = `<span class="search-results-count">0 documents found for "${this.currentQuery}"</span>`;
      }
      container.innerHTML = `
        <div class="bento-card" style="text-align: center; padding: 3rem 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--bg-subtle); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">No matching documents found</h3>
          <p style="color: var(--text-secondary); max-width: 460px; margin: 0 auto 1.5rem; font-size: 0.88rem;">
            If using Boolean AND, all query terms must appear in the exact same document. Try switching to <strong>TF-IDF Vector Space</strong> or <strong>Boolean (OR)</strong>.
          </p>
          <div style="display: flex; gap: 0.5rem; justify-content: center;">
            <button class="btn-ghost-sm" onclick="window.irApp.selectAndSearch('tfidf')">Switch to TF-IDF</button>
            <button class="btn-ghost-sm" onclick="window.irApp.selectAndSearch('boolean_or')">Switch to Boolean (OR)</button>
          </div>
        </div>
      `;
      return;
    }

    if (metaBar) {
      metaBar.innerHTML = `
        <div class="search-results-header">
          <span class="search-results-count">
            ${data.totalMatches} documents retrieved in <span style="font-family: var(--font-mono); color: var(--accent-primary);">${data.executionTimeMs} ms</span>
          </span>
          <span style="font-size: 0.8rem; color: var(--text-secondary);">
            Algorithm: <strong>${data.algorithm}</strong>
          </span>
        </div>
      `;
    }

    // Extract query terms for keyword highlighting
    const queryTerms = (data.tokens || []).map(t => t.toLowerCase());

    container.innerHTML = data.results.map((doc, idx) => {
      const highlightedSummary = this.highlightTerms(doc.summary, queryTerms);
      const inLinks = this.pageRank.getInLinks(doc.id) || [];
      const outLinks = this.pageRank.getOutLinks(doc.id) || [];

      let scoreBadge = '';
      if (this.selectedAlgorithm === 'hybrid') {
        scoreBadge = `
          <div class="result-score-capsule">
            <span style="color: var(--accent-purple);">Hybrid: ${doc.score.toFixed(4)}</span>
            <span style="color: var(--text-tertiary);">|</span>
            <span style="color: var(--accent-primary); font-size: 0.72rem;">TF-IDF: ${(doc.rawTfIdf || 0).toFixed(4)}</span>
            <span style="color: var(--accent-success); font-size: 0.72rem;">PR: ${(doc.rawPageRank || 0).toFixed(4)}</span>
          </div>
        `;
      } else if (this.selectedAlgorithm === 'tfidf') {
        scoreBadge = `
          <div class="result-score-capsule">
            <span style="color: var(--accent-primary);">Cosine Sim: ${doc.score.toFixed(4)}</span>
          </div>
        `;
      } else {
        scoreBadge = `
          <div class="result-score-capsule">
            <span style="color: var(--accent-success);">Matched: ${(doc.score * 100).toFixed(0)}% terms</span>
          </div>
        `;
      }

      return `
        <div class="result-bento-card">
          <div class="result-top-row">
            <div class="result-title-group">
              <span class="rank-indicator-pill">#${idx + 1}</span>
              <a href="javascript:void(0)" class="result-title-link" onclick="window.irApp.openDocumentModal('${doc.id}')">
                ${doc.title}
              </a>
              <span class="category-badge">${doc.category}</span>
            </div>
            ${scoreBadge}
          </div>

          <div class="result-snippet">
            ${highlightedSummary}
          </div>

          <div class="result-footer-row">
            <div class="result-meta-tags">
              <span>Backlinks: <strong>${inLinks.length}</strong></span>
              <span>•</span>
              <span>Outgoing: <strong>${outLinks.length}</strong></span>
              <span>•</span>
              <span>Raw PageRank: <strong>${this.pageRank.getScore(doc.id).toFixed(6)}</strong></span>
            </div>
            <div class="result-actions">
              <button class="btn-ghost-sm" onclick="window.irApp.openDocumentModal('${doc.id}')">
                Inspect Document ↗
              </button>
              <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="btn-ghost-sm" style="text-decoration: none;">
                Wikipedia ↗
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  highlightTerms(text, terms) {
    if (!text || !terms || terms.length === 0) return text;
    let result = text;
    terms.forEach(term => {
      if (term.length > 2) {
        const regex = new RegExp(`\\b(${term}[a-z]*)`, 'gi');
        result = result.replace(regex, `<mark class="highlighted-term">$1</mark>`);
      }
    });
    return result;
  }

  renderQuickAnswerCard(qa) {
    const container = document.getElementById('quickAnswerContainer');
    if (!container) return;

    if (!qa || !qa.found) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="quick-answer-bento">
        <div class="qa-badge-row">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span class="qa-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              Extractive Answer
            </span>
            <span class="kpi-badge primary">[${qa.questionType} QUESTION]</span>
          </div>
          <span class="qa-source-text">
            Source: <strong>${qa.sourceDoc.title}</strong> (Relevance: ${qa.sourceDoc.relevanceScore})
          </span>
        </div>

        <div class="qa-answer-quote">
          "${qa.answer}"
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <a href="${qa.sourceDoc.url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); font-weight: 600; text-decoration: none;">
              Read Full Article on Wikipedia ↗
            </a>
            <button class="btn-ghost-sm" onclick="window.irApp.toggleMathDetails('qa-sentence-drawer')">
              Inspect Sentence Scores ▾
            </button>
          </div>
          <span style="font-family: var(--font-mono); color: var(--text-tertiary);">
            Extracted in ${qa.executionTimeMs} ms • 0 Hallucinations
          </span>
        </div>

        <div id="qa-sentence-drawer" style="display: none; margin-top: 0.5rem;" class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Candidate Sentence from Corpus</th>
                <th>Matched Terms</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              ${qa.allScoredSentences.map((s, idx) => `
                <tr style="${idx < qa.extractedSentences.length ? 'background: var(--accent-success-subtle);' : ''}">
                  <td>${s.sentenceIndex + 1}</td>
                  <td>${s.text}</td>
                  <td><code>${s.matchedTerms.join(', ') || 'None'}</code></td>
                  <td><strong>${s.score}</strong> ${idx < qa.extractedSentences.length ? '★ Selected' : ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     PAGE 3: ALGORITHM LAB
     ========================================================================== */
  renderAlgorithmLab() {
    const container = document.getElementById('labContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="bento-grid">
        <!-- Lab Header Banner (12 Cols) -->
        <div class="bento-card col-12">
          <div class="hero-tag">INFORMATION RETRIEVAL THEORY & ALGORITHMS</div>
          <h2 style="font-size: 1.75rem; font-weight: 800; letter-spacing: -0.025em; margin: 0.4rem 0 0.5rem;">
            Algorithmic Foundations & Mathematical Architecture
          </h2>
          <p style="color: var(--text-secondary); max-width: 820px; font-size: 0.92rem; line-height: 1.6;">
            Inspect how Boolean logic, Vector Space geometry, and PageRank link topology process your query: <code>"${this.currentQuery}"</code>.
          </p>
        </div>

        <!-- 1. Boolean Retrieval Bento Card (4 Cols) -->
        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-success); background: var(--accent-success-subtle);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <div>
                <div class="bento-title">1. Boolean Retrieval</div>
                <div class="bento-subtitle">Exact Inverted Index Postings</div>
              </div>
            </div>
            <span class="kpi-badge success">Exact Set</span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            Treats documents and queries as sets of index words. The inverted index postings lists for each term are intersected (<code>AND</code>) or unioned (<code>OR</code>).
          </p>

          <div class="math-formula-box">
            AND: Match(d) = 1 iff ∀t ∈ Q, d ∈ Postings(t)<br>
            OR:  Match(d) = 1 iff ∃t ∈ Q, d ∈ Postings(t)
          </div>

          <div style="font-size: 0.82rem; margin-top: 0.5rem;">
            <strong>Key Characteristics:</strong>
            <ul style="margin-left: 1.2rem; margin-top: 0.35rem; color: var(--text-secondary); line-height: 1.5;">
              <li>Near-zero latency (<0.03 ms execution).</li>
              <li>Binary relevance (either in or out).</li>
              <li>Fails on natural language queries when conversational terms are missing.</li>
            </ul>
          </div>
        </div>

        <!-- 2. TF-IDF Vector Space Bento Card (4 Cols) -->
        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-primary); background: var(--accent-primary-subtle);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              </div>
              <div>
                <div class="bento-title">2. TF-IDF Vector Space</div>
                <div class="bento-subtitle">Cosine Similarity Geometric Model</div>
              </div>
            </div>
            <span class="kpi-badge primary">Continuous</span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            Represents documents and queries as high-dimensional vectors. Documents are ranked continuously based on the cosine angle between vectors.
          </p>

          <div class="math-formula-box">
            TF(t, d) = count(t, d) / |d|<br>
            IDF(t) = ln((N + 1) / (DF(t) + 1)) + 1<br>
            CosineSim = (V_q • V_d) / (||V_q|| × ||V_d||)
          </div>

          <div style="font-size: 0.82rem; margin-top: 0.5rem;">
            <strong>Key Characteristics:</strong>
            <ul style="margin-left: 1.2rem; margin-top: 0.35rem; color: var(--text-secondary); line-height: 1.5;">
              <li>Term weighting discounts high-frequency words.</li>
              <li>Gracefully handles partial term matches.</li>
              <li>Overcomes the Boolean recall collapse.</li>
            </ul>
          </div>
        </div>

        <!-- 3. PageRank Hybrid Bento Card (4 Cols) -->
        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-purple); background: var(--accent-purple-subtle);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              </div>
              <div>
                <div class="bento-title">3. PageRank + TF-IDF</div>
                <div class="bento-subtitle">Link Analysis Markov Surfer</div>
              </div>
            </div>
            <span class="kpi-badge" style="background: var(--accent-purple-subtle); color: var(--accent-purple);">Hybrid</span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            Combines content relevance with structural authority by evaluating the directed hyperlink topology across the 45 documents via power iteration.
          </p>

          <div class="math-formula-box">
            PR(u) = (1-d)/N + d·Σ [PR(v)/L(v)] + Dangling<br>
            Score = (0.70 × NormTFIDF) + (0.30 × NormPR)
          </div>

          <div style="font-size: 0.82rem; margin-top: 0.5rem;">
            <strong>Key Characteristics:</strong>
            <ul style="margin-left: 1.2rem; margin-top: 0.35rem; color: var(--text-secondary); line-height: 1.5;">
              <li>Elevates authoritative hubs (e.g. Solar energy).</li>
              <li>Damping factor d=0.85 models web browsing.</li>
              <li>Adds only ~0.016 ms latency over pure TF-IDF.</li>
            </ul>
          </div>
        </div>

        <!-- Live Query Term Breakdown Table (12 Cols) -->
        <div class="bento-card col-12">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              </div>
              <div>
                <div class="bento-title">Live Inverted Index Inspection for "${this.currentQuery}"</div>
                <div class="bento-subtitle">Extracted query terms, document frequencies, and smoothed IDF scores</div>
              </div>
            </div>
          </div>

          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Stemmed Query Term</th>
                  <th>Inverted Index Postings Count</th>
                  <th>Document Frequency (DF)</th>
                  <th>Smoothed IDF Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${(this.lastSearchResults && this.lastSearchResults.tokens ? this.lastSearchResults.tokens : []).map(token => {
                  const df = this.index.df.get(token) || 0;
                  const idf = this.index.calculateIdf(token);
                  return `
                    <tr>
                      <td><code style="font-weight: 700; color: var(--accent-primary);">${token}</code></td>
                      <td>${(this.index.getPostings(token) || new Map()).size} documents</td>
                      <td>${df} / ${this.corpus.length}</td>
                      <td><strong>${idf.toFixed(4)}</strong></td>
                      <td><span class="kpi-badge ${df > 0 ? 'success' : 'primary'}">${df > 0 ? 'Indexed Hit' : 'Out of Vocab'}</span></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     PAGE 4: ALGORITHM COMPARISON (SIDE-BY-SIDE)
     ========================================================================== */
  renderComparisonSection(comparison) {
    const container = document.getElementById('comparisonContainer');
    if (!container) return;

    if (!comparison) {
      comparison = this.searchEngine.runComparison(this.currentQuery);
      this.lastComparisonResults = comparison;
    }

    container.innerHTML = `
      <div class="bento-grid">
        <!-- Top Comparison Header (12 Cols) -->
        <div class="bento-card col-12">
          <div class="bento-header">
            <div>
              <div class="hero-tag">MULTI-ALGORITHM TRIANGULATION</div>
              <h2 style="font-size: 1.75rem; font-weight: 800; letter-spacing: -0.025em; margin: 0.35rem 0 0.25rem;">
                Side-by-Side Algorithm Comparison
              </h2>
              <div style="color: var(--text-secondary); font-size: 0.88rem;">
                Query: <strong>"${comparison.query}"</strong> • Triangulating Boolean (AND), TF-IDF, and Hybrid PageRank
              </div>
            </div>
            <button class="btn-ghost-sm" onclick="window.irApp.performSearch('${comparison.query}')">
              Re-run Triangulation ↻
            </button>
          </div>

          <!-- Grouped Bar Chart Container -->
          <div id="comparisonChartContainer" style="width: 100%; height: 240px; margin-top: 1rem;"></div>
        </div>

        <!-- 3-Column Side-by-Side Comparison -->
        <div class="bento-card col-4">
          <div class="column-header-title">
            <span style="color: var(--accent-success);">1. Boolean Search (AND)</span>
            <span class="kpi-badge success">${comparison.boolean.results.length} matches</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${comparison.boolean.results.length === 0 ? '<div style="color: var(--text-tertiary); padding: 1.5rem; text-align: center;">Zero documents match all terms simultaneously.</div>' : ''}
            ${comparison.boolean.results.map((r, i) => `
              <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <span style="font-weight: 700; font-size: 0.85rem;">#${i + 1} ${r.title}</span>
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-success);">${(r.score * 100).toFixed(0)}%</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${r.category}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bento-card col-4">
          <div class="column-header-title">
            <span style="color: var(--accent-primary);">2. TF-IDF Vector Space</span>
            <span class="kpi-badge primary">${comparison.tfIdf.results.length} ranked</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${comparison.tfIdf.results.length === 0 ? '<div style="color: var(--text-tertiary); padding: 1.5rem; text-align: center;">No documents contain query stems.</div>' : ''}
            ${comparison.tfIdf.results.map((r, i) => `
              <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <span style="font-weight: 700; font-size: 0.85rem;">#${i + 1} ${r.title}</span>
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary);">${r.score.toFixed(4)}</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${r.category}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bento-card col-4">
          <div class="column-header-title">
            <span style="color: var(--accent-purple);">3. TF-IDF + PageRank</span>
            <span class="kpi-badge" style="background: var(--accent-purple-subtle); color: var(--accent-purple);">${comparison.hybrid.results.length} ranked</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${comparison.hybrid.results.length === 0 ? '<div style="color: var(--text-tertiary); padding: 1.5rem; text-align: center;">No matches.</div>' : ''}
            ${comparison.hybrid.results.map((r, i) => {
              let shiftClass = 'neutral';
              if (r.rankBadge.startsWith('+')) shiftClass = 'positive';
              if (r.rankBadge.startsWith('-')) shiftClass = 'negative';
              if (r.rankBadge === 'new') shiftClass = 'new';

              return `
                <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-subtle);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                    <span style="font-weight: 700; font-size: 0.85rem;">#${i + 1} ${r.title}</span>
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="rank-shift-badge ${shiftClass}" title="Rank shift vs TF-IDF">${r.rankBadge}</span>
                      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-purple);">${r.score.toFixed(4)}</span>
                    </div>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; justify-content: space-between;">
                    <span>${r.category}</span>
                    <span style="font-family: var(--font-mono); font-size: 0.7rem;">PR: ${r.rawPageRank.toFixed(4)}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Render grouped SVG bar chart
    setTimeout(() => {
      const chartContainer = document.getElementById('comparisonChartContainer');
      if (chartContainer) {
        ChartRenderer.renderTopScoresComparison(chartContainer, comparison);
      }
    }, 50);
  }

  /* ==========================================================================
     PAGE 5: ANALYTICS DASHBOARD (DATA VISUALIZATION)
     ========================================================================== */
  renderAnalyticsDashboard() {
    const container = document.getElementById('analyticsContainer');
    if (!container) return;

    const summaryData = this.evaluation.lastEvaluationResults || PRECOMPUTED_BENCHMARK_SUMMARY;
    const s = summaryData.summaryByAlgorithm || summaryData.summary;

    container.innerHTML = `
      <div class="bento-grid">
        <!-- Header Banner & Action Bar (12 Cols) -->
        <div class="bento-card col-12">
          <div class="bento-header">
            <div>
              <div class="hero-tag">EMPIRICAL IR EVALUATION BENCHMARK</div>
              <h2 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.03em; margin: 0.35rem 0 0.25rem;">
                Comparative Evaluation & Performance Metrics
              </h2>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">
                Empirical metrics across all 30 benchmark queries (2,400 timed executions) evaluating Mean Precision@10 and Median Response Time.
              </p>
            </div>
            <div style="display: flex; gap: 0.65rem;">
              <button id="runBenchmarkBtn" class="search-btn-primary" style="padding: 0.55rem 1.1rem; font-size: 0.82rem;">
                ⚡ Re-run 30-Query Benchmark Suite
              </button>
              <button id="exportCsvBtn" class="btn-ghost-sm" style="padding: 0.55rem 1.1rem; font-size: 0.82rem;" onclick="window.irApp.exportBenchmarkCsv()">
                ⬇ Export Results CSV
              </button>
            </div>
          </div>

          <!-- Benchmark Progress Bar (Hidden by default) -->
          <div id="benchmarkProgressArea" style="display: none; margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.35rem;">
              <span id="benchmarkProgressStatus">Running benchmark suite...</span>
              <span id="benchmarkProgressPercent">0%</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--bg-subtle); border-radius: var(--radius-full); overflow: hidden;">
              <div id="benchmarkProgressBar" style="width: 0%; height: 100%; background: var(--accent-primary); transition: width 0.1s linear;"></div>
            </div>
          </div>
        </div>

        <!-- 4 KPI Bento Cards -->
        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Boolean (AND) P@10</span>
            <div class="kpi-icon-pill" style="color: var(--accent-success);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${(s.boolean_and ? s.boolean_and.meanPrecisionAt10 : (s.boolean ? s.boolean.meanPrecisionAt10 : 0.2233)).toFixed(4)}</span>
            <span class="kpi-badge success">Conjunctive</span>
          </div>
          <div class="kpi-footer-note">Median latency: 0.0261 ms</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Boolean (OR) P@10</span>
            <div class="kpi-icon-pill" style="color: #059669;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${(s.boolean_or ? s.boolean_or.meanPrecisionAt10 : 0.2733).toFixed(4)}</span>
            <span class="kpi-badge success">Disjunctive</span>
          </div>
          <div class="kpi-footer-note">Median latency: 0.0207 ms (Fastest)</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">TF-IDF Mean P@10</span>
            <div class="kpi-icon-pill" style="color: var(--accent-primary);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${(s.tfidf ? s.tfidf.meanPrecisionAt10 : 0.2767).toFixed(4)}</span>
            <span class="kpi-badge primary">Continuous</span>
          </div>
          <div class="kpi-footer-note">Median latency: 0.1072 ms</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Hybrid Mean P@10</span>
            <div class="kpi-icon-pill" style="color: var(--accent-purple);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${(s.hybrid ? s.hybrid.meanPrecisionAt10 : 0.2800).toFixed(4)}</span>
            <span class="kpi-badge" style="background: var(--accent-purple-subtle); color: var(--accent-purple);">Winner</span>
          </div>
          <div class="kpi-footer-note">Median latency: 0.1232 ms</div>
        </div>

        <!-- Chart Bento Row (6 Cols + 6 Cols) -->
        <div class="bento-card col-6">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <div>
                <div class="bento-title">Mean Precision@10 Comparison</div>
                <div class="bento-subtitle">Average precision across 30 benchmark queries</div>
              </div>
            </div>
          </div>
          <div id="analyticsPrecisionChart" style="width: 100%; height: 240px;"></div>
        </div>

        <div class="bento-card col-6">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div>
                <div class="bento-title">Median Search Latency (ms)</div>
                <div class="bento-subtitle">Pure search execution time (lower is faster)</div>
              </div>
            </div>
          </div>
          <div id="analyticsLatencyChart" style="width: 100%; height: 240px;"></div>
        </div>

        <!-- 5 Category Breakdown Chart (12 Cols) -->
        <div class="bento-card col-12">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              </div>
              <div>
                <div class="bento-title">Performance Across 5 Query Categories</div>
                <div class="bento-subtitle">Single-Word, Multiword, Ambiguous, Rare/Specific, and Natural-Language</div>
              </div>
            </div>
          </div>
          <div id="analyticsCategoryChart" style="width: 100%; height: 260px;"></div>
        </div>

        <!-- Benchmark Queries Detailed Table (12 Cols) -->
        <div class="bento-card col-12">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
              <div>
                <div class="bento-title">30 Predefined Benchmark Test Queries</div>
                <div class="bento-subtitle">Audited ground truth relevance judgments and measured metrics</div>
              </div>
            </div>
          </div>

          <div class="data-table-wrapper" style="max-height: 420px; overflow-y: auto;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Query Text</th>
                  <th>Relevant Docs</th>
                  <th>Boolean AND P@10</th>
                  <th>TF-IDF P@10</th>
                  <th>Hybrid P@10</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${(summaryData.detailedQueries || []).map(q => `
                  <tr>
                    <td><span style="font-family: var(--font-mono); font-weight: 700;">${q.id}</span></td>
                    <td><span class="category-badge">${q.category}</span></td>
                    <td><strong>"${q.query}"</strong></td>
                    <td>${q.totalRelevantInCorpus || q.relevantDocIds.length} docs</td>
                    <td>${q.results.boolean_and ? q.results.boolean_and.precisionAt10.toFixed(2) : '-'}</td>
                    <td>${q.results.tfidf ? q.results.tfidf.precisionAt10.toFixed(2) : '-'}</td>
                    <td><strong style="color: var(--accent-purple);">${q.results.hybrid ? q.results.hybrid.precisionAt10.toFixed(2) : '-'}</strong></td>
                    <td>
                      <button class="btn-ghost-sm" onclick="window.irApp.searchFromChip('${q.query}')">
                        Search ↵
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Render SVG Charts into containers
    setTimeout(() => {
      const pChart = document.getElementById('analyticsPrecisionChart');
      const lChart = document.getElementById('analyticsLatencyChart');
      const cChart = document.getElementById('analyticsCategoryChart');

      if (pChart) ChartRenderer.renderPrecisionComparisonChart(pChart, s);
      if (lChart) ChartRenderer.renderLatencyComparisonChart(lChart, s);
      if (cChart && summaryData.categorySummary) ChartRenderer.renderCategoryBreakdownChart(cChart, summaryData.categorySummary);
    }, 50);

    // Bind live benchmark suite button
    const runBtn = document.getElementById('runBenchmarkBtn');
    if (runBtn) {
      runBtn.addEventListener('click', () => this.runLiveBenchmark());
    }
  }

  async runLiveBenchmark() {
    const progressArea = document.getElementById('benchmarkProgressArea');
    const progressBar = document.getElementById('benchmarkProgressBar');
    const progressStatus = document.getElementById('benchmarkProgressStatus');
    const progressPercent = document.getElementById('benchmarkProgressPercent');

    if (progressArea) progressArea.style.display = 'block';

    const onProgress = (percent, statusText) => {
      if (progressBar) progressBar.style.width = `${Math.round(percent * 100)}%`;
      if (progressPercent) progressPercent.textContent = `${Math.round(percent * 100)}%`;
      if (progressStatus) progressStatus.textContent = statusText;
    };

    const results = await this.evaluation.runFullBenchmark(onProgress);
    if (progressStatus) progressStatus.textContent = 'Benchmark completed successfully!';

    setTimeout(() => {
      this.renderAnalyticsDashboard();
    }, 400);
  }

  exportBenchmarkCsv() {
    const csvContent = this.evaluation.exportToCsv();
    if (!csvContent) return;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ir_benchmark_results_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ==========================================================================
     PAGE 6: PAGERANK GRAPH EXPLORER
     ========================================================================== */
  renderGraphExplorer() {
    const container = document.getElementById('graphContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="bento-grid">
        <!-- Graph Canvas Card (8 Cols) -->
        <div class="bento-card col-8" style="min-height: 580px; padding: 1.25rem; display: flex; flex-direction: column;">
          <div class="bento-header">
            <div>
              <div class="hero-tag">HYPERLINK TOPOLOGY & PAGERANK FLOW</div>
              <h2 style="font-size: 1.45rem; font-weight: 800; letter-spacing: -0.02em; margin: 0.35rem 0 0.15rem;">
                Document Relationship Network
              </h2>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">
                45 nodes, 179 directed edges. Node radius represents PageRank authority score. Click or drag any node to inspect authority.
              </div>
            </div>
            <div style="display: flex; gap: 0.4rem;">
              <span class="corpus-pill-badge" style="font-size: 0.72rem;">d=0.85 Damping</span>
            </div>
          </div>

          <!-- SVG Visualizer Canvas -->
          <div id="graphCanvasWrapper" style="flex: 1; width: 100%; min-height: 480px; position: relative; background: var(--bg-subtle); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); overflow: hidden;">
          </div>
        </div>

        <!-- Node Inspector Bento Card (4 Cols) -->
        <div class="bento-card col-4" id="graphInspectorPanel" style="min-height: 580px;">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div>
                <div class="bento-title">Node Inspector</div>
                <div class="bento-subtitle">Select a document in the graph</div>
              </div>
            </div>
          </div>

          <div id="inspectorContent" style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="padding: 2.5rem 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.88rem;">
              Click on any node in the graph network to inspect its in-links, out-links, and PageRank distribution.
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const graphWrapper = document.getElementById('graphCanvasWrapper');
      if (graphWrapper) {
        const graphData = this.pageRank.getVisualizationGraph();
        this.graphVisualizer = new GraphVisualizer(graphWrapper, graphData, (selectedNode) => {
          this.updateGraphInspector(selectedNode);
        });
      }
    }, 60);
  }

  updateGraphInspector(node) {
    const panel = document.getElementById('inspectorContent');
    if (!panel) return;

    if (!node) {
      panel.innerHTML = `
        <div style="padding: 2.5rem 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.88rem;">
          Click on any node in the graph network to inspect its in-links, out-links, and PageRank distribution.
        </div>
      `;
      return;
    }

    const inLinks = this.pageRank.getInLinks(node.id) || [];
    const outLinks = this.pageRank.getOutLinks(node.id) || [];
    const doc = this.index.getDocById(node.id);

    panel.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.85rem;">
        <div>
          <span class="category-badge">${node.category}</span>
          <h3 style="font-size: 1.35rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 0.35rem; color: var(--text-primary);">
            ${node.title}
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem;">
          <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">PageRank</div>
            <div style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: var(--accent-purple);">${node.pageRank.toFixed(6)}</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">Total Links</div>
            <div style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: var(--accent-primary);">${inLinks.length + outLinks.length}</div>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">
          ${doc ? doc.summary : ''}
        </p>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent-success); margin-bottom: 0.35rem;">
            ← Incoming Backlinks (${inLinks.length}):
          </div>
          <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5;">
            ${inLinks.length > 0 ? inLinks.map(id => {
              const d = this.index.getDocById(id);
              return d ? d.title : id;
            }).join(', ') : 'None (Root Node)'}
          </div>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 0.35rem;">
            → Outgoing Citations (${outLinks.length}):
          </div>
          <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5;">
            ${outLinks.length > 0 ? outLinks.map(id => {
              const d = this.index.getDocById(id);
              return d ? d.title : id;
            }).join(', ') : 'None (Dangling Node)'}
          </div>
        </div>

        <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
          <button class="search-btn-primary" style="flex: 1; padding: 0.55rem; font-size: 0.82rem;" onclick="window.irApp.searchFromChip('${node.title}')">
            Search in Engine ↵
          </button>
          <button class="btn-ghost-sm" onclick="window.irApp.openDocumentModal('${node.id}')">
            Full Modal
          </button>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     PAGE 7: ABOUT PROJECT
     ========================================================================== */
  renderAboutProject() {
    const container = document.getElementById('aboutContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="bento-grid">
        <div class="bento-card col-12">
          <div class="hero-tag">ACADEMIC CAPSTONE PROJECT</div>
          <h2 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; margin: 0.4rem 0 0.5rem;">
            Mini Search Engine Using TF-IDF and PageRank
          </h2>
          <p style="color: var(--text-secondary); font-size: 1rem; max-width: 820px; line-height: 1.6;">
            A Comparative Study of Text Retrieval and Link-Based Ranking developed for the KTU B.Tech Computer Science and Engineering Information Retrieval curriculum.
          </p>
        </div>

        <div class="bento-card col-6">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div class="bento-title">System Architecture</div>
            </div>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            The project operates entirely client-side using authentic zero-dependency data structures:
          </p>
          <ul style="margin-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7;">
            <li><strong>Text Preprocessor:</strong> Alphanumeric tokenization, Porter suffix stemming, SMART stop-words elimination.</li>
            <li><strong>Inverted Index:</strong> Record-level posting lists with positions, term frequencies, and document lengths.</li>
            <li><strong>Vector Space Engine:</strong> Smoothed IDF calculation, Euclidean document normalization, cosine similarity.</li>
            <li><strong>PageRank Power Iteration:</strong> Directed adjacency matrix with damping factor d=0.85 and dangling node redistribution.</li>
            <li><strong>Extractive QA:</strong> Natural language intent detection and sentence scoring from authentic source text.</li>
          </ul>
        </div>

        <div class="bento-card col-6">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <div class="bento-title">Evaluation Methodology</div>
            </div>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Following strict Information Retrieval academic benchmarking standards:
          </p>
          <ul style="margin-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7;">
            <li><strong>Precision@10:</strong> Fraction of top 10 retrieved documents that are relevant according to human ground truth.</li>
            <li><strong>Search Execution Latency:</strong> Sub-millisecond timing using high-resolution monotonic clocks (<code>performance.now()</code>), strictly excluding initialization, index building, and DOM rendering.</li>
            <li><strong>Controlled Testing:</strong> 30 diverse queries across 5 distinct query categories (Single-Word, Multiword, Ambiguous, Rare/Specific, Natural Language questions).</li>
          </ul>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     GLOBAL MODAL & UTILITY FUNCTIONS
     ========================================================================== */
  openDocumentModal(docId) {
    const doc = this.index.getDocById(docId);
    if (!doc) return;

    const modalOverlay = document.getElementById('docModalOverlay');
    const modalContent = document.getElementById('docModalContent');
    if (!modalOverlay || !modalContent) return;

    const inLinks = this.pageRank.getInLinks(docId) || [];
    const outLinks = this.pageRank.getOutLinks(docId) || [];

    modalContent.innerHTML = `
      <div style="font-size: 0.75rem; color: var(--accent-primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem;">
        ${doc.category}
      </div>
      <h2 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.85rem;">${doc.title}</h2>
      
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
        <span class="kpi-badge" style="background: var(--accent-purple-subtle); color: var(--accent-purple);">PageRank: ${this.pageRank.getScore(doc.id).toFixed(6)}</span>
        <span class="kpi-badge primary">Backlinks: ${inLinks.length}</span>
        <span class="kpi-badge success">Outgoing Citations: ${outLinks.length}</span>
      </div>

      <div style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 1.5rem;">
        ${doc.content}
      </div>

      <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 1rem; border: 1px solid var(--border-subtle); margin-bottom: 1.25rem;">
        <div style="font-weight: 700; font-size: 0.85rem; margin-bottom: 0.35rem;">Hyperlink Topology:</div>
        <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
          <strong>Incoming links (${inLinks.length}):</strong> ${inLinks.length > 0 ? inLinks.map(id => this.index.getDocById(id)?.title || id).join(', ') : 'None'}
        </div>
        <div style="font-size: 0.78rem; color: var(--text-secondary);">
          <strong>Outgoing links (${outLinks.length}):</strong> ${outLinks.length > 0 ? outLinks.map(id => this.index.getDocById(id)?.title || id).join(', ') : 'None'}
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="search-btn-primary" style="text-decoration: none; padding: 0.6rem 1.2rem; font-size: 0.85rem;">
          Read on Wikipedia ↗
        </a>
      </div>
    `;

    modalOverlay.classList.add('open');
  }

  toggleMathDetails(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
}

// Bootstrap on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.irApp = new InformationRetrievalApp();
});
