// Core utilities for Tata Trusts data visualizations
// Shared functions, constants, and helpers

// Constants
export const COLORS = {
  dark: '#23272b',
  lightBlue: '#9fcdff',
  red: '#d0362d',
  teal: '#17a2b8',
  success: '#28a745',
  warning: '#ffc107',
  purple: '#6f42c1',
  lightGray: '#f5f5f5',
  mediumGray: '#6c757d',
  white: '#ffffff'
};

export const THEME_COLORS = {
  Health: '#d0362d',
  Education: '#17a2b8',
  Livelihoods: '#28a745',
  WASH: '#9fcdff',
  Skilling: '#6f42c1'
};

export const DEFAULT_MARGIN = {
  top: 20,
  right: 30,
  bottom: 50,
  left: 60
};

// Utility functions
export const $ = (selector, el = document) => el.querySelector(selector);
export const $$ = (selector, el = document) => Array.from(el.querySelectorAll(selector));

// Data loading with caching
const dataCache = new Map();

export async function loadData(url) {
  if (dataCache.has(url)) {
    return dataCache.get(url);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  const text = await response.text();
  const data = parseCSV(text);
  dataCache.set(url, data);
  return data;
}

// Simple CSV parser
export function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = parseValue(values[i]);
    });
    return obj;
  });
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

function parseValue(value) {
  if (value === '' || value === 'null' || value === 'undefined') {
    return null;
  }
  if (value === 'true') return true;
  if (value === 'false') return false;
  const num = Number(value);
  if (!isNaN(num)) return num;
  return value.replace(/^"|"$/g, '');
}

// Number formatting
export function formatNumber(num, decimals = 0) {
  if (num == null || isNaN(num)) return 'N/A';
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

export function formatCurrency(num, decimals = 0) {
  if (num == null || isNaN(num)) return 'N/A';
  return '₹' + formatNumber(num, decimals);
}

export function formatPercent(num, decimals = 1) {
  if (num == null || isNaN(num)) return 'N/A';
  return (num * 100).toFixed(decimals) + '%';
}

export function formatCompact(num) {
  if (num == null || isNaN(num)) return 'N/A';
  if (num >= 1e7) return (num / 1e7).toFixed(1) + 'Cr';
  if (num >= 1e5) return (num / 1e5).toFixed(1) + 'L';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
}

// Data aggregation helpers
export function groupBy(data, key) {
  return data.reduce((acc, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

export function sumBy(data, key) {
  return data.reduce((sum, item) => {
    const value = typeof key === 'function' ? key(item) : item[key];
    return sum + (value || 0);
  }, 0);
}

export function meanBy(data, key) {
  if (data.length === 0) return 0;
  return sumBy(data, key) / data.length;
}

export function medianBy(data, key) {
  if (data.length === 0) return 0;
  const values = data.map(item => typeof key === 'function' ? key(item) : item[key]).sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);
  return values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
}

// Responsive chart utilities
export function getResponsiveDimensions(container, aspectRatio = 1.6) {
  const width = container.clientWidth || 800;
  const height = width / aspectRatio;
  return { width, height };
}

export function attachResizeObserver(container, onResize) {
  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      onResize(entry.contentRect);
    }
  });
  observer.observe(container);
  return observer;
}

// DOM utilities
export function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export function createSVG(container, width, height, margin = DEFAULT_MARGIN) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.style.maxWidth = '100%';
  svg.style.height = 'auto';

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
  svg.appendChild(g);

  container.appendChild(svg);

  return {
    svg,
    g,
    innerWidth: width - margin.left - margin.right,
    innerHeight: height - margin.top - margin.bottom
  };
}

// Loading indicator
export function showLoading(container) {
  const loading = document.createElement('div');
  loading.className = 'text-center my-5';
  loading.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
  container.appendChild(loading);
  return loading;
}

export function removeLoading(loadingElement) {
  if (loadingElement && loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
  }
}

// Error display
export function showError(container, message) {
  const error = document.createElement('div');
  error.className = 'alert alert-danger';
  error.role = 'alert';
  error.innerHTML = `<strong>Error:</strong> ${message}`;
  container.appendChild(error);
}

// Tooltip
export function createTooltip() {
  let tooltip = $('#chart-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'chart-tooltip';
    tooltip.className = 'chart-tooltip';
    document.body.appendChild(tooltip);
  }
  return {
    show(x, y, content) {
      tooltip.innerHTML = content;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
      tooltip.style.opacity = '1';
      tooltip.style.pointerEvents = 'none';
    },
    hide() {
      tooltip.style.opacity = '0';
    }
  };
}

// Calculate quadrants (for scatter plots)
export function getQuadrants(data, xKey, yKey) {
  const xMedian = medianBy(data, xKey);
  const yMedian = medianBy(data, yKey);
  return { xMedian, yMedian };
}

// Sort and rank
export function rankBy(data, key, descending = true) {
  return data
    .map(item => ({
      ...item,
      _value: typeof key === 'function' ? key(item) : item[key]
    }))
    .sort((a, b) => descending ? b._value - a._value : a._value - b._value)
    .map((item, index) => ({
      ...item,
      _rank: index + 1
    }));
}

// Color scales
export function getColorScale(values, colors = [COLORS.lightBlue, COLORS.teal, COLORS.red]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return value => {
    const normalized = (value - min) / (max - min);
    const index = Math.floor(normalized * (colors.length - 1));
    return colors[Math.min(index, colors.length - 1)];
  };
}

// Add styles to container
export function injectStyles(container, css) {
  const style = document.createElement('style');
  style.textContent = css;
  container.appendChild(style);
}

// Fullscreen functionality
export function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// Download chart as PNG
export function downloadChart(container, filename = 'chart.png') {
  const svg = container.querySelector('svg');
  if (!svg) {
    console.error('No SVG found in container');
    return;
  }

  // Create a canvas
  const canvas = document.createElement('canvas');
  const bbox = svg.getBoundingClientRect();
  canvas.width = bbox.width * 2; // 2x for better quality
  canvas.height = bbox.height * 2;

  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);

  // Convert SVG to data URL
  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(blob => {
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(url);
      URL.revokeObjectURL(link.href);
    });
  };
  img.src = url;
}

// Common chart styles
export const CHART_STYLES = `
  .chart-tooltip {
    position: fixed;
    padding: 8px 12px;
    background: rgba(35, 39, 43, 0.95);
    color: white;
    border-radius: 4px;
    font-size: 14px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 1000;
    max-width: 300px;
  }

  .chart-container {
    position: relative;
    width: 100%;
    min-height: 320px;
  }

  .chart-axis text {
    font-size: 12px;
    fill: #6c757d;
  }

  .chart-axis line,
  .chart-axis path {
    stroke: #dee2e6;
  }

  .chart-grid line {
    stroke: #f5f5f5;
    stroke-dasharray: 2,2;
  }

  .chart-label {
    font-size: 14px;
    font-weight: 600;
    fill: #23272b;
  }
`;
