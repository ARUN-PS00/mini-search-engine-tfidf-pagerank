/**
 * Interactive SVG Force-Directed Graph Visualizer for Wikipedia Web Links & PageRank.
 * Provides live physics simulation, node dragging, authority flow arrows, and inspection tooltip.
 */
export class GraphVisualizer {
  constructor(containerElement, graphData, onNodeSelect = null) {
    this.container = containerElement;
    this.rawNodes = graphData.nodes;
    this.rawLinks = graphData.links;
    this.onNodeSelect = onNodeSelect;

    this.width = containerElement.clientWidth || 800;
    this.height = containerElement.clientHeight || 520;

    this.nodes = [];
    this.links = [];
    this.selectedNodeId = null;
    this.draggedNode = null;
    this.isSimulating = false;

    this.initGraph();
  }

  initGraph() {
    this.container.innerHTML = '';

    // Create SVG container with responsive viewBox
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svg.setAttribute('class', 'ir-graph-svg');
    this.svg.style.width = '100%';
    this.svg.style.height = '100%';

    // Define marker arrowheads for directed edges
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="arrowhead" viewBox="0 -5 10 10" refX="18" refY="0" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,-5L10,0L0,5" fill="rgba(140, 150, 170, 0.6)"></path>
      </marker>
      <marker id="arrowhead-highlight-in" viewBox="0 -5 10 10" refX="18" refY="0" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,-5L10,0L0,5" fill="#10b981"></path>
      </marker>
      <marker id="arrowhead-highlight-out" viewBox="0 -5 10 10" refX="18" refY="0" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,-5L10,0L0,5" fill="#3b82f6"></path>
      </marker>
      <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
      <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ec4899" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>
    `;
    this.svg.appendChild(defs);

    // Groups for links, nodes, and labels
    this.linkGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.linkGroup.setAttribute('class', 'graph-links');
    this.nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.nodeGroup.setAttribute('class', 'graph-nodes');
    this.labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.labelGroup.setAttribute('class', 'graph-labels');

    this.svg.appendChild(this.linkGroup);
    this.svg.appendChild(this.nodeGroup);
    this.svg.appendChild(this.labelGroup);
    this.container.appendChild(this.svg);

    // Setup initial node positions in an organic circular layout
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radius = Math.min(centerX, centerY) * 0.75;

    this.nodes = this.rawNodes.map((n, i) => {
      const angle = (i / this.rawNodes.length) * 2 * Math.PI;
      return {
        ...n,
        x: centerX + radius * Math.cos(angle) + (Math.random() - 0.5) * 50,
        y: centerY + radius * Math.sin(angle) + (Math.random() - 0.5) * 50,
        vx: 0,
        vy: 0,
        radius: Math.max(9, Math.min(26, Math.sqrt(n.pageRank * 1000) * 4.5))
      };
    });

    // Map links to node object references
    const nodeMap = new Map(this.nodes.map(n => [n.id, n]));
    this.links = this.rawLinks
      .filter(l => nodeMap.has(l.source) && nodeMap.has(l.target))
      .map(l => ({
        source: nodeMap.get(l.source),
        target: nodeMap.get(l.target),
        sourceId: l.source,
        targetId: l.target
      }));

    this.renderDOM();
    this.setupInteractivity();
    this.runSimulation();
  }

  renderDOM() {
    this.linkGroup.innerHTML = '';
    this.nodeGroup.innerHTML = '';
    this.labelGroup.innerHTML = '';

    // Create Link Elements
    this.linkElements = this.links.map(link => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', 'graph-edge');
      line.setAttribute('stroke', 'rgba(150, 160, 180, 0.35)');
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('marker-end', 'url(#arrowhead)');
      line.dataset.source = link.sourceId;
      line.dataset.target = link.targetId;
      this.linkGroup.appendChild(line);
      return { element: line, link };
    });

    // Create Node Elements
    this.nodeElements = this.nodes.map(node => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', 'graph-node');
      circle.setAttribute('r', node.radius);
      circle.setAttribute('fill', node.inDegree >= 4 ? 'url(#hubGradient)' : 'url(#nodeGradient)');
      circle.setAttribute('stroke', '#ffffff');
      circle.setAttribute('stroke-width', '2');
      circle.style.cursor = 'pointer';
      circle.dataset.id = node.id;
      this.nodeGroup.appendChild(circle);

      // Label Element
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('class', 'graph-node-label');
      text.setAttribute('font-size', '10px');
      text.setAttribute('font-family', '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, sans-serif');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', 'var(--text-secondary, #475569)');
      text.setAttribute('pointer-events', 'none');
      text.textContent = node.title.length > 14 ? node.title.slice(0, 12) + '…' : node.title;
      this.labelGroup.appendChild(text);

      return { element: circle, label: text, node };
    });
  }

  setupInteractivity() {
    this.svg.addEventListener('mousemove', e => {
      if (this.draggedNode) {
        const rect = this.svg.getBoundingClientRect();
        this.draggedNode.x = e.clientX - rect.left;
        this.draggedNode.y = e.clientY - rect.top;
        this.updatePositions();
      }
    });

    window.addEventListener('mouseup', () => {
      this.draggedNode = null;
    });

    this.nodeElements.forEach(({ element, node }) => {
      element.addEventListener('mousedown', e => {
        e.stopPropagation();
        this.draggedNode = node;
      });

      element.addEventListener('click', e => {
        e.stopPropagation();
        this.selectNode(node.id);
      });

      element.addEventListener('mouseenter', () => {
        this.highlightNode(node.id);
      });

      element.addEventListener('mouseleave', () => {
        if (!this.selectedNodeId) {
          this.resetHighlights();
        } else {
          this.highlightNode(this.selectedNodeId);
        }
      });
    });

    this.svg.addEventListener('click', () => {
      this.selectedNodeId = null;
      this.resetHighlights();
      if (this.onNodeSelect) this.onNodeSelect(null);
    });
  }

  selectNode(nodeId) {
    this.selectedNodeId = nodeId;
    this.highlightNode(nodeId);
    const node = this.nodes.find(n => n.id === nodeId);
    if (this.onNodeSelect) this.onNodeSelect(node);
  }

  highlightNode(nodeId) {
    const activeIncoming = new Set();
    const activeOutgoing = new Set();

    this.links.forEach(l => {
      if (l.targetId === nodeId) activeIncoming.add(l.sourceId);
      if (l.sourceId === nodeId) activeOutgoing.add(l.targetId);
    });

    // Dim or highlight nodes
    this.nodeElements.forEach(({ element, label, node }) => {
      const isTarget = node.id === nodeId;
      const isIncoming = activeIncoming.has(node.id);
      const isOutgoing = activeOutgoing.has(node.id);

      if (isTarget) {
        element.setAttribute('stroke', '#f59e0b');
        element.setAttribute('stroke-width', '4');
        element.style.opacity = '1';
        label.setAttribute('font-weight', '700');
        label.setAttribute('fill', 'var(--text-primary, #0f172a)');
      } else if (isIncoming) {
        element.setAttribute('stroke', '#10b981');
        element.setAttribute('stroke-width', '3');
        element.style.opacity = '1';
        label.setAttribute('fill', '#10b981');
      } else if (isOutgoing) {
        element.setAttribute('stroke', '#3b82f6');
        element.setAttribute('stroke-width', '3');
        element.style.opacity = '1';
        label.setAttribute('fill', '#3b82f6');
      } else {
        element.setAttribute('stroke', '#ffffff');
        element.setAttribute('stroke-width', '1.5');
        element.style.opacity = '0.25';
        label.setAttribute('fill', 'rgba(150, 160, 180, 0.4)');
      }
    });

    // Color links by authority flow
    this.linkElements.forEach(({ element, link }) => {
      if (link.targetId === nodeId) {
        element.setAttribute('stroke', '#10b981');
        element.setAttribute('stroke-width', '2.5');
        element.setAttribute('marker-end', 'url(#arrowhead-highlight-in)');
        element.style.opacity = '1';
      } else if (link.sourceId === nodeId) {
        element.setAttribute('stroke', '#3b82f6');
        element.setAttribute('stroke-width', '2.5');
        element.setAttribute('marker-end', 'url(#arrowhead-highlight-out)');
        element.style.opacity = '1';
      } else {
        element.setAttribute('stroke', 'rgba(150, 160, 180, 0.15)');
        element.setAttribute('stroke-width', '1');
        element.setAttribute('marker-end', 'url(#arrowhead)');
        element.style.opacity = '0.15';
      }
    });
  }

  resetHighlights() {
    this.nodeElements.forEach(({ element, label, node }) => {
      element.setAttribute('stroke', '#ffffff');
      element.setAttribute('stroke-width', '2');
      element.style.opacity = '1';
      label.setAttribute('font-weight', '400');
      label.setAttribute('fill', 'var(--text-secondary, #475569)');
    });

    this.linkElements.forEach(({ element }) => {
      element.setAttribute('stroke', 'rgba(150, 160, 180, 0.35)');
      element.setAttribute('stroke-width', '1.5');
      element.setAttribute('marker-end', 'url(#arrowhead)');
      element.style.opacity = '1';
    });
  }

  runSimulation() {
    let iteration = 0;
    const maxIters = 120;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    const step = () => {
      if (iteration++ > maxIters) return;

      // 1. Repulsion between all node pairs (Coulomb-like)
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n1 = this.nodes[i];
          const n2 = this.nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);

          if (dist < 260) {
            const force = (2800 / distSq);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (n1 !== this.draggedNode) { n1.vx -= fx; n1.vy -= fy; }
            if (n2 !== this.draggedNode) { n2.vx += fx; n2.vy += fy; }
          }
        }
      }

      // 2. Attraction along connected edges (Hooke's spring)
      for (const link of this.links) {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const idealDist = 95;
        const springForce = (dist - idealDist) * 0.04;

        const fx = (dx / dist) * springForce;
        const fy = (dy / dist) * springForce;

        if (link.source !== this.draggedNode) {
          link.source.vx += fx;
          link.source.vy += fy;
        }
        if (link.target !== this.draggedNode) {
          link.target.vx -= fx;
          link.target.vy -= fy;
        }
      }

      // 3. Center gravitational pull & damping
      for (const node of this.nodes) {
        if (node === this.draggedNode) continue;

        node.vx += (centerX - node.x) * 0.008;
        node.vy += (centerY - node.y) * 0.008;

        node.vx *= 0.85;
        node.vy *= 0.85;

        node.x += node.vx;
        node.y += node.vy;

        // Keep inside bounds
        node.x = Math.max(30, Math.min(this.width - 30, node.x));
        node.y = Math.max(30, Math.min(this.height - 30, node.y));
      }

      this.updatePositions();

      if (iteration <= maxIters) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  updatePositions() {
    this.nodeElements.forEach(({ element, label, node }) => {
      element.setAttribute('cx', node.x);
      element.setAttribute('cy', node.y);
      label.setAttribute('x', node.x);
      label.setAttribute('y', node.y + node.radius + 12);
    });

    this.linkElements.forEach(({ element, link }) => {
      element.setAttribute('x1', link.source.x);
      element.setAttribute('y1', link.source.y);
      element.setAttribute('x2', link.target.x);
      element.setAttribute('y2', link.target.y);
    });
  }

  filterHighlight(matchingDocIds) {
    if (!matchingDocIds || matchingDocIds.length === 0) {
      this.resetHighlights();
      return;
    }
    const matchSet = new Set(matchingDocIds);
    this.nodeElements.forEach(({ element, label, node }) => {
      if (matchSet.has(node.id)) {
        element.setAttribute('stroke', '#3b82f6');
        element.setAttribute('stroke-width', '3');
        element.style.opacity = '1';
        label.setAttribute('font-weight', '600');
        label.setAttribute('fill', '#2563eb');
      } else {
        element.setAttribute('stroke', '#e2e8f0');
        element.setAttribute('stroke-width', '1');
        element.style.opacity = '0.2';
        label.setAttribute('fill', 'rgba(150, 160, 180, 0.3)');
      }
    });
  }
}
