# Pre-bid Meeting, 11 Nov 2025

- Will the dashboard be public or internal?
  - Internal in Phase 1. Access for leadership and internal teams only.
- Who are the primary users?
  - Trust leadership and internal analytics teams.
- Is the dashboard dynamic?
  - Yes. It will support drill downs, filters, and interactive maps.
- What data volumes should we plan for?
  - About 500 grants and up to ~100 million beneficiary records may be in scope over time.
- How many years of history?
  - Roughly 4–5 years of grants to start.
- What is the data refresh expectation in Phase 1?
  - “Real-time” means the dashboard should reflect the latest file as soon as it is uploaded. Operationally, Tata Trusts expects monthly updates, with some cases needing fortnightly.
- What are the Phase 1 data sources and formats?
  - Tata Trusts will provide Excel or CSV files. You should load these into your repository for visualization.
- Will there be APIs in Phase 1?
  - No. Budget API work in your rate card for later phases. Flux APIs exist and use OAuth, but Phase 1 will rely on files.
- What systems power future integrations?
  - Fluxx (grants management) with REST APIs and OAuth, and a Data Management Platform backed by Snowflake.
- Do we need an ETL tool?
  - Not required initially. Trusts do not plan to invest in an ETL tool right now. If you believe one is needed, include it in your proposal and rate card.
- Will there be role-based access?
  - Yes, but plan this for Phase 2.
  - The RFP also asks for a secure, role-based platform.
- Are AI features expected?
  - Treat AI as Phase 2. However, a Phase 1 proof-of-concept is welcome if you can show value. No specific restrictions at this time.
- Will external data sets be part of Phase 1?
  - No. External data such as Census, NFHS, NITI Aayog, and others are Phase 2 items. Trusts will help acquire them then.
  - The RFP lists the external sources envisioned for the broader solution.
- Fixed reports or fully ad-hoc analytics?
  - Expect 10–15 templated reports plus the ability to customize views, filter by time and geography, and download relevant data.
- What about unstructured content like documents and images?
  - Focus Phase 1 on structured transactional data. Documents in Flux exist, but are not planned for the initial warehouse.
- What data quality stance should we take?
  - Trusts will strive to provide sanitized data, but you must include data quality checks and indicators for missing or out-of-range values.
- Any guidance on KPIs and indicator counts?
  - Numbers are not finalized. Each theme may have 5–7 consolidated KPIs. Expect 70–80% quantitative and 15–20% qualitative indicators.
- Who owns hosting and infrastructure if we do not use their stack?
  - You do. Include cloud hosting and any non-Trust stack costs in your proposal.
- Cloud or on-prem?
  - Cloud is preferred. Trusts do not run an on-prem data center for this.
- What technology preferences exist?
  - Trusts have Microsoft 365 and Power BI licenses, but Power BI is not mandated. They welcome open-source and other suitable stacks. If you propose new licensed tools, include those costs.
- Will brand guidelines be available?
  - Yes. Branding guidelines will be provided. The RFP also shows sample dashboards to convey expectations.
- What timeline should we plan for?
  - Two months from award of contract for Phase 1 delivery. This includes design, development, and deployment.
- What are the Phase 1 deliverables (at a high level)?
  - Requirements spec, prototype or wireframes, fully functional GIS dashboard with admin and user roles, training and documentation, and defined support.
- What features does the RFP expect in the platform overall?
  - Multi-level drill downs to village level, rich chart and map types, filters, layer toggles, exports to PDF/Excel/CSV/image, time-series and animations, hotspot and cluster detection, comparative analysis, mobile responsiveness, scheduled reports, tooltips, usage stats, and security with role-based access and DPDP compliance.
- How should we communicate and collaborate during Phase 1?
  - Use Microsoft Teams and email. A daily cadence is preferred. If daily is too much, aim for at least twice a week.
- Will Tata Trusts share wireframes?
  - They may share some wireframes, not all. The RFP provides sample references to guide UX expectations.
- What about the database for Phase 1?
  - You should stand up your own data repository to ingest the Excel/CSV files, then serve visualizations. Choices like MySQL or Snowflake are acceptable.
- How will the Phase 1 warehouse relate to Flux later?
  - Flux remains the system of record. The visualization database functions as a historical data warehouse fed via APIs in later phases. They are distinct by design.
- Should we budget for maintenance and AMC?
  - Yes. Include AMC and ongoing support in your rate card.
- How should we budget for future integrations and change requests?
  - Provide a rate card with man-hour rates for key roles. Use it to price Phase 2 and enhancements.
