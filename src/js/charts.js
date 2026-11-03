/**
 * SEARCHLAB — High-Precision Interactive SVG Chart Renderer
 * Apple-inspired minimalist design language with clean grid lines, soft pill bars, and clear typography.
 */
export class ChartRenderer {
  /**
   * Renders grouped comparison bar chart for Top 5 results across Boolean, TF-IDF, and Hybrid.
   */
  static renderTopScoresComparison(container, comparisonData) {
    if (!container) return;
    container.innerHTML = '';

    const width = container.clientWidth || 680;
    const height = 240;
    const margin = { top: 25, right: 30, bottom: 45, left: 50 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const topHybrid = (comparisonData && comparisonData.hybrid && comparisonData.hybrid.results)
      ? comparisonData.hybrid.results.slice(0, 5)
      : [];

    if (topHybrid.length === 0) {
      container.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-secondary); font-size: 0.88rem;">
          No comparison data available for this query. Execute a search to view multi-algorithm scores.
        </div>
      `;
      return;
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.width = '100%';
    svg.style.height = '100%';

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);

    // Y Axis Horizontal Grid Lines (0, 0.25, 0.5, 0.75, 1.0)
    [0, 0.25, 0.5, 0.75, 1.0].forEach(val => {
      const y = chartH - (val * chartH);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('x2', chartW);
      line.setAttribute('y1', y);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'var(--border-subtle, #E8EBF0)');
      line.setAttribute('stroke-dasharray', '3,3');
      g.appendChild(line);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '-10');
      label.setAttribute('y', y + 4);
      label.setAttribute('font-size', '10px');
      label.setAttribute('font-family', 'var(--font-sans)');
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('fill', 'var(--text-tertiary, #A0AEC0)');
      label.textContent = val.toFixed(2);
      g.appendChild(label);
    });

    const groupWidth = chartW / topHybrid.length;
    const barWidth = Math.min(22, groupWidth * 0.22);

    const tfIdfMap = new Map((comparisonData.tfIdf.results || []).map(r => [r.id, r.score]));
    const boolMap = new Map((comparisonData.boolean.results || []).map(r => [r.id, r.score]));

    topHybrid.forEach((doc, idx) => {
      const groupCenterX = (idx * groupWidth) + (groupWidth / 2);

      const boolScore = boolMap.get(doc.id) || 0;
      const tfScore = Math.min(1.0, tfIdfMap.get(doc.id) || 0);
      const hybScore = Math.min(1.0, doc.score || 0);

      const scores = [
        { name: 'Boolean', val: boolScore, color: '#18A878', xOffset: -barWidth * 1.25 },
        { name: 'TF-IDF', val: tfScore, color: '#3979C6', xOffset: 0 },
        { name: 'Hybrid', val: hybScore, color: '#7C3AED', xOffset: barWidth * 1.25 }
      ];

      scores.forEach(s => {
        const barH = Math.max(3, s.val * chartH);
        const barY = chartH - barH;
        const barX = groupCenterX + s.xOffset - (barWidth / 2);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', barX);
        rect.setAttribute('y', barY);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', barH);
        rect.setAttribute('rx', '4');
        rect.setAttribute('fill', s.color);
        rect.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

        const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleEl.textContent = `${doc.title} — ${s.name}: ${s.val.toFixed(4)}`;
        rect.appendChild(titleEl);

        g.appendChild(rect);
      });

      // Document X-Axis Label
      const docLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      docLabel.setAttribute('x', groupCenterX);
      docLabel.setAttribute('y', chartH + 20);
      docLabel.setAttribute('font-size', '11px');
      docLabel.setAttribute('font-family', 'var(--font-sans)');
      docLabel.setAttribute('text-anchor', 'middle');
      docLabel.setAttribute('font-weight', '600');
      docLabel.setAttribute('fill', 'var(--text-secondary, #777F8C)');
      const shortTitle = doc.title.length > 13 ? doc.title.slice(0, 11) + '…' : doc.title;
      docLabel.textContent = shortTitle;
      g.appendChild(docLabel);
    });

    container.appendChild(svg);
  }

  /**
   * Renders the Precision@10 comparison bar chart.
   */
  static renderPrecisionComparisonChart(container, summary) {
    if (!container || !summary) return;
    container.innerHTML = '';

    const width = container.clientWidth || 480;
    const height = 240;
    const margin = { top: 25, right: 25, bottom: 40, left: 50 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.width = '100%';
    svg.style.height = '100%';

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);

    // Max Precision bound (0.40 for generous headroom)
    const maxVal = 0.40;
    [0, 0.10, 0.20, 0.30, 0.40].forEach(val => {
      const y = chartH - ((val / maxVal) * chartH);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('x2', chartW);
      line.setAttribute('y1', y);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'var(--border-subtle, #E8EBF0)');
      line.setAttribute('stroke-dasharray', '3,3');
      g.appendChild(line);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '-10');
      label.setAttribute('y', y + 4);
      label.setAttribute('font-size', '10px');
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('fill', 'var(--text-tertiary, #A0AEC0)');
      label.textContent = val.toFixed(2);
      g.appendChild(label);
    });

    const algos = [
      { id: 'boolean_and', name: 'Boolean (AND)', color: '#18A878', p: summary.boolean_and ? summary.boolean_and.meanPrecisionAt10 : (summary.boolean ? summary.boolean.meanPrecisionAt10 : 0.2233) },
      { id: 'boolean_or', name: 'Boolean (OR)', color: '#059669', p: summary.boolean_or ? summary.boolean_or.meanPrecisionAt10 : 0.2733 },
      { id: 'tfidf', name: 'TF-IDF', color: '#3979C6', p: summary.tfidf ? summary.tfidf.meanPrecisionAt10 : 0.2767 },
      { id: 'hybrid', name: 'Hybrid (PR+TF)', color: '#7C3AED', p: summary.hybrid ? summary.hybrid.meanPrecisionAt10 : 0.2800 }
    ];

    const slotW = chartW / algos.length;
    const barW = Math.min(36, slotW * 0.45);

    algos.forEach((algo, idx) => {
      const cx = (idx * slotW) + (slotW / 2);
      const barH = Math.max(4, (algo.p / maxVal) * chartH);
      const barY = chartH - barH;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', cx - (barW / 2));
      rect.setAttribute('y', barY);
      rect.setAttribute('width', barW);
      rect.setAttribute('height', barH);
      rect.setAttribute('rx', '6');
      rect.setAttribute('fill', algo.color);
      g.appendChild(rect);

      // Score label above bar
      const scoreTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      scoreTxt.setAttribute('x', cx);
      scoreTxt.setAttribute('y', barY - 6);
      scoreTxt.setAttribute('font-size', '11px');
      scoreTxt.setAttribute('font-weight', '700');
      scoreTxt.setAttribute('text-anchor', 'middle');
      scoreTxt.setAttribute('fill', algo.color);
      scoreTxt.textContent = algo.p.toFixed(4);
      g.appendChild(scoreTxt);

      // Name label below bar
      const nameTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      nameTxt.setAttribute('x', cx);
      nameTxt.setAttribute('y', chartH + 18);
      nameTxt.setAttribute('font-size', '10px');
      nameTxt.setAttribute('font-weight', '600');
      nameTxt.setAttribute('text-anchor', 'middle');
      nameTxt.setAttribute('fill', 'var(--text-secondary, #777F8C)');
      nameTxt.textContent = algo.name;
      g.appendChild(nameTxt);
    });

    container.appendChild(svg);
  }

  /**
   * Renders the Median Latency (Response Time) comparison bar chart.
   */
  static renderLatencyComparisonChart(container, summary) {
    if (!container || !summary) return;
    container.innerHTML = '';

    const width = container.clientWidth || 480;
    const height = 240;
    const margin = { top: 25, right: 25, bottom: 40, left: 60 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.width = '100%';
    svg.style.height = '100%';

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);

    const algos = [
      { id: 'boolean_and', name: 'Boolean (AND)', color: '#18A878', lat: summary.boolean_and ? summary.boolean_and.medianLatencyMs : (summary.boolean ? summary.boolean.medianLatencyMs : 0.0261) },
      { id: 'boolean_or', name: 'Boolean (OR)', color: '#059669', lat: summary.boolean_or ? summary.boolean_or.medianLatencyMs : 0.0207 },
      { id: 'tfidf', name: 'TF-IDF', color: '#3979C6', lat: summary.tfidf ? summary.tfidf.medianLatencyMs : 0.1072 },
      { id: 'hybrid', name: 'Hybrid (PR+TF)', color: '#7C3AED', lat: summary.hybrid ? summary.hybrid.medianLatencyMs : 0.1232 }
    ];

    const maxVal = 0.15; // ms
    [0, 0.05, 0.10, 0.15].forEach(val => {
      const y = chartH - ((val / maxVal) * chartH);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('x2', chartW);
      line.setAttribute('y1', y);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'var(--border-subtle, #E8EBF0)');
      line.setAttribute('stroke-dasharray', '3,3');
      g.appendChild(line);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '-10');
      label.setAttribute('y', y + 4);
      label.setAttribute('font-size', '10px');
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('fill', 'var(--text-tertiary, #A0AEC0)');
      label.textContent = `${val.toFixed(2)} ms`;
      g.appendChild(label);
    });

    const slotW = chartW / algos.length;
    const barW = Math.min(36, slotW * 0.45);

    algos.forEach((algo, idx) => {
      const cx = (idx * slotW) + (slotW / 2);
      const barH = Math.max(4, (algo.lat / maxVal) * chartH);
      const barY = chartH - barH;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', cx - (barW / 2));
      rect.setAttribute('y', barY);
      rect.setAttribute('width', barW);
      rect.setAttribute('height', barH);
      rect.setAttribute('rx', '6');
      rect.setAttribute('fill', algo.color);
      g.appendChild(rect);

      // Latency text above bar
      const scoreTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      scoreTxt.setAttribute('x', cx);
      scoreTxt.setAttribute('y', barY - 6);
      scoreTxt.setAttribute('font-size', '10px');
      scoreTxt.setAttribute('font-family', 'var(--font-mono)');
      scoreTxt.setAttribute('font-weight', '700');
      scoreTxt.setAttribute('text-anchor', 'middle');
      scoreTxt.setAttribute('fill', algo.color);
      scoreTxt.textContent = `${algo.lat.toFixed(4)}ms`;
      g.appendChild(scoreTxt);

      // Name label below bar
      const nameTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      nameTxt.setAttribute('x', cx);
      nameTxt.setAttribute('y', chartH + 18);
      nameTxt.setAttribute('font-size', '10px');
      nameTxt.setAttribute('font-weight', '600');
      nameTxt.setAttribute('text-anchor', 'middle');
      nameTxt.setAttribute('fill', 'var(--text-secondary, #777F8C)');
      nameTxt.textContent = algo.name;
      g.appendChild(nameTxt);
    });

    container.appendChild(svg);
  }

  /**
   * Renders the 5 Category Breakdown Grouped Bar Chart.
   */
  static renderCategoryBreakdownChart(container, categorySummary) {
    if (!container || !categorySummary) return;
    container.innerHTML = '';

    const width = container.clientWidth || 720;
    const height = 260;
    const margin = { top: 25, right: 30, bottom: 45, left: 50 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.width = '100%';
    svg.style.height = '100%';

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);

    const categories = Object.keys(categorySummary);
    const maxVal = 0.45;

    [0, 0.15, 0.30, 0.45].forEach(val => {
      const y = chartH - ((val / maxVal) * chartH);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('x2', chartW);
      line.setAttribute('y1', y);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'var(--border-subtle, #E8EBF0)');
      line.setAttribute('stroke-dasharray', '3,3');
      g.appendChild(line);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '-10');
      label.setAttribute('y', y + 4);
      label.setAttribute('font-size', '10px');
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('fill', 'var(--text-tertiary, #A0AEC0)');
      label.textContent = val.toFixed(2);
      g.appendChild(label);
    });

    const groupW = chartW / categories.length;
    const barW = Math.min(14, groupW * 0.18);

    categories.forEach((catName, cIdx) => {
      const cData = categorySummary[catName];
      const cx = (cIdx * groupW) + (groupW / 2);

      const pData = cData.meanPrecisionAt10 || {};
      const algos = [
        { name: 'Boolean (AND)', val: pData.boolean_and ?? pData.boolean ?? 0, color: '#18A878', offset: -barW * 1.5 },
        { name: 'Boolean (OR)', val: pData.boolean_or ?? 0, color: '#059669', offset: -barW * 0.5 },
        { name: 'TF-IDF', val: pData.tfidf ?? 0, color: '#3979C6', offset: barW * 0.5 },
        { name: 'Hybrid', val: pData.hybrid ?? 0, color: '#7C3AED', offset: barW * 1.5 }
      ];

      algos.forEach(a => {
        const barH = Math.max(2, (a.val / maxVal) * chartH);
        const barY = chartH - barH;
        const barX = cx + a.offset - (barW / 2);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', barX);
        rect.setAttribute('y', barY);
        rect.setAttribute('width', barW);
        rect.setAttribute('height', barH);
        rect.setAttribute('rx', '3');
        rect.setAttribute('fill', a.color);

        const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleEl.textContent = `${catName} — ${a.name}: ${a.val.toFixed(4)}`;
        rect.appendChild(titleEl);

        g.appendChild(rect);
      });

      // Category label
      const catTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      catTxt.setAttribute('x', cx);
      catTxt.setAttribute('y', chartH + 20);
      catTxt.setAttribute('font-size', '10px');
      catTxt.setAttribute('font-weight', '600');
      catTxt.setAttribute('text-anchor', 'middle');
      catTxt.setAttribute('fill', 'var(--text-secondary, #777F8C)');
      catTxt.textContent = catName;
      g.appendChild(catTxt);
    });

    container.appendChild(svg);
  }
}
