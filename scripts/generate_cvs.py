import os
from pathlib import Path
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
    ListFlowable,
    ListItem,
    PageBreak,
)
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.colors import HexColor

BASE_DIR = Path(__file__).resolve().parents[1]
OUTPUT_DIR = BASE_DIR / "proposal" / "compiled" / "cv"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

styles = getSampleStyleSheet()
BODY = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.5,
    leading=13,
    textColor=colors.HexColor("#1f2933"),
)
SECTION = ParagraphStyle(
    "Section",
    parent=styles["Heading4"],
    fontName="Helvetica-Bold",
    fontSize=11,
    leading=14,
    spaceBefore=6,
    spaceAfter=4,
    textColor=colors.HexColor("#0f4c81"),
    uppercase=True,
)

CV_DATA = [
    {
        "filename": "deepak-rathee-cv.pdf",
        "name": "Deepak Rathee",
        "title": "Client Partner – AI & Analytics",
        "location": "Toronto, Canada (Remote)",
        "contact": "Email & phone available on request",
        "summary": "AI/GenAI program leader with 16+ years of experience translating CxO-level objectives into actionable data and analytics roadmaps across energy, industrials, and retail enterprises.",
        "core_competencies": [
            "AI/GenAI portfolio leadership",
            "Strategic and financial roadmapping",
            "Executive stakeholder alignment",
            "Data storytelling & communications",
            "Power BI & Microsoft analytics ecosystem",
            "Program governance & PMO dashboards",
        ],
        "toolkit": [
            "Azure OpenAI, Copilot Studio, GenAI workflow design",
            "Predictive analytics, NLP search & persona engines",
            "Azure & M365 data platforms",
            "Dependency tracking and risk dashboards",
            "Value engineering & business case modelling",
        ],
        "experience_primary": [
            {
                "role": "Client Partner, AI & Analytics",
                "org": "Straive (Gramener)",
                "duration": "2021 – Present",
                "bullets": [
                    "Leading multiple GenAI initiatives covering marketing hypothesis generators, synthetic persona engines, and investor-relations copilots.",
                    "Designed AI-driven pipeline optimization for an energy infrastructure customer, reducing batch costs and cycle times.",
                    "Delivered legal AI assistants for EPC/vendor contracts, automating clause extraction, compliance flags, and risk scoring.",
                    "Built reconciliation dashboards aligning commodity flows, billing data, and CFO audit packs.",
                ],
            },
            {
                "role": "Director, Corporate Strategy",
                "org": "TC Energy",
                "duration": "2017 – 2021",
                "bullets": [
                    "Directed $15B spinoff and annual $6B capital allocation process for a $70B market-cap utility.",
                    "Built enterprise roadmaps connecting regulation, operations, and finance for energy transition initiatives.",
                ],
            },
        ],
        "experience_additional": [
            {
                "role": "Strategy Manager",
                "org": "Alberta Energy Regulator",
                "duration": "2015 – 2017",
                "bullets": [
                    "Designed award-winning oil curtailment and water-optimization policies using scenario analytics.",
                ],
            },
            {
                "role": "Project Leader / Consultant",
                "org": "Boston Consulting Group",
                "duration": "2012 – 2015",
                "bullets": [
                    "Delivered $40M+ savings programs across energy, aerospace, and retail.",
                ],
            },
            {
                "role": "Senior Field Engineer",
                "org": "Schlumberger",
                "duration": "2007 – 2010",
                "bullets": [
                    "Managed $15M+ drilling projects; twice awarded ‘Excellence in Execution’.",
                ],
            },
        ],
        "projects": [
            "GenAI for Marketing Strategy – hypothesis generator & persona models for a global enterprise.",
            "AI-enabled pipeline flow optimization for an energy infrastructure major.",
            "Legal AI assistant automating clause review and compliance scoring.",
            "Investor-relations AI summarizing earnings calls and benchmarking peers.",
        ],
        "education": [
            "MBA, Strategy & Finance – INSEAD",
            "B.Tech & M.Tech, Industrial Engineering – IIT Kharagpur",
        ],
        "recognition": [
            "Twice awarded ‘Excellence in Execution’ – Schlumberger",
        ],
    },
    {
        "filename": "joe-praveen-kumar-cv.pdf",
        "name": "Joe Praveen Kumar R",
        "title": "Senior Full-Stack Engineer",
        "location": "Chennai, India",
        "contact": "+91 95661 84868 | joepraveenkumar@gmail.com | linkedin.com/in/joepraveenkumar",
        "summary": "Full-stack PHP/JavaScript engineer with 14+ years of experience leading agile squads, modernizing enterprise applications, and operationalizing secure API-driven platforms.",
        "core_competencies": [
            "Full-stack architecture (PHP 7/8, Laravel, CodeIgniter)",
            "REST/SOAP API design & integration",
            "Responsive UI engineering (JavaScript, HTML5, CSS3)",
            "CI/CD automation (Jenkins, Git, Docker)",
            "Performance tuning with Redis/Memcached",
            "Agile coaching & team leadership",
        ],
        "toolkit": [
            "AWS & Google Cloud deployments",
            "MySQL, MongoDB data modelling",
            "Unit testing with PHPUnit & automation",
            "Secure authentication / MFA implementations",
            "Drupal & CMS modernization",
        ],
        "experience_primary": [
            {
                "role": "Senior PHP Full-Stack Developer",
                "org": "Straive Technology",
                "duration": "2019 – Present",
                "bullets": [
                    "Architected high-scale PHP applications serving 100K+ monthly users with CI/CD automation.",
                    "Led a four-member agile squad delivering multi-release roadmaps with 30% faster deployments.",
                    "Produced REST APIs for mobile/web clients, factoring in caching, observability, and security.",
                    "Optimized OCR/LabelStudio pipelines for LN eCrash by managing Dockerized infrastructure.",
                ],
            },
            {
                "role": "Team Lead / Senior PHP Engineer",
                "org": "Uplogic & UFOURS IT Solutions",
                "duration": "2016 – 2019",
                "bullets": [
                    "Migrated legacy PHP5 estates to PHP7, boosting response times by 25%.",
                    "Delivered custom CMS/e-commerce stacks and responsive UI enhancements.",
                ],
            },
        ],
        "experience_additional": [
            {
                "role": "Senior PHP Developer",
                "org": "Firesky Media & Technologies",
                "duration": "2009 – 2013",
                "bullets": ["Built API-integrated platforms with strong backend logic and quality gates."],
            },
            {
                "role": "PHP Developer",
                "org": "Pixen Technologies",
                "duration": "2007 – 2008",
                "bullets": ["Delivered ERP-style modules and payment integrations for SMB clients."],
            },
        ],
        "projects": [
            "LN eCrash – automated reporting & OCR management on multi-server Docker estate.",
            "MSCI ESG automation – PDF OCR, SME QC automation, and orchestration pipelines.",
            "LN Tolly – multilingual Drupal rollout with RTL support and localization.",
        ],
        "education": [
            "B.Tech, Information Technology – Anna University (PTRCET)",
        ],
        "recognition": [
            "Trusted code reviewer & mentor for Straive’s digital engineering group.",
        ],
    },
    {
        "filename": "ramireddy-muniteja-cv.pdf",
        "name": "Ramireddy Muniteja",
        "title": "Senior Data Science Engineer",
        "location": "Hyderabad, India",
        "contact": "Email & phone available on request",
        "summary": "Backend-focused data science engineer with 5+ years of experience building FastAPI/Gramex services, automating analytics pipelines, and optimizing large-scale inventory and risk workflows.",
        "core_competencies": [
            "Python, FastAPI, Django, Gramex",
            "API design & documentation",
            "SQL/NoSQL data modelling",
            "Caching, load testing, and performance tuning",
            "Automation (cron, Azure Functions, CI/CD)",
            "LLM integration & AI summarization",
        ],
        "toolkit": [
            "Postgres, Oracle, MongoDB, Redis",
            "Pandas, NumPy, Locust, Azure Cost Management API",
            "Docker, GitLab, AWS/Azure",
            "JavaScript, HTML/CSS for dashboard customization",
        ],
        "experience_primary": [
            {
                "role": "Senior Data Science Engineer",
                "org": "Straive / Gramener",
                "duration": "2021 – Present",
                "bullets": [
                    "Built Gramex APIs and simulation models for Janssen to surface CO2 savings insights.",
                    "Implemented Redis caching and validation APIs for G20 KMP, accelerating throughput.",
                    "Developed Arcadia inventory dashboards with debounced search, freezing, and cron-driven reporting.",
                    "Created FastAPI-based AI call summarization platform with OpenAI GPT pipelines and OCR ingestion.",
                ],
            },
            {
                "role": "Python / Django Developer",
                "org": "Inecta",
                "duration": "2019 – 2021",
                "bullets": ["Built REST APIs (DRF + JWT), data import/export scripts, and customer workflows."],
            },
        ],
        "experience_additional": [
            {
                "role": "Software Developer",
                "org": "Mphasis",
                "duration": "2017 – 2019",
                "bullets": [
                    "Developed Django-based applications, automation scripts, and AWS S3 integrations.",
                    "Produced API reference guides and data normalization utilities.",
                ],
            },
        ],
        "projects": [
            "TB Nikshay analytics support & automation of reporting workflows.",
            "Green IT solution monitoring Azure spend and carbon footprint.",
            "AI call summarization & insight extraction for consumer agencies.",
        ],
        "education": [
            "B.Sc (Computers) – MSCs, India",
        ],
        "recognition": [
            "Trusted SME for Gramex/Gramex-based automation within Straive’s delivery pods.",
        ],
    },
    {
        "filename": "avirat-panhalkar-cv.pdf",
        "name": "Avirat S. Panhalkar",
        "title": "Senior Data Scientist – GeoAI",
        "location": "Pune, India",
        "contact": "Email & phone available on request",
        "summary": "Geospatial data scientist with deep experience in spatial regression, remote-sensing analytics, and GeoAI solutions for urban planning, supply chain, and public health clients.",
        "core_competencies": [
            "Geospatial modelling & spatial statistics",
            "Location intelligence & risk scoring",
            "Satellite imagery enrichment (Maxar, Landsat)",
            "GeoAI dashboards & storytelling",
            "Python, GeoPandas, QGIS, ArcGIS Pro",
            "Stakeholder facilitation across government & enterprise",
        ],
        "toolkit": [
            "Python (GeoPandas, Rasterio, TensorFlow)",
            "QGIS, ArcGIS Pro, ERDAS Imagine",
            "AWS SageMaker & Azure data services",
            "Shannon entropy, regression & clustering models",
            "Custom dashboards for map outputs",
        ],
        "experience_primary": [
            {
                "role": "Senior Data Scientist",
                "org": "Straive / Gramener",
                "duration": "2023 – Present",
                "bullets": [
                    "Led Urban Heat Island analytics for EVERGREEN using spatial regression + satellite data.",
                    "Developed TensorFlow-based flood risk model for SEEDS with roof-type detection via Maxar imagery.",
                    "Completed TB disease pattern analytics for Govt. of India, revealing gender/comorbidity trends.",
                    "Mapped branch/revenue distribution for HDFC to guide district-level expansion decisions.",
                ],
            },
        ],
        "experience_additional": [
            {
                "role": "GeoAI Consultant",
                "org": "Straive Geo Practice",
                "duration": "2020 – 2023",
                "bullets": [
                    "Delivered smart farming regression models for Gulf region and port storage dashboards for logistics teams.",
                    "Supported election analytics and sustainability programs with geospatial storytelling.",
                ],
            },
        ],
        "projects": [
            "Urban Heat Island modelling & LST estimation for city-scale planning.",
            "Flood-risk scoring at household level using TensorFlow + ground truthing.",
            "Smart farming spatial regression for Gulf-based agribusiness.",
            "Geo dashboards for port storage optimization and logistics planning.",
        ],
        "education": [
            "M.Tech, Geoinformatics & Spatial Technology",
            "B.Tech, Civil Engineering",
        ],
        "recognition": [
            "Regular speaker for Straive’s GeoAI community of practice.",
        ],
    },
    {
        "filename": "jaydev-sharma-cv.pdf",
        "name": "Dr. Jaydev Sharma",
        "title": "Educational Content & Accessibility Lead",
        "location": "Puducherry, India",
        "contact": "Email & phone available on request",
        "summary": "Curriculum designer, multilingual trainer, and accessibility SME with a PhD in Philosophy and a proven record of crafting inclusive learning experiences for global publishers.",
        "core_competencies": [
            "Curriculum & educational content design",
            "Alt-text and accessibility compliance",
            "Multilingual instruction (English/French/Hindi)",
            "Editorial quality assurance",
            "Workshop facilitation & pedagogy",
            "Translation & localization",
        ],
        "toolkit": [
            "Learning management & computer-aided teaching tools",
            "Accessibility authoring platforms",
            "Editorial QA frameworks",
            "French/English/Hindi translation workflows",
        ],
        "experience_primary": [
            {
                "role": "Educational Content Writer & Accessibility Lead",
                "org": "Straive Transfer Services",
                "duration": "2016 – Present",
                "bullets": [
                    "Owns alt-text creation pipelines for American accessibility compliance.",
                    "Leads QA for French-language books and digital stories using custom tools.",
                    "Advises on curriculum development and reader engagement for international publishers.",
                ],
            },
            {
                "role": "Lecturer & Language Instructor",
                "org": "Arts & Science Colleges (India)",
                "duration": "2010 – 2016",
                "bullets": [
                    "Taught English and French to diverse cohorts; ran science exhibitions for NGO-run schools.",
                    "Facilitated ethics and consciousness workshops (ICPR, SACAR).",
                ],
            },
        ],
        "experience_additional": [
            {
                "role": "Quality Analyst & Translator",
                "org": "French Publishing Programs",
                "duration": "2008 – 2010",
                "bullets": [
                    "Handled French customer inquiries, translations, and website localization.",
                    "Maintained QA metrics for French books and stories.",
                ],
            },
        ],
        "projects": [
            "Alt-text program for U.S. accessibility compliance across STEM titles.",
            "French website localization and customer engagement.",
            "Workshops on interdisciplinary ethics, governance, and consciousness studies.",
        ],
        "education": [
            "PhD, Philosophy – Pondicherry University",
            "M.A., Philosophy – Pondicherry University",
        ],
        "recognition": [
            "Presenter at ICPR Inter-Disciplinary Ethics & SACAR Consciousness forums.",
        ],
    },
]


