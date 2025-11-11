// Main application script
// Uses ES2022+ features and ESM modules

// Brand colors from Tata Trusts style guide
const COLORS = {
  dark: '#23272b',
  blue: '#9fcdff',
  red: '#d0362d',
  teal: '#17a2b8',
  lightGray: '#f5f5f5',
  mediumGray: '#6c757d',
  success: '#28a745',
  warning: '#ffc107',
  purple: '#6f42c1',
};

// Chart.js default configuration
Chart.defaults.font.family = "'Titillium Web', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
Chart.defaults.color = COLORS.mediumGray;

// Load data and initialize
async function init() {
  const data = await loadData();

  // Initialize visualizations
  createWorkAreasChart(data.workAreas);
  createRequirementsChart(data.keyRequirements);
  createTimelineChart(data.timeline.events);
  createEvaluationCharts(data.evaluationCriteria);

  // Populate dynamic content
  populateInsights(data.preBidInsights);
  populateTimeline(data.timeline.events);
  populateDeliverables(data.deliverables);

  // Initialize scroll animations
  initScrollAnimations();

  // Smooth scroll for navigation
  initSmoothScroll();
}

// Load data from JSON file
async function loadData() {
  const response = await fetch('data.json');
  return await response.json();
}

// Create work areas donut chart
function createWorkAreasChart(workAreas) {
  const ctx = document.getElementById('work-areas-chart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: workAreas.map(area => area.name),
      datasets: [{
        data: workAreas.map(area => area.percentage),
        backgroundColor: [
          COLORS.teal,
          COLORS.blue,
          COLORS.success,
          COLORS.warning,
          COLORS.purple,
        ],
        borderWidth: 0,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true,
            font: { size: 13 }
          }
        },
        tooltip: {
          callbacks: {
            label: context => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const count = workAreas[context.dataIndex].grantCount;
              return `${label}: ${value}% (${count} grants)`;
            }
          }
        }
      }
    }
  });
}

// Create requirements horizontal bar chart
function createRequirementsChart(requirements) {
  const ctx = document.getElementById('requirements-chart');

  // Count by priority
  const priorities = {
    'Must Have': requirements.filter(r => r.priority === 'Must Have').length,
    'Good to Have': requirements.filter(r => r.priority === 'Good to Have').length,
    'Wish to Have': requirements.filter(r => r.priority === 'Wish to Have').length,
  };

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(priorities),
      datasets: [{
        label: 'Number of Requirements',
        data: Object.values(priorities),
        backgroundColor: [COLORS.red, COLORS.teal, COLORS.blue],
        borderRadius: 8,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => `${context.parsed.x} requirements`
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { display: false }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });
}

