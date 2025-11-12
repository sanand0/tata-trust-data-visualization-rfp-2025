# Proposal Review Checklist

This document identifies sections of the proposal that require careful review before submission to ensure accuracy, completeness, compliance, and competitive strength.

---

## Review Priority Legend

- **HIGH**: Critical for eligibility/compliance; errors could lead to disqualification
- **MEDIUM**: Important for scoring; errors could reduce technical/financial scores
- **LOW**: Desirable for professionalism; errors may create minor confusion

---

## 1. Company Information (HIGH)

### What to Review
- **Section**: Throughout proposal, especially Covering Letter (Appendix C), Compliance sections
- **Specific Items**:
  - [ ] Replace all `[Bidder Name]` placeholders with actual company name
  - [ ] Replace `[Company Name]` placeholders
  - [ ] Insert company registration number in Section 13.1
  - [ ] Insert GST registration number
  - [ ] Insert authorized signatory name, designation, contact details (end of proposal)
  - [ ] Insert company address for correspondence
  - [ ] Annual turnover figure (Section 9, Experience → Organization Profile)
  - [ ] Number of full-time staff in data visualization practice

### Why It Matters
**RFP Compliance**: Section 3.7.1 requires registered entity in India with proof. Missing or incorrect company details will lead to immediate disqualification.

### Importance: **HIGH**

---

## 2. Work Orders and References (HIGH)

### What to Review
- **Section**: Section 9.3 (Experience), Appendix C (Work Orders)
- **Specific Items**:
  - [ ] Replace `[Confidential client]` placeholders with actual client names (check if confidentiality allows public disclosure; if not, prepare separate annexure)
  - [ ] Attach 3+ work orders from 2023, 2024, 2025 as PDF appendices
  - [ ] Ensure work orders demonstrate "similar scope" (GIS dashboards, data visualization, social sector preferred)
  - [ ] Prepare 2+ contactable references (name, designation, email, phone) for separate submission
  - [ ] Verify references are willing to be contacted and will provide positive feedback
  - [ ] Match work order dates to eligibility criteria (must be from calendar years 2023-2025)

### Why It Matters
**RFP Eligibility**: Section 3.7.2 requires 3+ similar projects in 2023-2025 with work orders. Lack of work orders or non-similar projects = disqualification. References influence Experience score (15 points).

### Importance: **HIGH**

---

## 3. Team Profiles and CVs (HIGH)

### What to Review
- **Section**: Section 5.1 (Team Structure), Appendix D (Team Profiles)
- **Specific Items**:
  - [ ] Verify Team Lead has 15+ years experience (requirement: >15 years) in relevant field (GIS/data platforms/planning/design)
  - [ ] Verify Designer/Developer has 5+ years experience (requirement: >5 years) in platform design
  - [ ] Verify 2× Developers have 3+ years experience (requirement: >3 years) in platform development
  - [ ] Prepare CVs highlighting:
    - Years of experience (clear start dates)
    - Relevant projects (GIS, dashboards, social sector preferred)
    - Certifications (AWS, Mapbox, D3.js, PostgreSQL, etc.)
    - Current employment status (on company rolls)
  - [ ] Ensure CVs match the roles described in Section 5.1
  - [ ] Get written commitment from team members for 8-week availability

### Why It Matters
**RFP Eligibility**: Section 3.7.3 requires specific team composition with minimum experience levels. Missing or under-qualified team members = disqualification. Team quality influences Capability score (25 points).

### Importance: **HIGH**

---

## 4. Legal Declarations and Certificates (HIGH)

### What to Review
- **Section**: Section 13.1, 13.2, Appendix E-F
- **Specific Items**:
  - [ ] **Appendix E**: Attach company registration certificate (incorporation/partnership deed)
  - [ ] **Appendix E**: Attach GST registration certificate
  - [ ] **Appendix F**: No-litigation declaration (affidavit):
    - Not insolvent, bankrupt, or in receivership
    - No criminal convictions (professional conduct) in last 3 years
    - List of litigations in last 7 years (if any)
    - Not blacklisted by govt/PSU/private sector
    - No conflict of interest with other bidders
    - No conflict of interest with Tata Trusts
  - [ ] **Professional Indemnity Insurance**: Confirm coverage (10% of contract value) or plan to obtain upon award
  - [ ] **Code of Conduct**: Verify compliance with Tata Code of Conduct (no bribes, child labor)
  - [ ] **Covering Letter**: Sign and date the covering letter (Appendix C format)