def bulleted_list(items):
    if not items:
        return []
    return ListFlowable(
        [ListItem(Paragraph(item, BODY), leftIndent=4) for item in items],
        bulletType="bullet",
        bulletFontName="Helvetica",
        bulletFontSize=8,
        bulletIndent=0,
        leftIndent=10,
        spaceBefore=0,
        spaceAfter=2,
    )


def experience_block(entry):
    flows = []
    title = f"<b>{entry['role']}</b> — {entry['org']} ({entry['duration']})"
    flows.append(Paragraph(title, BODY))
    flows.append(Spacer(1, 2))
    flows.append(bulleted_list(entry["bullets"]))
    flows.append(Spacer(1, 6))
    return flows


def section(title, items, bullet=False):
    if not items:
        return []
    flows = [Paragraph(title.upper(), SECTION), Spacer(1, 2)]
    if bullet:
        flows.append(bulleted_list(items))
    else:
        for item in items:
            flows.append(Paragraph(item, BODY))
            flows.append(Spacer(1, 4))
    flows.append(Spacer(1, 4))
    return flows


def build_story(person):
    story = []
    story.extend(section("Professional Summary", [person["summary"]]))
    story.extend(section("Core Competencies", person["core_competencies"], bullet=True))
    story.extend(section("Technical Toolkit", person["toolkit"], bullet=True))
    story.append(Paragraph("KEY EXPERIENCE", SECTION))
    story.append(Spacer(1, 2))
    for entry in person["experience_primary"]:
        story.extend(experience_block(entry))
    story.append(PageBreak())
    if person["experience_additional"]:
        story.append(Paragraph("ADDITIONAL EXPERIENCE", SECTION))
        story.append(Spacer(1, 2))
        for entry in person["experience_additional"]:
            story.extend(experience_block(entry))
    story.extend(section("Notable Projects", person["projects"], bullet=True))
    story.extend(section("Education", person["education"]))
    story.extend(section("Recognition & Highlights", person["recognition"], bullet=True))
    return story