- What is the proposal structure?
  - Submit separate Technical and Financial proposals. The technical proposal should include architecture, approach, one sample wireframe, and a completed Functional Requirement Sheet (Annexure G). The financial bid follows the specified format and includes a role-based rate card.
- How do we submit the bid?
  - Email the bids to the specified IDs. A hard copy can be sent to the Mumbai address listed. Follow the calendar of events and deadlines in the RFP.
- What are the key dates?
  - Issue date: 04 Nov 2025
  - Pre-bid meeting: 11 Nov 2025
  - Bid submission: 17 Nov 2025
  - Note: The call transcript mentioned “17/11/2022,” which is incorrect. The RFP confirms 17 Nov 2025.
- How will proposals be evaluated?
  - QCBS model with 80% weight on technical and 20% on financial. Minimum technical score is 70%. Technical criteria include alignment to requirements, methodology and plan, resources, demo quality, and relevant experience.
- What is the expected team on the vendor side?
  - Team lead, developers, analysts, and a trainer for capacity building.
- What is the payment schedule?
  - 50% on submission of detailed wireframes or design plan, and 50% on acceptance of the final dashboard. Standard invoicing and GST terms apply.
- Are there penalties for delay?
  - Yes. 5% of contract value per week of delay, capped at 20%. The Trust may terminate if delays exceed four consecutive weeks or quality standards are not met despite notice.
- What about legal, security, and IP?
  - Comply with applicable Indian laws and data protection requirements. The platform must have role-based access, encryption, and DPDP compliance. Confidentiality and code-of-conduct apply. IP terms vest work product with the Client, with licensing for prior tools as outlined.
- Is there guidance on phase continuity?
  - Yes. The RFP frames Phase 1 as a pilot and encourages scalable, modular designs that can extend into later phases based on performance and needs.
- Any sample reports or references we should study?
  - Annexure B lists sample visualizations and report types for portfolio overview, financial insights, grantee performance, geography insights, and impact scorecards. Use them to align your demo and UX.
- What’s the preferred cadence for progress and risk management?
  - Daily stand-ups if feasible, otherwise twice a week. Use Teams and email. Surface blockers early.
- Can we propose open-source GIS and viz stacks?
  - Yes. The RFP invites open-source or proprietary options with cost-benefit considerations. Preference is for open source or solutions that leverage existing Trust stack. Include costs if you bring in new licenses.
- Do we need to complete any annexures now?
  - Yes. Fill Annexure G (Functional Requirement Sheet) and include it with the technical proposal, along with one sample wireframe.

## Attendees from Tata Trust:

- Anand S - Gramener
- Ankit Thakur - Tata Trust, Procurement
- Bindu Varghese - Tata Trust, IT Head
- Deepankar Panda - ImpactDash
- Dharal Patel
- Divyang Waghela - Tata Trust, Analytics Head
- Gogada Harinadh
- Jitesh Rustagi - Dhwani Rural Information Systems
- Jumin Kamki - Tata Insights & Quants
- Nilesh Bhayani - I4 Techno Labs
- Nitin Naik - Synergy Connect
- Rajagopal Rao - Tata Trust, Procurement
- Ram - Development Intelligence Unit (DIU)
- Sachin Bhumihar
- Sachin Ralhan - Tata Trust, Analytics Lead
- Sandeep Ghosh
- Swagatam - ImpactDash

## Transcript

**Sachin Ralhan**: Hi Sachin.

**Sachin Bhumihar**: Hi. Hi.

**Sachin Ralhan**: Good afternoon, everyone. We'll wait for another couple of minutes to let others join and then we will begin. Thank you.

**Sachin Ralhan**: Okay, I think we'll begin now.

Good afternoon again, everyone. My name is and thank you for joining. I'll request everyone to be on mute till the time we finish the presentation.

Okay. Good afternoon everyone again. Thank you for joining today's pre-bid meeting. I'm glad to see you all here. My name is Sachin Ralhan. I am from the analytics team of Tata Trusts and I am joined by my colleagues. I don't know, is there anyone from Tata Trust team? Not yet. Okay. I am expecting our IT team and procurement team to join this call.

The purpose of today's call, as the subject of the meeting suggests, we are going to take, we are going to respond to all the queries that we have received on this RFP and take any additional queries any bidder may have during this call so that we all have the same understanding of the assignment and there is clarity and everybody is on the same page.

And how we will go about this is, first, we will go through the list of queries together that I have, that we have received through our procurement team. And then we'll open the floor for any additional queries. And yeah, okay. I have Rajagopal also with me from our procurement team and Bindu Varghese who's the head of our IT department. With me, they are my colleagues from Tata Trust and we will together try to respond to all the queries that have come to our procurement team. And then we'll open the floor for any additional queries.

