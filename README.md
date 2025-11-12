# Tata Trusts Data Visualization RFP Response (2025)

> A comprehensive demonstration of human-AI collaboration in responding to an enterprise RFP

**Live Demo:** [View on GitHub Pages](https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/)

## 📋 Overview

This repository documents a 7-day journey of responding to Tata Trusts' Request for Proposal (RFP) for a "Design & Development of Geographical Data Visualisation Dashboard" using AI agents as collaborative tools. What would traditionally require a 5-person team working 120+ hours was completed by one person in ~27 hours by leveraging AI agents (ChatGPT, Claude, Claude Code, and Gemini).

**Key Achievement:** 78% time savings while delivering comprehensive, professional-quality outputs including proposal, visualizations, documentation, and this tutorial.

## 🎯 Project Goals

This project serves three distinct audiences:

1. **Pre-sales Teams:** Learn how to leverage AI agents to respond to complex RFPs 5-10x faster
2. **Developers:** Discover how to use AI as a force multiplier when building data visualization dashboards
3. **Everyone:** Understand AI capabilities, limitations, and effective human-AI collaboration patterns

## 📊 What's Included

### Core Deliverables

- **[RFP Story](https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/rfp-story/)** - Narrative overview of the RFP opportunity and pre-bid meeting
- **[Proposal Response](https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/response/)** - Complete RFP response with technical proposal, team structure, and pricing
- **[Data Story](https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/dataviz/)** - NYT-style scrollytelling narrative with 16 embedded visualizations
- **[Interactive Dashboard](https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/dataviz/dashboard.html)** - Filterable, responsive dashboard showcasing all visualizations
- **[Process Tutorial](https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/process/)** - Comprehensive guide explaining the entire human-AI collaboration journey

### Documentation

- **[process.md](process.md)** - Detailed log of every step, prompt, and iteration (the raw version of the Process Tutorial)
- **[rfp.md](rfp.md)** - Original 47-page RFP converted to Markdown
- **[pre-bid.md](pre-bid.md)** - Transcription and FAQ from pre-bid meeting
- **[style-guide.md](style-guide.md)** - Tata Trusts brand guidelines extracted from their website
- **[analyses.md](analyses.md)** - 25 proposed data analyses ranked by impact
- **[data/README.md](data/README.md)** - Documentation for 4 generated datasets (3,500+ rows)

### Technical Assets

- **[dataviz/newchart.md](dataviz/newchart.md)** - Template for creating new visualizations using AI agents
- **[response/checklist.md](response/checklist.md)** - RFP requirements compliance checklist
- **[response/review.md](response/review.md)** - Review guide for proposal accuracy and completeness

## 🚀 Quick Start

### View Live Site