### Why It Matters
**RFP Eligibility**: Section 3.7.4 lists disqualification criteria. False declarations = immediate disqualification + legal consequences. These are pass/fail items.

### Importance: **HIGH**

---

## 5. Financial Proposal Alignment (MEDIUM)

### What to Review
- **Section**: Section 12 (Financial Proposal Alignment), Separate Financial Bid (Annexure F)
- **Specific Items**:
  - [ ] Ensure financial bid (submitted separately) uses exact format from RFP Annexure F:
    - Professional Fee
    - Setup & Maintenance Fee (for current FY)
    - Data Analysis & Overheads
    - Out-of-Pocket Expenses
    - GST %
    - Total Amount in Rupees
  - [ ] **Complete breakup**: Person-days, rate, unit for each team member (3.5 FTE × 8 weeks = 28 person-weeks)
  - [ ] **Rate card for future work**: Man-hour rates for each role (Team Lead, Developer, etc.)
  - [ ] Cross-check rates in Section 12 (Rate Card table) match the financial bid
  - [ ] Verify 50/50 payment milestones:
    - 50% on wireframes/design plan (Week 2)
    - 50% on final dashboard acceptance (Week 8)
  - [ ] Include cloud hosting costs (AWS: ~₹12-20K/month × 3 months = ₹36-60K)
  - [ ] Include Mapbox license if needed (free tier may suffice for Phase 1, but budget for Phase 2)
  - [ ] AMC pricing (₹3L/5L/8L per year) aligns with market rates

### Why It Matters
**RFP Scoring**: Financial bid is 20% of QCBS score. Format errors or unrealistic pricing reduces competitiveness. Inconsistencies between technical proposal and financial bid raise red flags.

### Importance: **MEDIUM**

---

## 6. Technical Assumptions and Validations (MEDIUM)

### What to Review
- **Section**: Section 11.1 (Assumptions), Section 2.3 (Technology Stack)
- **Specific Items**:
  - [ ] **Cloud Provider**: Proposal assumes AWS; confirm if Tata Trusts prefers Azure (for M365 integration). Update Section 2.3 if needed.
  - [ ] **Data Schema**: Section 3.3 lists assumed CSV columns (grant_id, theme, state, etc.). These are placeholders—confirm in Week 1 workshop.
  - [ ] **Browser Support**: Proposal excludes IE11. Confirm if Tata Trusts has legacy browser requirements.
  - [ ] **Concurrent Users**: Proposal targets 50 users. Confirm if Trusts expects higher load in Phase 1.
  - [ ] **Map Provider**: Proposal uses Mapbox (proprietary, paid). Confirm if Trusts prefers open-source (Leaflet) or Google Maps.
  - [ ] **Database**: Proposal uses PostgreSQL + PostGIS. Confirm if Trusts has existing Snowflake DMP and prefers Snowflake over PostgreSQL.
  - [ ] **Authentication**: Phase 1 uses HTTP Basic Auth. Confirm if Trusts requires OAuth/SAML from Day 1.

### Why It Matters
**Technical Alignment**: Misalignment with Trusts' tech stack or constraints could require re-architecture mid-project, causing delays and cost overruns. Clarify assumptions early to avoid surprises.

### Importance: **MEDIUM**

---

## 7. Timeline Feasibility (MEDIUM)