Okay. With that, Rajagopal, Bindu, you want to add anything to it or shall we begin the, can I go ahead with the queries?

**Bindu Varghese**: Yeah, please go ahead.

**Sachin Ralhan**: Please go ahead.

**Bindu Varghese**: Please go ahead.

**Sachin Ralhan**: Okay. Thank you. I'll quickly share my screen to show you the queries that we have received so far.

Is my screen visible?

**Jitesh Rustagi**: Yes, it is.

**Sachin Ralhan**: Okay.

**Sachin Ralhan**: Okay. So, the first query that we have received on this RFP is related to the functional requirements of the RFP, where somebody has asked that, "Will the dashboard be open to public or it's need authentication for access?" So basically, this is related to whether the dashboard is for public use or for internal use.

**This dashboard is for internal use currently. And especially in the, if you would have seen the RFP, it is divided into phases. Phase one is definitely for the internal use.** And so there is no doubt about it.

Next is, again on the functional requirement, "Is the dashboard read-only and or will authorized users to be able to upload create?" **The phase one doesn't require users to be able to upload any data. There will be data that will be provided from Tata Trust side and it will be, it's a visualization assignment and the expected agency will be will be required to present a visualization of the data that will be provided by the trust.**

Okay, the next is, "Who are the personas that basically are going to look at the dashboard?" **So, this dashboard is designed for the trust leadership where they will be able to see an overview of the work that the trust does at different levels.**

Again, the next question is again on the functional requirements where somebody has asked whether it is a dynamic dashboard or static. **So, clear answer is yes, it is a dynamic dashboard as you may have seen in the requirements. We expect geographical dashboard where there are drill-down capabilities and yeah, all sorts of things. So it's a dynamic dashboard for sure. It's not a static one.**

Next is on the data integration side where somebody has asked about the volume of the data that is expected to be visualized. So, **we are expecting around 500 grants to be visualized on this dashboard and expecting close to, close to 100 million user or beneficiaries data that may be available to see on the dashboard. But more, more from the side of the grant-related information we are expecting.**

Next question is again on the data integration which is related to, "What kind of historical data is expected to be presented here?" And so, yeah, **close to four to five years of, five-year-old grants are expected to be visualized through this, through this dashboard.**

Again, next question is, "What is the expected data refresh frequency?" So, **we expect, since it's a dynamic dashboard, we expect a real-time refresh rate where once the data is uploaded, it is immediately available and refreshed with the latest thing.**

Next question is again on the data integration, "What is the current structure of data in Flux and DMP?" So, the current data, **the data that will be provided to an agency will most likely be in the form of Excel or .CSV formats which should be uploaded into the dashboard.** I mean, at the back end of the dashboard, available for visualization.

Next question is again related to, "Can you provide the API documentation for Flux and data management platform?" So, yeah, so, so Flux is our grant management system as and it uses REST API. And our other platform, which is data management platform, uses Snowflake as the back end and in fact, I would request Bindu to come in here if I'm missing something. Next three points are related to, are slightly technical. Bindu, would you like to come in here on number 9, 10, and 11?

**Bindu Varghese**: **Yeah, so like you mentioned, Sachin, for now, we are looking at providing the data through Excel sheets. As and when we do the integration with Flux, we will share the required details on the APIs as well.**

**Sachin Ralhan**: Right. There is another one, "Are there any APIs available or do we need APIs to be developed?"

**Bindu Varghese**: For pulling data from Flux, APIs are available. You don't need to, yeah.

**Sachin Ralhan**: Correct. There is, like I mentioned, there is already an API called REST which can be used to pull the data, but that, that may not be required in the first phase also. So, yeah. The other question is also technical where they're asking, "What kind of authentication mechanisms we are currently using on our platforms?"

**Bindu Varghese**: Yes, so I mean if you're asking about Flux API, it will be standard OAuth authentication. But we'll get into those details, you know, as and when we decide to use the APIs from Flux.

**Sachin Ralhan**: Okay. Okay. Thank you, Bindu. I'll move on to the number 12, which is again related to data integration and somebody has asked, "Are there any data quality or standardization issues we should be aware of?" So, I would say, **currently since the data will be pulled out from a platform, like I told you, from Flux, so we don't expect any data quality or standardization issues.**

Number 13 is again relating to specific external data sets. So, yeah, I, I understand that RFP has mentioned something about NITI Aayog census, etc., but **all these are not required in the phase one. So not to worry about this at this moment, at least for this first phase one submission.** But yeah, so not to worry about this.

