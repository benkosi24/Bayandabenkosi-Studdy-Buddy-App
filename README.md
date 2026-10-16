# NexusWork AI — Workplace Task Assistant

[![Repository](https://img.shields.io/badge/GitHub-Bayandabenkosi--AI--assistance-indigo.svg)](https://github.com/benkosi24/Bayandabenkosi-AI-assistance.git)
[![Powered by](https://img.shields.io/badge/Model-Gemini%203.8%20Flash-blue.svg)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/Frontend-React%2019%20+%20Tailwind%20v4-61DAFB.svg)](https://react.dev/)
[![Server](https://img.shields.io/badge/Backend-Express%20+%20Vite%20Middlewares-000000.svg)](https://expressjs.com/)

**NexusWork AI** is an enterprise-grade AI workplace assistant engineered to automate high-friction operational tasks across executive communications, meeting intelligence, and strategic task planning.

Built with Google's **Gemini 3.8 Flash** model via the official `@google/genai` TypeScript SDK, this application demonstrates advanced prompt engineering techniques, strict JSON schema output enforcement, and responsible AI ethical guardrails.

---

## 🚀 Core Modules & Features

### 1. ✉️ Executive Email Generation Studio
- **Multi-Intent Support**: Pre-configured flows for project delay escalations, commercial contract negotiations, candidate rejections, client thread replies, and weekly status briefs.
- **Tone & Length Calibration**: Six distinct tones (*Executive, Diplomatic, Concise, Persuasive, Assertive, Empathetic*) and word-count targets (*Brief, Standard, Comprehensive*).
- **Multi-Subject Generation**: Produces 3 contextual subject line variations (Direct, Action-Oriented, Brief) with one-click preview and copying.
- **One-Click Refinement Engine**: Instant server-side rewrites to cut length by 40%, smooth diplomatic friction, or convert drafts into actionable bullet points.
- **Chain-of-Thought Rationale**: Unpacks the linguistic and psychological reasons behind specific phrasings and calls to action.
- **Pre-Send Ethical Audit**: Instant scan for tone appropriateness, passive-aggressive phrasing, and legal overpromising.

### 2. 📋 Meeting Intelligence & Summarizer
- **Raw Transcript Ingestion**: Parses verbatim speaker transcripts and unstructured meeting notes.
- **Executive Elevator Brief**: Distills hours of discussion into a crisp 3–5 sentence executive summary.
- **Structured Action Items & Accountability**: Automatically isolates tasks with assigned owners, realistic deadlines, estimated effort hours, and priority badges (`P0` blocker to `P3` low).
- **Decisions Log**: Distinguishes finalized agreements and business impacts from open debates.
- **Sentiment & Consensus Diagnostic**: Diagnoses team alignment levels, psychological atmosphere, and key friction points.
- **Inter-Module Workflow**: One-click **"Send to Task Planner"** button routes meeting action items directly into the project planning engine.
- **Multi-Platform Export**: Generates copy-ready Slack updates, executive email recaps, and Markdown files.

### 3. 🎯 Strategic Task & Project Planner
- **Work Breakdown Structure (WBS)**: Decomposes high-level company goals into phased milestones with granular subtasks and hours estimation.
- **Eisenhower Priority Matrix**: Interactive 2×2 visual grid sorting tasks into:
  - *Do First* (Urgent & Important)
  - *Schedule* (Strategic Value)
  - *Delegate* (Urgent, Lower Leverage)
  - *De-prioritize* (Backlog)
- **Deadline Radar Timeline**: Chronological execution view highlighting sequence dependencies and milestone countdowns.
- **Proactive Risk & Mitigation Playbook**: Automatically diagnoses delivery bottlenecks and recommends concrete mitigation actions.
- **Interactive Execution**: Interactive completion checkboxes with real-time labor progress tracking (`% completed`).

### 4. 🛡️ Responsible AI & Ethical Shield
- **Client & Server-Side PII Scrubbing**: Automatically detects and redacts emails, phone numbers, and payment tokens before model submission.
- **Civility & Bias Auditor**: Dedicated interactive scanner that flags passive-aggressive phrasing, unconscious bias, and unrealistic contractual promises.
- **Responsible Rewrites**: Generates polite, professionally grounded alternatives that preserve original business intent.

### 5. 🔬 Prompt Engineering Lab
Inspect the underlying prompt architecture powering the assistant:
- **Role & Persona Conditioning**: System instruction engineering for executive tone and domain authority.
- **Strict JSON Schema Enforcement**: Utilizing `@google/genai` `responseSchema` with TypeScript `Type` definitions for 100% reliable, zero-chatter JSON outputs.
- **Defensive Prompting & Hallucination Suppression**: Low-temperature calibration (0.2–0.4) strictly grounding outputs to provided text.
- **Custom Blueprint Tuning**: Adjust temperature sliders and test custom system instructions live.

### 6. 🗄️ Activity Log & Persistence
- Automatically caches generated drafts, meeting briefs, and task plans to browser storage (`localStorage`).
- Real-time search, category filtering, one-click clipboard copying, and JSON/Markdown export.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion.
- **Backend**: Express.js with Vite middleware mode in development, standalone Node runtime in production.
- **AI Engine**: Google Gemini API (`gemini-3.8-flash`) via the modern `@google/genai` SDK.
- **Security**: Server-side proxying for all AI API calls (`/api/*`), ensuring API keys never leak to browser bundles.
- **Design System**: High-density Slate palette with Plus Jakarta Sans and JetBrains Mono typography, adhering to strict zero-pill discipline and tabular numeric alignment.

---

## 📁 Project Structure

```text
├── index.html                   # HTML entry point with meta tags & typography
├── metadata.json                # AI Studio application metadata
├── package.json                 # Project dependencies and run scripts
├── server.ts                    # Express backend with Gemini API proxy endpoints
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
└── src/
    ├── main.tsx                 # React DOM mount point
    ├── App.tsx                  # Primary workspace container & tab manager
    ├── index.css                # Global Tailwind CSS and font styles
    ├── types.ts                 # TypeScript data contracts & schema interfaces
    ├── assets/                  # High-resolution generated UI assets
    ├── data/
    │   └── presets.ts           # Realistic workplace scenarios (Email, Meeting, Task)
    ├── services/
    │   └── api.ts               # Typed client API functions
    └── components/
        ├── TopBar.tsx           # Clean 3-zone navigation bar
        ├── EmailGenerator.tsx   # Executive email drafting & refinement studio
        ├── MeetingIntelligence.tsx # Transcript summarizer & action item extractor
        ├── TaskPlanner.tsx      # WBS, Eisenhower matrix & deadline tracker
        ├── PromptLab.tsx        # Prompt engineering lab & ethical audit tool
        └── ActivityLog.tsx      # Saved artifact manager with search & export
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- A Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/benkosi24/Bayandabenkosi-AI-assistance.git
cd Bayandabenkosi-AI-assistance
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
# Required for Gemini AI API calls
GEMINI_API_KEY="your-gemini-api-key-here"

# Application hosting URL (optional)
APP_URL="http://localhost:3000"
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📡 API Endpoints Reference

All AI operations run through server-side proxy routes:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/email/generate` | Generates 3 subject lines, email draft, rationale, and ethical audit |
| `POST` | `/api/meeting/summarize` | Extracts executive summary, decisions, action items, and team sentiment |
| `POST` | `/api/tasks/plan` | Creates WBS milestones, subtasks with Eisenhower quadrants, hours, and risks |
| `POST` | `/api/ethical/audit` | Audits text for PII leakage, passive aggression, bias, and legal overpromises |
| `POST` | `/api/refine` | One-click transforms (executive concise, diplomatic, assertive, action-oriented) |

---

## 🔒 Responsible AI Commitment

This assistant incorporates five principles of ethical AI:
1. **Privacy Preservation**: Automated regex and heuristic PII redaction ensures no employee names, phone numbers, or credit card numbers leave the workspace unredacted.
2. **Zero-Hallucination Constraints**: Extraction prompts are bounded by strict negative instructions and low temperature to prevent fabricating commitments.
3. **Civility Enforcement**: Tone auditing identifies subtle workplace hostility (e.g. passive-aggressive phrases like *"as per my last email"*) and offers constructive rewrites.
4. **Legal Prudence**: Scans for unrealistic guarantees or legally binding promises before client-facing transmission.
5. **Human-in-the-Loop**: All outputs remain fully editable before final sending or distribution.

---

## 📄 License & Attribution

Designed and developed by **Bayanda Khumalo** ([khumalobayanda90@gmail.com](mailto:khumalobayanda90@gmail.com)).  
Repository: [https://github.com/benkosi24/Bayandabenkosi-AI-assistance.git](https://github.com/benkosi24/Bayandabenkosi-AI-assistance.git)

Licensed under the Apache-2.0 License.