Visit the [GitHub Pages site](https://sanand0.github.io/tata-trust-data-visualization-rfp-2025/) to explore all deliverables.

### Build Locally

```bash
# Clone repository
git clone https://github.com/sanand0/tata-trust-data-visualization-rfp-2025.git
cd tata-trust-data-visualization-rfp-2025

# Install dependencies and build proposal HTML
npm install
npm run build

# Serve locally (optional)
npx http-server -p 8000
```

Open `index.html` in your browser to view the landing page.

## 📅 Timeline

**7 Days, 9 Major Milestones:**

- **Nov 5, 2025:** RFP received, formal acknowledgement, 129 clarifying questions generated
- **Nov 11, 2025:** Pre-bid meeting preparation and attendance
- **Nov 11, 2025:** RFP PDF → Markdown conversion, 4 realistic datasets generated
- **Nov 11, 2025:** Brand style guide creation, RFP narrative story
- **Nov 11, 2025:** 16 data visualizations, data story, and dashboard
- **Nov 12, 2025:** Analysis planning, process documentation
- **Nov 12, 2025:** Comprehensive proposal response creation
- **Nov 12, 2025:** Process tutorial and landing page
- **Nov 17, 2025:** RFP submission deadline

## 🤖 AI Tools Used

1. **ChatGPT (GPT-4o)** - Question generation, data creation, analysis planning
2. **Claude (Sonnet 3.5)** - Document conversion, pre-bid preparation, strategic insights
3. **Claude Code** - Full-stack development, visualizations, proposal creation
4. **Gemini 2.5 Pro** - Call transcription and summarization

## 📈 Key Results

| Metric | Achievement |
|--------|-------------|
| **Time Saved** | 78% (27 hours vs. 120+ hours traditional) |
| **Cost Reduction** | 90% (1-person vs. 5-person team) |
| **Deliverables** | 100% of requirements met on time |
| **Pages Created** | 6 interactive web pages |
| **Visualizations** | 16 interactive charts |
| **Documentation** | 2,000+ lines of process documentation |

## 🎓 Key Lessons

### What AI Excels At

- **Pattern Application:** Consistent implementation across contexts
- **Comprehensive Generation:** Exhaustive lists, variations, alternatives
- **Synthesis:** Combining multi-source information coherently
- **Transformation:** Format conversion (PDF → Markdown, data → visualizations)
- **Iteration Speed:** Instant changes with zero cost to experimentation

### Where AI Struggles

- **Judgment:** Cannot assess "good enough" or "appropriate"
- **Context:** Misses implicit requirements and organizational nuances
- **Verification:** Claims certainty even when wrong
- **Creativity:** Generates within patterns, rarely breaks conventions
- **Taste:** Cannot distinguish "technically correct" from "actually good"

### The Human Role

- **Direction:** Defining what should be built
- **Evaluation:** Assessing quality and appropriateness
- **Debugging:** Diagnosing root causes when AI hits limits
- **Quality Bar:** Determining when work is complete
- **Strategy:** Making decisions that require organizational context

## 🏗️ Repository Structure

```
tata-trust-data-visualization-rfp-2025/
├── index.html              # Landing page
├── style.css               # Shared styles across all pages
├── rfp-story/              # RFP narrative overview
│   ├── index.html
│   └── script.js
├── dataviz/                # Data visualizations
│   ├── index.html          # Data story (scrollytelling)
│   ├── dashboard.html      # Interactive dashboard
│   ├── style.css
│   ├── core.js             # Shared utilities
│   ├── newchart.md         # Chart creation template
│   └── *.js                # Individual chart modules
├── response/               # RFP proposal response
│   ├── README.md           # Main proposal
│   ├── checklist.md        # Compliance checklist
│   └── review.md           # Review guide
├── process/                # Process tutorial
│   ├── index.html
│   └── script.js
├── data/                   # Generated datasets
│   ├── README.md
│   ├── grants_portfolio.csv
│   ├── beneficiary_tracking.csv
│   ├── impact_outcomes.csv
│   ├── geographic_footprint.csv
│   └── *.py                # Dataset generation scripts
├── rfp.md                  # Original RFP (Markdown)
├── pre-bid.md              # Pre-bid meeting notes
├── style-guide.md          # Brand guidelines
├── analyses.md             # Proposed analyses
├── process.md              # Detailed process log
└── package.json            # Build scripts
```

## 🔧 Technical Stack

### Visualization & Frontend

- **Observable Plot** - Statistical visualizations
- **D3.js** - Custom interactive charts
- **Bootstrap 5.3** - UI framework
- **Lit-html** - Efficient DOM updates
- **Marked** - Markdown rendering

### Build & Deployment

- **Eleventy** - Static site generation for proposal
- **GitHub Actions** - CI/CD for GitHub Pages
- **npm** - Package management and build scripts

### Data Generation

- **Python 3.12+** - Dataset generation
- **Faker** - Realistic fake data
- **NumPy/Pandas** - Data manipulation
- **UV** - Python script runner

## 📝 License

[MIT License](LICENSE)

## 🙏 Acknowledgments

- **Tata Trusts** for the RFP opportunity that inspired this project
- **Anthropic** for Claude and Claude Code
- **OpenAI** for ChatGPT
- **Google** for Gemini
- **Observable** for Plot library

## 📧 Contact

Created by [S Anand](https://github.com/sanand0) as a demonstration of AI-augmented professional work.

For questions or collaboration opportunities, please open an issue on GitHub.

---

**Note:** This is a demonstration project showing AI capabilities in professional contexts. It is not an official submission or endorsed by Tata Trusts. All data used is synthetically generated for demonstration purposes.