Again, number 14, "Are these external data sets already accessible or do we need to establish data sharing agreements?" Again, the response is, **not required for phase one and if there are any additional requirements for phase two, then trust will be helping you acquire these data sets.** So not to worry about this.

Next, number 15 is again related to, "What is the update frequency of external data?" Again, **not required for phase one** and we can provide these details probably in the phase two and as and when required.

Last couple of them, "Will the client provide any existing design assets, brand guidelines, or UX standards?" So, **definitely branding guidelines will be provided**, but and the RFP also gives some sample, so it should be able to tell you what kind of UX and design or UI we are expecting from the dashboard. But branding guidelines will be provided, yes.

The last one is, "Are there any third-party licenses client needs to own?" So currently as you, as I have informed you, we are using Flux and DMP and we have extensive licenses of Microsoft Suite and and Power BI licenses. Other than this, Tata Trust currently, I don't know, Bindu would like to again come in here, what kind of licenses or software we are currently using or that may be required to deliver this assignment?

**Bindu Varghese**: This is our current tech stack. So if they want to use a different tech stack, then they need to factor in the license cost accordingly. But this is what we have currently available from our side.

**Sachin Ralhan**: Right. Thank you. So, **this is our current tech stack, MS Suite and Power BI licenses. And if, if you, if any of the bidders based on their design and proposal for this assignment would like to propose some new licenses, they need to budget that into their proposal and submit their bids basically.**

That is what I have on the list and now and I can assume there may be more questions and I'm happy to take them right now. Yeah. So, I have the first question from Mr. Jitesh. Please go ahead.

**Jitesh Rustagi**: Yeah. So, I just wanted to understand like while you were saying that the external data sets will be incorporated in the future, but should we also keep that as a scope of work for a phase two requirement? And when are you also planning for phase two?

**Sachin Ralhan**: **Yes, yes, there is a plan for phase two, but it will be completely dependent on how the phase one performs** and the directions that we receive from the leadership after submitting the phase one.

**Jitesh Rustagi**: So, that is something that will be a future scope which will be decided in the latest stages.

**Sachin Ralhan**: Correct.

**Jitesh Rustagi**: I have another question. So, while there is, you already have Power BI licenses, so is it going to be a preferred technology or a BI tool that you want for the dashboard? Or is it also like considering because there will be some role-based access to the dashboards as well, right? Like, you know, which will be viewed by different users. So, should we also suggest like, you know, using an open-source BI tool as well, considering like, you know, because the cost factor will come in if we like, you know, give a Power BI, even a Power BI license cost and we are not also aware like what kind of licenses you have. So, should we propose something like an open source considering that there will be a requirement in and around the role-based access to the dashboard.

**Sachin Ralhan**: Okay. So, let me try to respond to your question in parts because there are multiple questions. So, first, I already showed you what kind of licenses, what kind of tech stack we are currently using and, and your question is that whether you should bill in or budget for open source or, your first question was whether Power BI is the preferred tool. So, my quick response to that would be no.

**We are already using Power BI and we would like to explore some additional and, and additional technologies as well. But that being said, we are, I'm not saying completely we do not want to use Power BI at all. We are already using Power BI and we would like to explore more technologies to, to do this kind of a visualization.** That is number one. Number two, you, we are more than happy, you are, we are happy to receive your creative or your, whatever you may deem fit based on the RFP, some innovative or more usable open-source technologies for this visualization. So yes, you can propose open-source technologies for this visualization. That is number two. Yeah, so these are the two quick responses that I have for the question, for your question. I hope that covers what you were intending to ask.

**Jitesh Rustagi**: Yeah, the role-based access part, if you can also cover that.

**Sachin Ralhan**: So, **role-based access, if you may have seen, again, it is expected to be delivered in phase two.** And I, and I don't think that should be from the technology perspective, it shouldn't be much of a problem. But I will also request Bindu is here if, if she wants to respond to it. But my quick response is that this is reserved for or this is expected to be delivered in phase two.

**Jitesh Rustagi**: Okay.

**Jumin Kamki**: Yeah, so I have two questions. First is like if any other tools apart from Microsoft tools or Power BI, then there will might be a requirement of, you know, infrastructure hosting. So, will it be considered as a part of our proposal or or Tata Trust will provide such infrastructure requirement?

**Sachin Ralhan**: **No, it should be a part of your proposal.**

**Jumin Kamki**: Okay. Second question is like you have mentioned the timeline of two months. Given the two months is also a very short time period, so, so do you have a wireframe or everything being ready so that, you know, from day one, day zero, we can start working on that or will two months include the part of the discussions on the requirement and the wireframe or if required Figma or whatever we have to design?