### What to Review
- **Section**: Section 4.2 (Phase 1 Timeline), Section 4.3 (Risk Management)
- **Specific Items**:
  - [ ] **8-week timeline**: Verify team availability (3.5 FTE for full 8 weeks)
  - [ ] **Week 1-2 (Foundation)**: Requires client workshop, data schema agreement. Confirm Trusts' availability.
  - [ ] **Week 3-4 (Core Development)**: 5 charts in 2 weeks. Verify AI agent is ready for acceleration.
  - [ ] **Week 5-6 (Expansion)**: 11 additional charts in 2 weeks. This is aggressive—mitigate by using AI agent + parallel development.
  - [ ] **Week 7 (Testing)**: UAT requires 3-5 stakeholders. Confirm Trusts can commit.
  - [ ] **Week 8 (Training)**: 5 hours of training + documentation. Verify trainer availability.
  - [ ] **Holidays/Weekends**: Check if any major holidays (Diwali, year-end) fall in the 8-week period post-award. Adjust timeline if needed.

### Why It Matters
**RFP Compliance**: Section 3.3 requires strict adherence to timeline; delays trigger 5% penalty per week (max 20%). Over-promising leads to penalties or contract termination.

### Importance: **MEDIUM**

---

## 8. Demonstration Materials (MEDIUM)