// Create timeline Gantt-style chart
function createTimelineChart(events) {
  const ctx = document.getElementById('timeline-chart');

  // Convert events to chart data
  const milestones = events.filter(e => e.milestone);
  const labels = milestones.map(e => e.event);
  const dates = milestones.map(e => new Date(e.date).getTime());
  const colors = milestones.map(e => {
    if (e.status === 'completed') return COLORS.success;
    if (e.status === 'upcoming') return COLORS.warning;
    return COLORS.mediumGray;
  });

  // Calculate days from start
  const startDate = Math.min(...dates);
  const daysFromStart = dates.map(d => Math.floor((d - startDate) / (1000 * 60 * 60 * 24)));

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Days from RFP Issue',
        data: daysFromStart,
        backgroundColor: colors,
        borderRadius: 8,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => {
              const event = milestones[context.dataIndex];
              return [
                `Date: ${new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric'
                })}`,
                `Status: ${event.status}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Days from RFP Issue Date' },
          beginAtZero: true,
          grid: { color: 'rgba(0, 0, 0, 0.05)' }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });
}

// Create evaluation criteria charts
function createEvaluationCharts(evaluationCriteria) {
  // Weight distribution pie chart
  const weightCtx = document.getElementById('evaluation-weight-chart');
  new Chart(weightCtx, {
    type: 'pie',
    data: {
      labels: ['Technical (80%)', 'Financial (20%)'],
      datasets: [{
        data: [evaluationCriteria.technicalWeightage, evaluationCriteria.financialWeightage],
        backgroundColor: [COLORS.teal, COLORS.purple],
        borderWidth: 0,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true,
            font: { size: 13 }
          }
        },
        title: {
          display: true,
          text: 'Overall Weightage',
          font: { size: 14, weight: '600' }
        }
      }
    }
  });

  // Technical criteria breakdown
  const technicalCtx = document.getElementById('technical-criteria-chart');
  new Chart(technicalCtx, {
    type: 'bar',
    data: {
      labels: evaluationCriteria.technicalCriteria.map(c => c.criterion),
      datasets: [{
        label: 'Points',
        data: evaluationCriteria.technicalCriteria.map(c => c.points),
        backgroundColor: COLORS.teal,
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Technical Criteria Points',
          font: { size: 14, weight: '600' }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45,
            font: { size: 11 }
          }
        },
        y: {
          beginAtZero: true,
          max: 50,
          ticks: { stepSize: 10 },
          grid: { color: 'rgba(0, 0, 0, 0.05)' }
        }
      }
    }
  });
}

// Populate insights section
function populateInsights(insights) {
  const container = document.getElementById('insights-container');

  // Sort by impact (High first) and surprise
  const sorted = insights.sort((a, b) => {
    if (a.impact !== b.impact) {
      return a.impact === 'High' ? -1 : 1;
    }
    return b.surprise - a.surprise;
  });

  // Show top 6 insights
  sorted.slice(0, 6).forEach((insight, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 fade-in';

    col.innerHTML = `
      <div class="insight-card">
        <div class="insight-card-header">
          <div class="insight-icon">${index + 1}</div>
          <div style="flex: 1;">
            <div class="insight-category">${insight.category}</div>
            <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <span class="insight-impact impact-${insight.impact.toLowerCase()}">${insight.impact} Impact</span>
              ${insight.surprise ? '<span class="surprise-badge">💡 Surprising</span>' : ''}
            </div>
          </div>
        </div>
        <p style="font-weight: 600; color: ${COLORS.dark}; margin: 1rem 0 0.5rem;">${insight.insight}</p>
        <p style="color: ${COLORS.mediumGray}; font-size: 0.9375rem; margin: 0;">${insight.description}</p>
      </div>
    `;

    container.appendChild(col);
  });
}

// Populate timeline section
function populateTimeline(events) {
  const container = document.getElementById('timeline-container');

  events.forEach(event => {
    const item = document.createElement('div');
    item.className = 'timeline-item fade-in';

    const markerClass = event.milestone ? 'timeline-marker milestone' : 'timeline-marker';
    const statusClass = `status-${event.status}`;

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    item.innerHTML = `
      <div class="timeline-content">
        <div class="timeline-date">${formattedDate}</div>
        <div class="timeline-event">${event.event}</div>
        <span class="timeline-status ${statusClass}">${event.status}</span>
      </div>
      <div class="${markerClass}"></div>
    `;

    container.appendChild(item);
  });
}

// Populate deliverables section
function populateDeliverables(deliverables) {
  const container = document.getElementById('deliverables-container');

  deliverables.forEach((deliverable, index) => {
    const item = document.createElement('li');
    item.className = 'deliverable-item fade-in';

    const paymentBadge = deliverable.paymentTrigger
      ? `<span class="payment-badge">💰 ${deliverable.paymentPercentage}% Payment</span>`
      : '';

    item.innerHTML = `
      <div class="deliverable-icon">${index + 1}</div>
      <div class="deliverable-content">
        <div class="deliverable-name">${deliverable.name}</div>
        <div class="deliverable-description">${deliverable.description}</div>
      </div>
      ${paymentBadge}
    `;

    container.appendChild(item);
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });
}

// Initialize smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
  }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