**Sachin Ralhan**: Yes, **Tata Trust may be able to share some wireframes with you, but not all of them.** Okay. That's why the, that's why the sample dashboard link has been given to you in the RFP that should be able to give a fair amount of clarity on what kind of visualization we are expecting.

**Jumin Kamki**: Okay. So, this two-month includes design and development and deployment, right?

**Sachin Ralhan**: Correct.

**Jumin Kamki**: Okay.

**Anand S**: Hi Sachin. Could you just briefly walk me through how it was authored and what process it went through till the release? It could help me understand the context.

**Sachin Ralhan**: So, so if you may be aware, but let me give you a quick background of how this has came into being. So, **this RFP is led by the Analytics and Evaluation team of Tata Trust, which I am a part of. And this has been constructed in collaboration with our IT team and with our program and procurement team.** So, these are three, four stakeholders that have contributed to forming this RFP.

**Anand S**: And what's the sequence that it went through?

**Sachin Ralhan**: It was, it is led by us, so it, it started with us because we look at all the...

**Bindu Varghese**: Can you just, what is the context of the question? What exactly would you like to know?

**Anand S**: Was that a bureaucratic process? So I was just curious where that came in from.

**Sachin Ralhan**: Does that answer, does that answer your question about who all contributed to this RFP?

**Anand S**: Yes. Do you have any additional question?

**Sachin Ralhan**: A few. Were there any prior data visualization RFPs that you conducted?

**Sachin Ralhan**: I think this is the first from the Analytics department.

**Anand S**: Got you. And the users you mentioned would be the internal users, but would that also be the analytics department?

**Sachin Ralhan**: Currently, yes.

**Anand S**: That covers me. Thanks.

**Sachin Ralhan**: Okay. Thank you.

**Nilesh Bhayani**: As you told us, the phase one, do you prefer to Excel and CSV as main data source? Okay. Then later on when our data change, that time we have to change the data, data visualization, right? So that time you provide that ETL tool or it's on our estimation?

**Bindu Varghese**: Can you please, can you please repeat your question?

**Nilesh Bhayani**: Okay. On phase one, you told us that first phase, you have a Excel and CSV as a main data source, okay? And then in on phase two might be it's change the data source. So that time any ETL tools and everything data visualization data will be provided from your end or it will be on our estimation cost?

**Bindu Varghese**: It depends. Yeah, it depends. So, like we said, **we have got APIs which we can utilize to pull the data. So, we don't have any ETL tools as of now. And given the volume of data, probably, you know, at the initial stage, we would just be using some scripts or APIs to pull in this data.** We don't have any plans to invest in an ETL tool, but if there is a need to factor in any ETL-related costs, tool-related costs, if you think it is required, you can put it in the RFP.

**Nilesh Bhayani**: Does it answer your question? Yes, yes. Okay.

**Deepankar Panda**: Yeah, hi. It's something similar to the previous question. I want to understand like, what kind of integration is expected with Flux? Like you mentioned that there are certain APIs. So in case, like is it possible to get some API documentation regarding the APIs that that will come from Flux? And is that part of the phase two and not part of phase one? So does my costing should that include API integration from Flux or should my costing only include CSV and Excel upload and then doing creating visualization on top of it?

**Bindu Varghese**: Yeah. I mean, to start with, phase one, we are saying **the data source will be your Excel sheets. So at this point, you don't need to factor in any effort for integration with Flux.** Flux has got APIs which are duly documented. We will share that, you know, as and when we want to start using APIs for getting the data from Flux. But as of now, please consider that you will be getting all your data in the form of Excel files.

**Deepankar Panda**: And also, I want to understand, if the data is coming through Excel files and CSV, is there the expectation of not to have a real-time dashboard? Because how will data come from an Excel or a CSV if it's not on cloud?

**Bindu Varghese**: You'll have to, you're, I mean, we are providing the data in Excel sheets. You will have to figure out what is the data repository you want to have. So if you want to go, you know, with MySQL or Snowflake or any such data source...

**Deepankar Panda**: I understand that, but how, how is your data in the Excel and the CSV is real time?

**Bindu Varghese**: Whenever we need the data, we will pull the data and give it to you. Okay. So, the frequency of the update on the dashboard will also depend upon the frequency at which Tata Trust is updating the Excels and the CSV.

**Bindu Varghese**: Yeah, that's true. So most likely, you know, I mean, on a typical frequency would be monthly to get all this data. But you might have cases where, you know, you might want to pull in the data on a fortnightly basis also.

**Sachin Ralhan**: Okay. Just, okay. Just to add to what Bindu said, I would say that **I would request you to budget for integrations in your rate card.** That's why the RFP also requests for a rate card. I think that's where you should budget for API integrations.

