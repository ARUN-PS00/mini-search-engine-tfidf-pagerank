import json
import matplotlib.pyplot as plt
import numpy as np
import os

# Set publication style
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial', 'Helvetica']
plt.rcParams['axes.edgecolor'] = '#cbd5e1'
plt.rcParams['axes.linewidth'] = 1.0

with open('evaluation_summary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

summary = data['summaryByAlgorithm']
categories = data['categorySummary']
detailed = data['detailedQueries']

# Colors matching project theme: Emerald (Boolean), Blue (TF-IDF), Violet (Hybrid)
colors = {
    'boolean_and': '#10b981',
    'boolean_or': '#059669',
    'tfidf': '#2563eb',
    'hybrid': '#7c3aed'
}

# Create a 2x2 multi-panel figure
fig = plt.figure(figsize=(16, 12), dpi=300)
fig.suptitle(
    'SeekIR: Comparative Evaluation of Information Retrieval Methods\n'
    'Boolean Retrieval vs. TF-IDF Vector Space vs. TF-IDF + PageRank Hybrid Ranking',
    fontsize=16, fontweight='bold', y=0.98, color='#0f172a'
)

# -------------------------------------------------------------
# Panel 1: Mean Precision@10
# -------------------------------------------------------------
ax1 = plt.subplot(2, 2, 1)
methods = ['Boolean (AND)', 'Boolean (OR)', 'TF-IDF', 'TF-IDF + PageRank']
method_keys = ['boolean_and', 'boolean_or', 'tfidf', 'hybrid']
p10_values = [summary[k]['meanPrecisionAt10'] for k in method_keys]
p10_stds = [summary[k]['stdPrecisionAt10'] for k in method_keys]
bar_colors = [colors[k] for k in method_keys]

bars1 = ax1.bar(methods, p10_values, yerr=p10_stds, capsize=5, color=bar_colors, width=0.55, edgecolor='#1e293b', linewidth=1.2, alpha=0.9)
ax1.set_ylabel('Mean Precision@10', fontsize=12, fontweight='bold', color='#1e293b')
ax1.set_title('(a) Mean Precision@10 Comparison across 30 Benchmark Queries', fontsize=12, fontweight='bold', pad=12, color='#1e293b')
ax1.set_ylim(0, 0.40)
ax1.grid(axis='y', linestyle='--', alpha=0.6)

# Value labels on top of bars
for bar in bars1:
    height = bar.get_height()
    ax1.annotate(f'{height:.4f}',
                 xy=(bar.get_x() + bar.get_width() / 2, height),
                 xytext=(0, 6),
                 textcoords="offset points",
                 ha='center', va='bottom', fontsize=11, fontweight='bold', color='#0f172a')

# -------------------------------------------------------------
# Panel 2: Median Response Time (ms)
# -------------------------------------------------------------
ax2 = plt.subplot(2, 2, 2)
time_values = [summary[k]['medianLatencyMs'] for k in method_keys]
bars2 = ax2.bar(methods, time_values, color=bar_colors, width=0.55, edgecolor='#1e293b', linewidth=1.2, alpha=0.9)
ax2.set_ylabel('Median Response Time (ms)', fontsize=12, fontweight='bold', color='#1e293b')
ax2.set_title('(b) Median Search Execution Latency (ms) [Lower is Faster]', fontsize=12, fontweight='bold', pad=12, color='#1e293b')
ax2.set_ylim(0, max(time_values) * 1.35)
ax2.grid(axis='y', linestyle='--', alpha=0.6)

for bar in bars2:
    height = bar.get_height()
    ax2.annotate(f'{height:.4f} ms',
                 xy=(bar.get_x() + bar.get_width() / 2, height),
                 xytext=(0, 6),
                 textcoords="offset points",
                 ha='center', va='bottom', fontsize=11, fontweight='bold', color='#0f172a')

# -------------------------------------------------------------
# Panel 3: Category Breakdown
# -------------------------------------------------------------
ax3 = plt.subplot(2, 2, 3)
cat_names = list(categories.keys())
x = np.arange(len(cat_names))
width = 0.20

cat_and = [categories[c]['meanPrecisionAt10']['boolean_and'] for c in cat_names]
cat_or = [categories[c]['meanPrecisionAt10']['boolean_or'] for c in cat_names]
cat_tfidf = [categories[c]['meanPrecisionAt10']['tfidf'] for c in cat_names]
cat_hybrid = [categories[c]['meanPrecisionAt10']['hybrid'] for c in cat_names]

rects1 = ax3.bar(x - 1.5 * width, cat_and, width, label='Boolean (AND)', color=colors['boolean_and'], edgecolor='#1e293b')
rects2 = ax3.bar(x - 0.5 * width, cat_or, width, label='Boolean (OR)', color=colors['boolean_or'], edgecolor='#1e293b')
rects3 = ax3.bar(x + 0.5 * width, cat_tfidf, width, label='TF-IDF', color=colors['tfidf'], edgecolor='#1e293b')
rects4 = ax3.bar(x + 1.5 * width, cat_hybrid, width, label='TF-IDF + PageRank', color=colors['hybrid'], edgecolor='#1e293b')

ax3.set_ylabel('Mean Precision@10', fontsize=12, fontweight='bold', color='#1e293b')
ax3.set_title('(c) Precision@10 Performance Across 5 Query Categories', fontsize=12, fontweight='bold', pad=12, color='#1e293b')
ax3.set_xticks(x)
ax3.set_xticklabels(cat_names, fontsize=10, fontweight='bold', rotation=12)
ax3.set_ylim(0, 0.45)
ax3.legend(frameon=True, facecolor='#ffffff', edgecolor='#cbd5e1', fontsize=9, loc='upper right')
ax3.grid(axis='y', linestyle='--', alpha=0.6)

# -------------------------------------------------------------
# Panel 4: Per-Query Precision@10 across all 30 queries
# -------------------------------------------------------------
ax4 = plt.subplot(2, 2, 4)
q_labels = [d['id'] for d in detailed]
q_indices = np.arange(len(q_labels))

q_and = [d['results']['boolean_and']['precisionAt10'] for d in detailed]
q_tfidf = [d['results']['tfidf']['precisionAt10'] for d in detailed]
q_hybrid = [d['results']['hybrid']['precisionAt10'] for d in detailed]

ax4.plot(q_indices, q_and, marker='o', markersize=4, linestyle='--', color=colors['boolean_and'], label='Boolean (AND)', alpha=0.7, linewidth=1.5)
ax4.plot(q_indices, q_tfidf, marker='s', markersize=4, linestyle='-', color=colors['tfidf'], label='TF-IDF', alpha=0.8, linewidth=1.8)
ax4.plot(q_indices, q_hybrid, marker='^', markersize=5, linestyle='-', color=colors['hybrid'], label='TF-IDF + PageRank', alpha=0.9, linewidth=2.2)

ax4.set_xlabel('Benchmark Query ID (Q01 – Q30)', fontsize=11, fontweight='bold', color='#1e293b')
ax4.set_ylabel('Precision@10', fontsize=12, fontweight='bold', color='#1e293b')
ax4.set_title('(d) Per-Query Precision@10 Distribution (Q01 to Q30)', fontsize=12, fontweight='bold', pad=12, color='#1e293b')
ax4.set_xticks(q_indices[::2])
ax4.set_xticklabels(q_labels[::2], fontsize=9)
ax4.set_ylim(-0.02, 0.70)
ax4.legend(frameon=True, facecolor='#ffffff', edgecolor='#cbd5e1', fontsize=9, loc='upper right')
ax4.grid(True, linestyle='--', alpha=0.6)

plt.tight_layout(rect=[0, 0.03, 1, 0.95])
out_path = 'evaluation_charts.png'
plt.savefig(out_path, dpi=300)
print(f'Saved comprehensive evaluation charts to: {os.path.abspath(out_path)}')