### What to Review
- **Section**: Section 9.1 (Sample Visualizations), dataviz/ folder
- **Specific Items**:
  - [ ] **Demo Quality**: Ensure dataviz/index.html and dataviz/dashboard.html load without errors
  - [ ] **Data Realism**: Verify generated data in data/*.csv aligns with Tata Trusts' domain (themes, states, districts)
  - [ ] **Brand Compliance**: Review style-guide.md and confirm colors/fonts match Tata Trusts' public website (https://www.tatatrusts.org/)
  - [ ] **Accessibility**: Test with screen reader (NVDA/JAWS) and keyboard navigation to confirm WCAG AA claims
  - [ ] **Mobile Responsiveness**: Test on iPhone, Android, iPad to confirm claims in Section 7.2
  - [ ] **Performance**: Test on 50 Mbps connection to verify <2s page load claim (Section 7.1)
  - [ ] **AI Agent Demo**: Prepare live demo script showing chart generation from natural language prompt (e.g., "Show efficiency by district")

### Why It Matters
**Presentation Score**: Demo is 15 points (15% of technical score). Broken links, slow loading, or poor UX will reduce score. High-quality demo differentiates from competitors.

### Importance: **MEDIUM**

---

## 9. Annexure G: Functional Requirement Sheet (MEDIUM)

### What to Review
- **Section**: RFP Annexure G (Excel file), Proposal Checklist (response/checklist.md)
- **Specific Items**:
  - [ ] **Excel File**: RFP mentions "Functional Requirement Sheet - To be filled by Vendor.xlsx"—confirm if this must be submitted
  - [ ] **Completion**: If required, fill out all columns in the Excel:
    - Compliance (Yes/No)
    - Platform Capability (describe how requirement is met)
    - Remarks (any caveats, e.g., "Phase 2")
    - Module in Platform (e.g., "Dashboard filters", "AI agent")
    - Proposal Response Section Reference (e.g., "Section 3.1")
  - [ ] **Consistency**: Ensure Excel responses match checklist.md and main proposal
  - [ ] **Submission Format**: Confirm if Excel must be submitted or if checklist.md PDF suffices

### Why It Matters
**RFP Compliance**: Section 3.11.2 (Technical Bid requirements) includes "Functionalities covered as per Scope". Missing or incomplete functional requirement sheet may be considered incomplete bid.

### Importance: **MEDIUM**

---

## 10. Covering Letter and Proposal Structure (MEDIUM)

### What to Review
- **Section**: Appendix C (Covering Letter), Overall proposal formatting
- **Specific Items**:
  - [ ] **Covering Letter**: Use exact format from RFP Appendix C, including all 11 clauses
  - [ ] **Signatory Authorization**: Attach board resolution or authorization letter proving signatory has authority to bind company
  - [ ] **Page Limit**: RFP Section Annexure E specifies "max 12 pages / 5000 words" for technical proposal. Current proposal is ~30 pages—confirm if this limit applies to full proposal or only methodology section. If strict, create executive summary version.
  - [ ] **Submission Format**: Two separate PDFs:
    1. **Technical Bid**: Covering letter + Eligibility + Technical Proposal (Sections 1-11, Appendices A-G)
    2. **Financial Bid**: Financial breakdown (Annexure F format)
  - [ ] **Email Submission**: Send to procurement.cci@tatatrusts.org, ankitthakur@tatatrusts.org with subject line "RFP Submission: Data Visualisation Dashboard - [Company Name]"
  - [ ] **Hard Copy**: Confirm if hard copy required (RFP Section 3.17.2 mentions Mumbai address); send via courier if yes

### Why It Matters
**RFP Compliance**: Section 3.11.4 states "Incomplete Bids will be summarily rejected". Incorrect format, missing documents, or wrong submission method = disqualification.

### Importance: **MEDIUM**

---

## 11. Intellectual Property and Confidentiality (LOW)

### What to Review
- **Section**: Section 13.2 (Acceptance of Terms), RFP Annexure H (General T&C)
- **Specific Items**:
  - [ ] **IP Rights**: Confirm agreement that all work product vests with Tata Trusts (RFP Section 8, Annexure H)
  - [ ] **Prior Work Product**: Proposal grants Trusts a "royalty-free, non-exclusive license" to any pre-existing tools (e.g., AI agent prompts, core.js utilities). Confirm if company policy allows this.
  - [ ] **Confidentiality**: Confirm perpetual confidentiality (even after contract ends). Ensure team members sign NDAs.
  - [ ] **Open-Source Licenses**: If using open-source libraries (Observable Plot, D3.js, Leaflet), confirm licenses are compatible with Trusts' IP ownership (most are MIT/BSD—permissive).

### Why It Matters
**Legal Risk**: IP disputes after project completion can be costly. Clarify upfront to avoid future conflicts. Non-issue if standard T&C accepted.

### Importance: **LOW**

---

## 12. Terminology and Language Consistency (LOW)

### What to Review
- **Section**: Throughout proposal
- **Specific Items**:
  - [ ] **Tata Trusts vs Tata Trust**: RFP uses "Tata Trusts" (plural) and "Sir Ratan Tata Trust" (singular). Proposal should use "Tata Trusts" consistently.
  - [ ] **Phase 1 vs Pilot**: RFP sometimes calls it "pilot". Proposal uses "Phase 1"—ensure consistency or use both (e.g., "Phase 1 pilot").
  - [ ] **Dashboard vs Portal**: RFP uses "dashboard". Proposal should avoid "portal" unless referring to separate admin interface.
  - [ ] **GIS vs Geospatial**: Use both terms interchangeably but prefer "GIS" (as in RFP title).
  - [ ] **AI Agent vs Chatbot**: Proposal uses "AI agent". Avoid "chatbot" (implies chat UI, which is Phase 3).
  - [ ] **Observable Plot vs D3.js**: Be clear when referring to each library (Observable Plot is higher-level, built on D3).

### Why It Matters
**Professionalism**: Inconsistent terminology suggests lack of attention to detail. Minor issue but easy to fix. Evaluators may notice and dock points for clarity.

### Importance: **LOW**

---

## 13. References to External Resources (LOW)

### What to Review
- **Section**: Throughout proposal, especially dataviz/ folder references
- **Specific Items**:
  - [ ] **File Paths**: Proposal references `dataviz/coverage-map.js`, `process.md`, etc. Confirm these files are included in submission package.
  - [ ] **GitHub Links**: If submitting via email, provide GitHub repository link or zip file with all code.
  - [ ] **Live Demo URL**: Consider deploying dataviz/ to a public URL (e.g., GitHub Pages, Netlify) for evaluators to test. Include URL in covering letter.
  - [ ] **Screenshots**: If submission is print-only, include screenshots of dashboard and charts as appendices.
  - [ ] **Video Demo**: Optional but impressive—record 3-5 minute screen capture of dashboard navigation and AI agent demo. Upload to YouTube (unlisted) and include link.

### Why It Matters
**Evaluation Convenience**: Making it easy for evaluators to see the demo increases likelihood of high Presentation score (15 points). Low effort, high impact.

### Importance: **LOW**

---

## 14. Proofreading and Formatting (LOW)

### What to Review
- **Section**: Entire proposal
- **Specific Items**:
  - [ ] **Spelling and Grammar**: Run spell-check, proofread for typos (e.g., "metioned" → "mentioned" in RFP, don't replicate errors).
  - [ ] **Formatting Consistency**: Headings (H1/H2/H3), bullet styles, table borders, font sizes
  - [ ] **Table of Contents**: Generate ToC with page numbers for easy navigation
  - [ ] **Page Numbers**: Add footer with "Page X of Y" and company name
  - [ ] **Hyperlinks**: If PDF, ensure internal links work (e.g., "See Section 3.1" should be clickable)
  - [ ] **Color Printing**: If submitting hard copy, confirm tables and charts are legible in color. Test black-and-white print.
  - [ ] **PDF Metadata**: Set PDF title, author, subject (e.g., Title: "Tata Trusts Data Visualization RFP - [Company Name]")

### Why It Matters
**Professionalism**: A polished proposal reflects attention to quality. Evaluators may unconsciously favor well-formatted bids. Minor issue but cumulative effect.

### Importance: **LOW**

---

## 15. Final Pre-Submission Checklist (HIGH)

### Before Hitting "Send"
- [ ] **Two Separate PDFs**: Technical Bid + Financial Bid
- [ ] **All Placeholders Replaced**: No `[Bidder Name]`, `[Company Name]`, `[XXXXX]` remaining
- [ ] **All Appendices Attached**:
  - A: Functional Requirement Sheet (checklist.md or Excel)
  - B: Review Recommendations (this document—optional for submission)
  - C: 3+ Work Orders (PDF scans)
  - D: Team CVs (PDF, 1-2 pages each)
  - E: Registration Certificates (Company + GST)
  - F: Legal Declarations (Affidavit)
  - G: Reference Letters (optional, 2+ letters)
- [ ] **Covering Letter Signed**: Wet signature or digital signature on company letterhead
- [ ] **Email Submission**:
  - To: procurement.cci@tatatrusts.org, ankitthakur@tatatrusts.org
  - Cc: All team members for record
  - Subject: "RFP Submission: Data Visualisation Dashboard - [Company Name] - [Date]"
  - Body: Brief cover email (3-4 sentences) + attachments
  - Attachments: Technical_Bid_[Company].pdf, Financial_Bid_[Company].pdf, Annexures.zip
- [ ] **Hard Copy** (if required): Courier to Mr. Ankit Thakur, Tata Trusts, WTC Mumbai
- [ ] **Submission Confirmation**: Request read receipt or confirmation email
- [ ] **Deadline**: Submit by **17 November 2025** (check exact time if specified)

---

## Summary: Review Priorities

| Priority | Items | Disqualification Risk | Score Impact |
|----------|-------|----------------------|--------------|
| **HIGH** | 4 items | Yes | Eligibility (pass/fail) |
| **MEDIUM** | 6 items | No | 50-75 points (out of 100 technical) |
| **LOW** | 5 items | No | 5-10 points (professionalism, clarity) |

### Recommended Review Sequence

1. **HIGH items first** (Items 1-4): Ensure eligibility, prevent disqualification (~2 hours)
2. **MEDIUM items next** (Items 5-10): Maximize technical score (~4 hours)
3. **LOW items last** (Items 11-14): Polish for professionalism (~1 hour)
4. **Final check** (Item 15): Pre-submission validation (~30 min)

**Total estimated review time**: 7-8 hours for thorough review by 2 people (proposer + internal reviewer).

---

## Review Sign-Off

| Reviewer | Role | Date | Status |
|----------|------|------|--------|
| [Name] | Proposal Writer | [Date] | ☐ Draft Complete |
| [Name] | Technical Reviewer | [Date] | ☐ Technical Accuracy Verified |
| [Name] | Legal/Compliance Reviewer | [Date] | ☐ Declarations Verified |
| [Name] | Finance Reviewer | [Date] | ☐ Financial Bid Consistent |
| [Name] | Authorized Signatory | [Date] | ☐ Approved for Submission |

---

**Document Version**: 1.0
**Date**: November 2025
**Purpose**: Internal review checklist (not for submission to Tata Trusts)