**Deepankar Panda**: Okay.

**Ram**: Thank you, sir. Am I audible to you?

**Sachin Ralhan**: Yes, please go ahead.

**Ram**: Okay, great. I have actually two questions. One I think is the question we have already talked about, which is whether this will be a dynamic dashboard or a static dashboard. My question is around not the data part of it, which is already answered. We'll refresh it once in a month or so.

But when we're looking at the dashboard, do we like have a fixed set of reports? Like this report, grants report, clients report, etc. Or the user will come in and try to ask an intelligent question and say, "Give me the top five grants in Andhra Pradesh or something like that." Like, because when we have to make it completely dynamic, then it's going to be a totally different design rather than, but if it's a fixed set of reports, we have like these 10, 11 reports. You can always filter them, you can always sort them and stuff like that. These are generic things. But if it's a fixed set, it will be an easier design, I would say. That's one question I had.

**Sachin Ralhan**: Okay. And your second question, please?

**Ram**: Okay, should I, should I say that as well? Okay. So, phase one, we are talking about loading this Excel sheets. So obviously, we are going to create a separate database where all this Excel sheet data will go and then we'll generate the metrics around it. That's the approach.

But when we phase two, we are saying we're going to access Flux and DMP and all those databases. Now we are creating like two sets of islands, right? Data islands. One is in this new implementation database, the other is is more real-time which is coming from Flux. So, what is the approach like in phase two, are we going to merge everything, the our, the new database we created into the Flux? Or bring the Flux data also into, into the new database in a file input-output process such that all the data stays at one place and we can generate the reports. Thank you so much.

**Divyang Waghela**: The question was, the, the question was, in the phase one, will the reports be fixed reports or are expected to be again pulled from Flux and or anybody, any user will, yeah.

**Divyang Waghela**: Yeah, so, yeah, see there are two, I mean, **we definitely would have a some fixed reports which would be let's say around 10, 15 reports would be templatized which would be available as it is. But obviously there are some flexibility which I think would require based on the time series or some specific areas which I think would require some flexibility to, you know, create some customization of that report also.** So that way it would be, I would say both would require, but largely 15, 10 to 15 templatized reports would be definitely available, would be required. And some elements could be customized based on the need of the users.

**Ram**: Can I quickly ask a follow-up question on that?

**Sachin Ralhan**: Yes, yes.

**Ram**: Okay. Yeah, so if we want me to go and build a new report, that's fine. That's not a problem. But if you want the dashboard to be like more intelligent in the sense that, like, you want to cross-tabulate one data against the other which is not already built-in, then that's a different kind of architecture we have to build.

**Divyang Waghela**: Yeah, so for example, I give you one example. If let's say we have a five different themes of the program which are which data will be mapped into a let's say in a in a state, in a country, and I would like to just look at some specific data points of some theme, some for some time series, I think I should be in a position to do that. And I'm saying in terms of more visualization perspective and if I can then download those data points, that would be also required as a part of it. So that way I think, I mean, I think you can always have some data points which can be downloaded on a regular basis on a monthly basis based on some time series. But that the flexibility on, you know, playing with some of the information would also be required on that.

**Ram**: Okay, thank you.

**Bindu Varghese**: So, the second part of the question? Yeah, so the second part of the question was what, are we going to have multiple data repositories?

**Ram**: Correct. Are we going to merge it back into Flux or into the new system we create?

**Bindu Varghese**: No, no. **Flux is our transactional system. Okay? So, it is our system of record for all grant-related data. When we are creating this data visualization database, it is intended to be more like having all the historical data also for all the grants.** So to that extent, these are very distinct systems. One is the, you know, transactional system, the other is going to be our kind of data warehouse where we will have all the historical data and you're going to, you know, when we're talking about Flux APIs, it is all about kind of pulling in the data from Flux and storing it in this warehouse so that you can use it for reporting.

**Ram**: Got it. Got it. Thank you. And one small addendum to that. All is this all regular data or you have like different types like images, stuff like that? Is it just pure data then, okay.

**Bindu Varghese**: Right now largely, you know, it is transactional data. But we also have documents which are stored in Flux. So, to start with, I think we will just look at the, you know, data part of it, the document part of it maybe, you know, we'll do it later. I don't think we are at this point kind of planning to put document data into into this data.

**Ram**: That makes sense. Thank you so much.