def draw_header(canvas, doc, person):
    canvas.saveState()
    width, height = LETTER
    y = height - 0.8 * inch
    # Stylized Straive bar
    canvas.setFillColor(HexColor("#f15a24"))
    canvas.rect(doc.leftMargin, y + 0.2 * inch, 1.2 * inch, 0.3 * inch, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 13)
    canvas.drawString(doc.leftMargin + 6, y + 0.33 * inch, "STRAIVE")

    canvas.setFillColor(colors.HexColor("#0f172a"))
    canvas.setFont("Helvetica-Bold", 16)
    canvas.drawString(doc.leftMargin, y, person["name"])
    canvas.setFont("Helvetica", 11)
    canvas.drawString(doc.leftMargin, y - 0.2 * inch, person["title"])
    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(colors.HexColor("#475467"))
    canvas.drawString(doc.leftMargin, y - 0.37 * inch, person["location"])
    canvas.drawRightString(width - doc.rightMargin, y, person.get("contact", "Contact available on request"))
    canvas.setStrokeColor(HexColor("#e4e7ec"))
    canvas.line(doc.leftMargin, y - 0.47 * inch, width - doc.rightMargin, y - 0.47 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#98a2b3"))
    canvas.drawRightString(width - doc.rightMargin, 0.5 * inch, f"Page {doc.page}")
    canvas.restoreState()


def create_cv(person):
    output_file = OUTPUT_DIR / person["filename"]
    doc = BaseDocTemplate(
        str(output_file),
        pagesize=LETTER,
        leftMargin=0.8 * inch,
        rightMargin=0.8 * inch,
        topMargin=1.5 * inch,
        bottomMargin=0.6 * inch,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    template = PageTemplate(
        id="StraiveCV",
        frames=[frame],
        onPage=lambda canvas, doc, person=person: draw_header(canvas, doc, person),
    )
    doc.addPageTemplates([template])
    doc.build(build_story(person))
    return output_file


def main():
    for person in CV_DATA:
        pdf_path = create_cv(person)
        print(f"Generated {pdf_path}")


if __name__ == "__main__":
    main()
