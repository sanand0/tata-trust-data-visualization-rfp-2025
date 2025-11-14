# Proposal Gaps & Helpful Additions

## Tooling / Library Wish List

- A **document indexer/search engine** (e.g., `rga`, `ripgrep-all`, OCR-backed search) so we can query inside PDFs/PPTX files instead of manually converting 300+ decks.
- **Batch PPTX/PDF-to-text utilities** (Python scripts using `python-pptx`, `textract`, etc.) to auto-export resume and case-study summaries for quick reference.
- A **central metadata catalog** (CSV/JSON) that maps each file to sections of the RFP checklist, making it obvious where authoritative inputs live.
- A **PDF preview / rendering helper** (`pdftoppm`, `imgcat`, or a built-in viewer hook) to inspect layout changes instantly instead of exporting PNGs via `magick` on every iteration.
- A **ReportLab component library or house CV template** so headers, spacing, and typography are standardized without hand-tuning coordinates for each iteration.

## Additional Context Worth Requesting

- A consolidated **company compliance pack** (registration proof, GST certificate, insurance) maintained by Finance/Legal.
- An **executive/contact directory** covering authorized signatories, sales leads, and reference owners (emails + phone numbers + approval status).
- A **living tracker** that maps every Tata Trusts requirement to an owner, due date, and source document so we can see progress without re-reading the 600-line checklist.

## Outstanding Information (Single Source List)

### Company Credentials & Compliance

- GST registration certificate (RFP Annexure F footnote / clause 636) to support invoicing.
- Data-visualization practice headcount split (RFP Evaluation table calls for \"Number of full/part-time staff in relevant practice area\").

### Authorized Signatory

- Official email address and phone number for the authorized signatory so the Covering Letter (Appendix C) can include contact details.

### Work Orders & References

- 3+ signed work orders (2023, 2024, 2025) that match the Tata Trusts scope (GIS/data viz) with contract values and award dates.
- Two reference contacts with name, designation, organization, email, and phone plus confirmation that they can be contacted.

### Team Roster Documentation

- Evidence of role-specific certifications (where claimed) and signed statements of availability for the 8-week Phase 1 window (RFP Section 3.7.3 expects the named team to execute the assignment).
- Portfolio/GitHub links for the frontend role and sample training/alt-text artefacts for the trainer to substantiate Annexure D.

### Legal & Declarations

- Statement on litigations over the last seven years (RFP clause 3.5 / Table 6) or declaration of no litigations.
- Confirmation of Tata Code of Conduct compliance (Section 5) to include in the Covering Letter/technical narrative.
- Professional indemnity and CGL insurance summaries mapped to Annexure F so the Client can see coverage levels.

### Financial Bid Inputs

- Annexure F pricing table: professional fee, setup/maintenance, data analysis, OPE, GST %, totals in words/figures.
- Detailed 8-week rate breakup per role (architect, frontend, data engineer, GIS, trainer).
- Phase-2 rate card (hourly rates for key roles incl. AI/ML, QA).
- Infrastructure cost estimate (Azure compute/storage, Mapbox, SSL/domain).
- AMC pricing options (A/B/C tiers) after initial 3-month warranty.

### Demo & Collateral

- Live demo URL (Netlify/Vercel/GitHub Pages) with regression-tested charts.
- Demo walkthrough video (3–5 minutes) and/or backup screenshots pack.
- Brand compliance evidence (logo, typography, palette) for the proposal PDF and demo walkthrough.

### Covering Letter & Annexures

- Covering letter in Appendix C format (letterhead, 11 mandatory clauses, annex list, signature block).
- Annexure index mapping (A: Functional Requirement Sheet, B: Recommendations/internal, C: Work Orders, D: CVs, E: Registration/GST, F: Legal Affidavit, G: References).

### Functional Requirement Sheet

- Vendor-completed Excel mirroring Tata Trusts’ checklist (requirements, priority, compliance, platform capability, module, section reference, remarks) plus export-ready PDF.

### Submission Preparation

- Final Technical and Financial PDFs (with bookmarks, page numbers, and cleaned placeholders).
- Placeholder audit: ensure `[Bidder Name]`, `[Company Name]`, `[XXXXX]`, `[Confidential client]` all replaced.
- Proofreading sign-off (spell check, grammar, TOC cross-check).
- Email submission template (subject line, recipients, attachments) + hard-copy/courier plan if required by the RFP.
- Read-receipt/follow-up call plan documented.

### Client Clarifications & Post-Submission

- Responses/decisions for the 10 open questions (data schema, volume, user roles, GIS granularity, external data priority, AI scope, timeline flexibility, infra preferences, Mapbox licensing, submission word limits).
- Demo script (30–45 min), backup plan (video/screenshots/offline), and team availability confirmation for the shortlisted presentation round.
- Reference pre-brief notes (inform references, provide Tata Trusts contact info once shortlisted).