**Jitesh Rustagi**: Yeah. So, I just wanted to check like, you know, because the data will be updated with a monthly or a fortnightly frequency. So there will be some sort of additional support for bug fixing and everything will be there. So, do you also plan to have the budget component around AMC as well within this? That's first question. Second question is around the KPIs. So, if you can just suggest like, you know, what are the expected number of indicators that you are planning to have considering it's only a leadership dashboard, but even then like if you can give a broad structure of how the KPIs are going to be organized or what will be an estimated number? Will there be calculations required or it is just flashing out the exact numbers from different systems? Third is around the AI part. So, because the RFP also mentions the scope of AI possibility. So, just wanted to understand what kind of an expected use case are you looking at? Is it, is it something that again, you know, going to be part of phase one or is it, you know, something that we can expect something in phase two?

**Sachin Ralhan**: So, I'll, we'll try to respond to this. **AI is definitely, we are expecting to be done in phase two** and, and it will be a much more extensive version of what Divyang just mentioned before this where we, we give some inputs and we expect some response from the system, but **not in phase one, I would say, not, not an extensive one in phase one** is my response. And I would let again, Bindu would you like to respond to the technical query that Mr. Rustagi had? On whether the AMC cost should be included as part of this?

**Sachin Ralhan**: Yeah, so **AMC part, I would suggest that you again budget it in your rate card where we have asked for the rates for it.** And for KPIs, I would request Divyang, if you would like to respond to this one? What is the number of KPIs we are expecting in phase one?

**Divyang Waghela**: So, I think currently it's very difficult because we have many projects and I think currently we have already 300 plus ongoing projects. So, currently it's very difficult. We can get back to you maybe, you know, sharing what exactly the number of KPI, but obviously, at least every theme will have a some consolidated KPIs of around five or seven which I think is more specific to that particular theme which can be then reflected into the dashboard. So, that you can look at it and indicate you, but again, I'm, as I mentioned, there are different kind of diverse projects which has a different set of KPIs which some has a quantitative elements and some has a qualitative elements to for measurement. So you need to keep that I think open as a as a part of your process on designing the system. But we'll try to get back to you with some more detail on that separately.

**Jitesh Rustagi**: So, there will be some sort of a qualitative data analysis which will be also involved?

**Divyang Waghela**: Yeah, that would be part of that, I mean, I think, yeah. So largely I think I would say 70 to 80% is broadly a quantitative data part and around 15 to 20% is qualitative data elements.

**swagatam**: Hi Sachin, this is Swagatam and thank you for this call and actually it's clarified a lot of the queries we had this particular meeting in the RFP and it's actually very well structured. And both the examples you gave, your team gave on that particular RFP also helped. We had a large bird's view how like the larger leadership would like to look at this whole dashboard. My query is more on the historical data side. Assuming the most recent data would be having a lot of clarity or a lot of sanitized data, but historical data when you go two years back or the time just after the COVID, there might be a lot of missing data. And those missing data, we assume the Tata Trust team will give us a sanitized data. It would be like that, right? Otherwise, we don't have to assume a lot of like how to interpolate the data, then it will not result in the right analysis. So something on that can you give clarity, Sachin?

**Sachin Ralhan**: It will be, it will be sanitized data, my my one-line response, but I will let again Bindu come in if she wants to add to this.

**Bindu Varghese**: Yeah, I think to the extent possible, we will try to give sanitized data, but you must understand that, you know, **the data quality has to be taken care of. So, you should have parameters to look at the overall data quality and if, you know, plan for efforts to ensure the correct quality of data.**

**swagatam**: Understood.

**Bindu Varghese**: For example, you know, if there is some missing data, then you should have some indicator which says that, you know, data is missing for some attribute or if some, some data metric here is like over the top, in terms of let's say, you know, whether it is age or something, so those kind of checks you should factor for that. To make sure that the data quality is good and there's a way to measure the overall data quality of the KPIs.

**swagatam**: And in that case, again, our POC will be the Tata Trust team, right? Like all these decisions of how to take care of that particular outlier or missing data, the Tata team will help us.

**Bindu Varghese**: We can guide you, we also, yeah, of course, in terms of resolution, we will take care of the resolution. But in terms of how to measure, yeah, those things we would expect, you know, you to kind of define the framework with our inputs, yeah.

**swagatam**: Absolutely, absolutely. We'll also plan to work like that only, but yeah, I think definitely.

**Divyang Waghela**: Just to add on maybe Swagatam, I think one point which Bindu mentioned, so I think the data I think perspective and analytics perspective absolutely, I think you must be having understanding, but when you try and look at the, you know, data validity or cleaning, I think these are all like a social impact space data points. So, I think at least someone who can articulate and understand it easily would be really useful rather than you know, having us to educate them to, you know, explain that. So I think that just, it's not a very big challenge, but I think maybe having that kind of a skillset within the team would be useful for you to have easily navigate those information and converting into the data analytics.

