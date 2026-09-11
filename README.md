# e-Sanchay | MPLADS AI
### *Smart Monitoring & Risk Intelligence Platform for Members of Parliament Local Area Development Scheme (MPLADS)*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript_5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite_6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/AI_Engine-Python_3.11-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Status](https://img.shields.io/badge/Status-SIH_2026_Locked_Specification-success.svg)]()
[![Live Dashboard](https://img.shields.io/badge/Live_Dashboard-Deploy_Link-0052CC?style=for-the-badge&logo=vercel&logoColor=white)](https://mplads-ai.vercel.app)
[![YouTube Demo](https://img.shields.io/badge/YouTube-Video_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/watch?v=your-demo-id)

---

> **"We don't just monitor MPLADS works. We identify what needs attention, explain why, predict what could go wrong, and help authorities act before it becomes critical."**

---

## Executive Summary

**e-Sanchay (MPLADS AI)** is an enterprise-grade AI-powered monitoring, risk intelligence, and decision-support platform engineered for the **Ministry of Statistics and Programme Implementation (MoSPI), Government of India**.

Across India, over **1,05,000+ MPLADS works** are active at any given moment. No government authority can manually inspect every work. **e-Sanchay** converts raw, fragmented signals (project progress, fund releases, payment timing, compliance documentation, geo-location, contractor history) into a **single prioritized, explainable action pipeline**.

```mermaid
flowchart LR
    A["RISK ANALYSIS"] --> B["EVIDENCE COMPILATION"]
    B --> C["PREDICTION ENGINE"]
    C --> D["ALERT GENERATION"]
    D --> E["INVESTIGATION QUEUE"]
    E --> F["OFFICER ACTION"]
    F --> G["AUDIT TRAIL"]
```

---

## Quick Links

| Resource | Link | Description |
| :--- | :--- | :--- |
| **Live Dashboard** | [mplads-ai.vercel.app](https://mplads-ai.vercel.app) | Interactive Government-Enterprise Web Application |
| **YouTube Demo Video** | [Watch Prototype Walkthrough](https://youtube.com/watch?v=your-demo-id) | Complete End-to-End System Demonstration |
| **MoSPI MPLADS Portal** | [mplads.gov.in](https://mplads.gov.in) | Official Government Source of Record |
| **eSAKSHI Portal** | [esakshi.mospi.gov.in](https://esakshi.mospi.gov.in) | Official Implementation Platform |

---

## Today's Reality & The Problem Statement

Thousands of MPLADS works nationwide are monitored via aggregated summaries, leaving authorities with delayed interventions and manual scanning burdens.

```mermaid
flowchart TD
    subgraph Current_Challenges ["Current Challenges in MPLADS Monitoring"]
        P1["1. Too Many Works to Manually Review<br/>1,05,000+ active works nationwide cannot be manually inspected"]
        P2["2. Fragmented Data Signals<br/>Cost, payment, progress, compliance, and GIS data reside in isolated silos"]
        P3["3. Hidden Deviations<br/>Front-loaded payments and cost overruns masked in aggregate statistics"]
        P4["4. Reactionary Interventions<br/>Issues investigated only after public failures become visible"]
    end
```

### Official Alignment
The official **eSAKSHI / MPLADS Portal** exposes work recommendations, expenditure, fund releases, status, and GIS locations. However, the **exact granularity of expenditure, milestone execution, and agency performance resides with District Authorities (Nodal Authorities)**. e-Sanchay synthesizes these distributed signals without disturbing current administrative workflows.

---

## The Solution: One Platform. One Prioritized Pipeline.

e-Sanchay shifts government oversight from **"Monitor Everything"** to **"Investigate What Matters"**.

```mermaid
flowchart LR
    subgraph Action_Pipeline ["Unified Action Pipeline"]
        D["DETECT<br/>Cost, Payment & Progress Outliers, Duplicate Candidates"] --> P["PREDICT<br/>Delay Forecast & Final Cost Overrun"]
        P --> A["ASSESS<br/>Project Risk & Contractor History Profile"]
        A --> E["EXPLAIN<br/>SHAP Evidence Rationale & Model Confidence %"]
        E --> ACT["ACT<br/>Field Verification Dispatch & Tamper-Proof Audit"]
    end
```

---

## Key Innovations & Game-Changers

### 1. Unified AI Risk Engine
Integrates financial velocity, physical progress, spatial similarity, documentation compliance, and historical contractor execution into a standardized **Unified Risk Index (0 - 100)**.

### 2. Contractor / Agency Risk Intelligence (Core Innovation)
Moves beyond isolated project checks. e-Sanchay constructs a persistent **Historical Risk Profile** per contractor/implementing agency across multiple works:
* Tracks recurring delay habits, systematic cost overruns, payment timing anomalies, duplicate relationships, and compliance certificate omissions.
* *Legal Defense Principle*: Always flagged as *"High-risk contractor — historical patterns require enhanced scrutiny,"* never automated accusation.

### 3. Predictive Monitoring
Forecasts project delays and probability of budget inflation **months before deadlines pass**, evaluating historical velocity vs physical progress curves.

### 4. Explainable AI (XAI with SHAP)
Eliminates black-box algorithms. Every flagged alert includes an explicit **"Why is this risky?"** panel displaying:
* Contributing risk weight percentages (e.g., Cost Deviation: +35%, Progress Lag: +28%).
* Quantitative evidence markers.
* Model confidence metrics (e.g., *89% Confidence*).

### 5. AI Decision-Support Copilot (Core Innovation)
An embedded natural language intelligence agent trained strictly on **MPLADS domain guidelines and live dataset context**:
* Officers ask natural language questions (e.g., *"Why is Project MPL-9281 critical?"*, *"Find potential duplicate works in Patna"*).
* Generates evidence-backed answers and formats formal **AI Investigation Reports** instantly.

### 6. Duplicate Work Intelligence
Combines **Sentence-BERT (S-BERT)** semantic description embeddings with **GIS spatial proximity (Haversine/PostGIS)** to highlight potential double-funding or duplicated work recommendations within a geographic radius (e.g., 93% description match, 1.4 km apart).

### 7. Priority Investigation Queue
Ranks all pending interventions by risk index, confidence, and financial exposure, ensuring district officers focus their limited field teams on top-tier anomalies first.

---

## Uniqueness & Strategic Value

```mermaid
flowchart LR
    subgraph eSAKSHI ["eSAKSHI Implementation Platform (MoSPI)"]
        E1["Work Recommendation"] --> E2["Financial Sanction"]
        E2 --> E3["Fund Disbursal & Payments"]
    end

    subgraph eSanchay ["e-Sanchay Intelligence Layer"]
        P1["Data Extraction & Normalization"] --> P2["AI Anomaly & Risk Engine"]
        P2 --> P3["Decision Support & Priority Queue"]
    end

    eSAKSHI -->|Raw Signals| eSanchay
    eSanchay -->|Actionable Evidence| eSAKSHI
```

* **Complementary, Not Competitive**: eSAKSHI remains the official transaction platform for work recommendations and fund releases. e-Sanchay acts as an intelligent decision-support layer sitting on top of eSAKSHI data.
* **Contractor-Level Intelligence**: Identifies systemic risk patterns across all works awarded to a single contractor across districts.
* **Human-in-the-Loop Governance**: **AI flags, explains, and recommends**; **Authorized Government Officers verify, decide, and act**. AI is a decision support tool, NOT an autonomous agent.
* **Single Audit Trail**: Maintains end-to-end audit logs of every risk calculation, officer view, verification request, and report export for complete administrative accountability.

---

## 5 Levels of Intelligence Architecture

```mermaid
flowchart TD
    L1["LEVEL 1: MONITORING<br/>What is happening right now? (KPIs, Dashboards & GIS Maps)"] --> L2["LEVEL 2: DETECTION<br/>What looks unusual? (Cost, Payment & Duplicate Anomalies)"]
    L2 --> L3["LEVEL 3: PREDICTION<br/>What is likely to happen? (Delay Forecast & Final Cost Estimate)"]
    L3 --> L4["LEVEL 4: EXPLANATION<br/>Why is this risky? (SHAP Evidence Rationale & Confidence Score)"]
    L4 --> L5["LEVEL 5: DECISION SUPPORT<br/>What should the officer do? (Recommended Action & Audit Trail)"]
```

---

## Multi-Tier Stakeholder Personas

e-Sanchay natively maps onto the four operational tiers of the MPLADS governance structure:

```mermaid
flowchart TD
    S1["MINISTRY OF STATISTICS & PROGRAMME IMPLEMENTATION (MoSPI)<br/>National Risk Intelligence, Inter-State Benchmarking & National Reports"] --> S2["STATE NODAL AUTHORITY<br/>State-Level Oversight, District Comparison & Contractor Risk Clusters"]
    S2 --> S3["DISTRICT AUTHORITY (DM / DC)<br/>Ground Inspection Dispatch, Priority Investigation Queue & Action Verification"]
    S3 --> S4["MEMBER OF PARLIAMENT (MP)<br/>Constituency Visibility, Progress Tracking & Status Alerts"]
```

| Stakeholder Level | Key Dashboard Capabilities & Responsibilities |
| :--- | :--- |
| **Ministry (MoSPI)** | National Risk Index, inter-state progress comparison, macro anomaly detection, nationwide report generation. |
| **State Nodal Authority** | Inter-district benchmarking, contractor performance matrix, state compliance monitoring, high-risk project clusters. |
| **District Authority** | Prioritized investigation queue, physical vs financial verification, field inspection dispatch, official action logging. |
| **Member of Parliament** | Constituency-level visibility, recommended vs sanctioned vs completed progress, fund utilization tracking, status alerts. |

---

## System Workflow & Technical Architecture (Mermaid)

### End-to-End Technical & Data Architecture

```mermaid
flowchart TD
    subgraph Data_Layer ["1. DATA INGESTION & STORAGE LAYER"]
        MPLADS_Portal["MPLADS / eSAKSHI Official Portals"] -->|API / Export| Data_Ingestion["Data Extraction & Normalization"]
        Data_Ingestion --> Raw_Storage[("Raw Signal Storage")]
        Raw_Storage --> Data_Pipeline["ETL Pipeline: Geo-coding, Text Cleaning"]
        Data_Pipeline --> Data_Warehouse[("PostgreSQL / PostGIS Data Warehouse")]
    end

    subgraph Intelligence_Layer ["2. AI / ML INTELLIGENCE LAYER"]
        Data_Warehouse --> Feature_Eng["Feature Engineering (Financial, Spatial, Progress Velocity)"]
        
        Feature_Eng --> Engine_Anomaly["Isolation Forest Engine (Cost & Payment Anomalies)"]
        Feature_Eng --> Engine_Duplicate["Sentence-BERT + Spatial Radius (Duplicate Detection)"]
        Feature_Eng --> Engine_Predict["XGBoost / LightGBM (Delay & Cost Forecast)"]
        Feature_Eng --> Engine_Contractor["Contractor Historical Profiler"]
        
        Engine_Anomaly --> Risk_Aggregator{"Unified Risk Engine (0 - 100)"}
        Engine_Duplicate --> Risk_Aggregator
        Engine_Predict --> Risk_Aggregator
        Engine_Contractor --> Risk_Aggregator
        
        Risk_Aggregator --> XAI_Engine["SHAP Explainability Engine"]
        XAI_Engine --> Risk_Score_Output["Explainable Risk Score + Confidence %"]
    end

    subgraph Action_Layer ["3. DECISION SUPPORT & GOVERNANCE LAYER"]
        Risk_Score_Output --> Priority_Queue["Priority Investigation Queue"]
        Risk_Score_Output --> Copilot["AI Decision Copilot (RAG + Domain Rules)"]
        
        Priority_Queue --> Officer_Portal["Government Officer Portal"]
        Copilot --> Officer_Portal
        
        Officer_Portal --> Officer_Action["Human-in-the-Loop Action: Verify / Request Inspection / Freeze Funds"]
        Officer_Action --> Audit_Trail[("Immutable Audit Trail Storage")]
        Audit_Trail -->|Feedback Loop| Feature_Eng
    end

    style Risk_Aggregator fill:#003366,color:#fff,stroke:#333,stroke-width:2px
    style XAI_Engine fill:#d97706,color:#fff,stroke:#333,stroke-width:2px
    style Officer_Action fill:#16a34a,color:#fff,stroke:#333,stroke-width:2px
```

### Human-in-the-Loop Investigation Workflow

```mermaid
sequenceDiagram
    autonumber
    actor System as AI Risk Engine
    actor Queue as Priority Queue
    actor Officer as District Authority (DM/Officer)
    actor Field as Field Inspector / Agency
    actor Audit as Audit Ledger

    System->>Queue: Flag Project (Risk: 89/100, SHAP Rationale + 87% Confidence)
    Queue->>Officer: Display Top Priority Investigation Card
    Officer->>Officer: Review Evidence ("Why is this risky?" + Cost/Duplicate breakdown)
    Officer->>Field: Dispatch Verification Order / Upload Field Evidence
    Field-->>Officer: Submit Geo-tagged Photo & Physical Inspection Report
    Officer->>System: Authorize Decision (Approve / Rectify / Escalate)
    Officer->>Audit: Timestamp & Log Action into Official Audit Trail
```

---

## Product Modules Roadmap

e-Sanchay is divided into 10 key enterprise modules:

| # | Module | Core Functionality & Deliverables |
| :---: | :--- | :--- |
| **1** | **Overview Dashboard** | National KPI cards, Fund vs Physical completion chart, Risk Distribution donut, State Risk Map, Live AI Insights. |
| **2** | **Risk Intelligence** | Filterable risk engine views, 4(+1) detection engines, unified scoring, confidence scores, contractor intelligence. |
| **3** | **Priority Investigation Queue** | Ranked investigation feed by risk level, financial value, issue type, and action urgency. |
| **4** | **Projects Directory** | Searchable project directory with status tags, financial utilization rates, risk badges, and district filters. |
| **5** | **Project Investigation (Hero Screen)** | Deep-dive screen displaying Identity, Budget vs Benchmark, Timeline predictions, Duplicate side-by-side comparison, Compliance checklist, and Recommended Action. |
| **6** | **Financials Module** | Allocation vs Release vs Expenditure analysis, fund utilization speed, payment anomaly flags, district cost benchmarking. |
| **7** | **Compliance Tracker** | Approval-to-Completion tracking (AS, TS, FS, UC, Completion Certs, Geo-tagged photos) rolled into a Compliance Score. |
| **8** | **Auto-Generated Reports** | One-click PDF/Excel export of National Risk Intelligence, State Cost Benchmarking, Duplicate Registers, and Delay Forecasts. |
| **9** | **AI Copilot** | Natural-language decision support drawer with domain context, pre-built query chips, and auto-generated investigation reports. |
| **10** | **Audit Trail & RBAC** | Role-based navigation (Ministry, State, District, MP) and immutable logging of every risk assessment and officer action. |

---

## Unified Risk Scoring System

All signals culminate in a standardized risk scale:

```
[Level: LOW]        Score: 0 - 30      Normal progress, routine monitoring
[Level: MEDIUM]     Score: 31 - 50     Minor delay / documentation gap
[Level: HIGH]       Score: 51 - 70     Cost deviation / Payment anomaly detected
[Level: CRITICAL]   Score: 71 - 100    High probability delay / Duplicate work candidate / Contractor pattern
```

> **AI Confidence Score (%)**: Displayed alongside every score to explicitly communicate model certainty (e.g., *Risk 84/100 · 92% Confidence*).

---

## Feasibility & Risk Mitigation Matrix

### Feasibility & Mitigations Diagram

```mermaid
flowchart TD
    subgraph Feasibility ["Feasibility Pillars"]
        F1["TECHNICAL FEASIBILITY<br/>Built on existing eSAKSHI / MPLADS data schemas; non-disruptive layer"]
        F2["OPERATIONAL FEASIBILITY<br/>Maps directly to Ministry, State, District, and MP governance roles"]
        F3["SCALABLE ARCHITECTURE<br/>Batch AI engines + PostGIS spatial indexing handles 1,00,000+ works"]
    end

    subgraph Mitigations ["Challenges & Risk Mitigations"]
        C1["Data Quality Gaps"] -->|Automated Validation & Normalization| M1["Scored Confidence Discounting"]
        C2["False Positives"] -->|Human-in-the-Loop Protocol| M2["Field Verification Before Escalation"]
        C3["AI Trust Hesitation"] -->|SHAP Rationale & XAI Evidence| M3["Transparent Natural Language Rationale"]
        C4["System Integration"] -->|RESTful API & CSV/JSON Adapters| M4["Seamless eSAKSHI Integration"]
    end
```

---

## Tangible Benefits

```mermaid
flowchart TD
    subgraph Benefits ["e-Sanchay Governance Impact"]
        B1["ADMINISTRATIVE BENEFITS<br/>• Eliminates manual scanning<br/>• Automated priority sorting<br/>• Unified investigation workflow"]
        B2["FINANCIAL BENEFITS<br/>• Early cost anomaly detection<br/>• Payment pattern monitoring<br/>• Fund utilization supervision"]
        B3["GOVERNANCE BENEFITS<br/>• Evidence-based decisions<br/>• Explainable AI transparency<br/>• Immutable audit trail"]
    end
```

---

## Tech Stack & Technical Research Foundation

### Application Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18 (TypeScript), Vite 6 |
| **Styling & UI** | Tailwind CSS v3, Lucide React (Enterprise Outline Icons), Custom CSS Design System |
| **Data Visualization** | Recharts (Financials & Progress trends), Custom SVG Risk Gauges |
| **GIS & Mapping** | Leaflet / D3-Geo (Interactive India State & District Risk Maps) |
| **Routing & State** | React Router v6 |
| **AI Backend (Engine)** | Python 3.11, FastAPI / PyTorch / Scikit-Learn |
| **Database & Search** | PostgreSQL 16 + PostGIS (Spatial Analysis), Vector Indexing |

### Scientific & Research Citations

1. **Anomaly Detection**: *Isolation Forest* (Liu, Ting & Zhou - IEEE). Research basis for detecting multi-dimensional financial & progress outliers in large public datasets.
2. **Explainable AI (XAI)**: *SHAP (SHapley Additive exPlanations)* (Lundberg & Lee - NeurIPS 2017). Framework used for assigning exact quantitative attribution weights to risk factors.
3. **Semantic Similarity**: *Sentence-BERT (S-BERT)* (Reimers & Gurevych - arXiv). Technical foundation for semantic similarity matching of project titles and work descriptions across nearby coordinates.

---

## Project Directory Structure

```
mplads-ai/
├── public/
│   ├── .htaccess
│   └── _redirects
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI cards, metrics, badges & tables
│   │   ├── copilot/            # AI Copilot Drawer, chat input & sample queries
│   │   ├── dashboard/          # KPI cards, charts, risk maps & early warnings
│   │   ├── layout/             # Sidebar, TopHeader & navigation elements
│   │   ├── project/            # Project investigation components & compliance lists
│   │   └── risk/               # Risk intelligence filtering & scoring engines
│   ├── data/
│   │   └── dashboardData.ts    # Realistic Mock MPLADS Data, Risk Scores & Insights
│   ├── pages/
│   │   ├── CompliancePage.tsx
│   │   ├── DashboardOverviewPage.tsx
│   │   ├── FinancialsPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── ProjectDetailPage.tsx  # Hero Project Investigation Screen
│   │   ├── ProjectsPage.tsx
│   │   ├── ReportsPage.tsx
│   │   └── RiskIntelligencePage.tsx
│   ├── types/                  # TypeScript Data Schemas & API Contracts
│   ├── utils/                  # Formatting, Geo-calculations & Risk Helpers
│   ├── App.tsx                 # Core Route Configuration & Layout Shell
│   ├── main.tsx                # Entry point
│   └── index.css               # Design Tokens & Utilities
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## Local Setup & Installation

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/prince7z/MPLads.git
   cd MPLads
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Local Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

---

## Summary Demo Walkthrough

When presenting e-Sanchay / MPLADS AI, follow this recommended presentation sequence:

```mermaid
flowchart LR
    D1["1,05,642 Active Works"] --> D2["Overview Dashboard"]
    D2 --> D3["Filter Critical/High Risk"]
    D3 --> D4["Select High-Risk Project"]
    D4 --> D5["Inspect Risk Score (89/100)"]
    D5 --> D6["Review Why Is This Risky (SHAP Factors)"]
    D6 --> D7["Verify Delay/Cost Forecast & GIS Duplicate Match"]
    D7 --> D8["Execute Recommended Action & Generate AI Report"]
    D8 --> D9["Timestamp Action in Audit Ledger"]
```

---

## Acknowledgements & References

* **Ministry of Statistics and Programme Implementation (MoSPI)**: Guidelines on Members of Parliament Local Area Development Scheme (MPLADS).
* **Official Portals**: [MPLADS DigiGov Portal](https://mplads.gov.in) & [eSAKSHI Portal](https://esakshi.mospi.gov.in).
* **Smart India Hackathon (SIH 2026)**: Developed as a comprehensive product specification and prototype for national implementation monitoring.

---

<div align="center">
  <sub>Built for Transparent, Efficient, and Accountable Public Governance in India.</sub>
</div>