**swagatam**: Absolutely, absolutely. We'll also plan to work like that only, but yeah, I think definitely.

**Anand S**: During phase one, what communication cadence and collaboration modes would you prefer?

**Sachin Ralhan**: I mean, the interaction between Tata Trust team and the team of the agency?

**Anand S**: Yes.

**Sachin Ralhan**: It will be through email, Microsoft emails, and through teams.

**Bindu Varghese**: We would also expect Anand, you know, because we'll be working closely with the team. **Ideally, we would prefer a daily cadence if possible. If not daily, the way we have daily stand-up calls, it would be I think much more easier for us to communicate that way if there are any blockers at all.**

**Anand S**: Got you.

**Bindu Varghese**: If daily is too much, yeah, we can look at a bi-weekly kind of thing.

**Anand S**: And while you mentioned phase two is preferable for AI, any preference to not use AI in phase one?

**Bindu Varghese**: No, I think if someone can show us a proof of concept on AI in phase one itself, that I think is very much appreciated.

**Anand S**: And any restrictions that you want to lay out on the use of AI?

**Bindu Varghese**: Not at this point. We are still in the, I would say, exploratory phase. So would not want to put too many restrictions at this stage.

**Anand S**: Thanks.

**Sachin Ralhan**: Okay. Any further questions from anyone?

Okay. I also have with me my colleagues from procurement team, Mr. Rajagopal and Mr. Ankit. Would you like to, would you like to add anything related to this or it's all right? Are we, are we, can we move ahead and close this call?

**Rajagopal Rao**: No, if you're asking us, there is nothing, but if there is any query from participants, we can take it.

**Bindu Varghese**: I just had one point, Sachin, to mention that in terms of whatever technology stack is being proposed, **I think we would prefer open source or whatever can leverage our existing technology stack.** So that's our preference, but if you think either of these options are not viable, please go ahead and propose whatever is the best according to you. Please, Ram, do you have a question?

**Ram**: Yes, you are okay with the cloud-based system, right?

**Bindu Varghese**: Yes, of course.

**Ram**: On cloud, right? You don't prefer an internal server or data center?

**Bindu Varghese**: **No, no, we prefer on cloud, actually.** We don't really have a data center either. We are on cloud.

**Ram**: Okay, okay. Great. Thanks.

**Bindu Varghese**: I don't know if we already did this, Sachin, and probably it's a little late, but I just wanted to know who all are the, you know, organizations here on the call? Did we already have the introduction from?

**Sachin Ralhan**: We, we didn't do any introduction in this call, but we'll have an attendance sheet. We can close with that introduction. Yes, of course.

**Anand S**: I can start. I'm Anand from Grama.

**Bindu Varghese**: Okay. Okay.

**Jitesh Rustagi**: So, I'm Jitesh, I'm from Dhwani Rural Information Systems.

**Sandeep Ghosh**: My name is Sandeep Ghosh, I and Ram, we work with the Development Intelligence Unit.

**Nitin Naik**: Hi, I'm Nitin Naik, I come from Synergy Connect.

**Deepankar Panda**: Hi, this is Deepankar Panda from Impactdash.

**swagatam**: Hello, this is Swagatam, I'm also from Impactdash. Thank you.

**Dharal Patel**: Hi, this is Dharal. I'm from Tata Insights and Quants.

**Nilesh Bhayani**: Myself Nilesh Bhayani from I-Four Technolabs.

**Sachin Ralhan**: Can you please repeat the name of your organization again?

**Nilesh Bhayani**: Myself Nilesh Bhayani from I-Four Technolabs. I-Four Technolabs.

**Sachin Ralhan**: Okay.

**Rajagopal Rao**: I think we have covered everything that we wanted to cover in this call and if there is anything additional that anybody requires, they can always email us back on the procurement emails that are provided. Yeah. Okay.

Okay then, I think we'll close the meeting.

**Ankit Thakur**: When are we expecting the proposals, Rajagopal?

**Rajagopal Rao**: When are we expecting the proposals? Ankit, can you come in? What was the dates?

**Ankit Thakur**: Yes, sir. **Submission deadline is 17/11/2022.**

**Rajagopal Rao**: Okay, great. Next week.

**Sachin Ralhan**: So, probably within a within a week, we are expecting the proposals. Yes. Excellent. Okay. Okay. Thank you again, everyone for joining this call and for showing your interest in partnering with Tata Trusts. Thank you.

<!--

- FAQ: https://chatgpt.com/c/6912f432-0b18-8322-befe-068cfcb333c7

-->
