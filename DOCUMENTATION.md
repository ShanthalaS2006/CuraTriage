# CuraTriage: AI-Powered Healthcare Triage Assistant
## Project Documentation

---

### 1. Executive Summary
CuraTriage is an innovative, AI-driven healthcare solution designed to provide immediate, preliminary medical guidance to patients, specifically targeting underserved and rural communities. By leveraging the Gemini 3.1 Flash model for Natural Language Processing (NLP), the system analyzes symptoms, calculates risk scores, and identifies emergencies in real-time. It features multilingual support and voice assistance (STT/TTS) to ensure accessibility for illiterate or non-technical users.

### 2. Problem Statement
Global healthcare systems face a critical shortage of medical professionals. Patients in rural areas often suffer from:
- Long waiting times for basic consultations.
- Dependence on unverified internet searches leading to misdiagnosis.
- Overburdened emergency departments due to lack of effective triage.
- Language barriers and low literacy affecting healthcare navigation.

### 3. Existing System
Current systems often rely on:
- **Static Checklists:** Rigid forms that don't capture the nuance of symptoms.
- **Search Engines:** General information that isn't personalized or risk-scored.
- **Telehealth:** High-cost, high-bandwidth services often unavailable in remote regions.

### 4. Proposed Solution
CuraTriage offers a "Patient-First" AI Triage. It replaces static forms with a dynamic NLP conversation. It uses a Reasoning Engine to:
- Understand natural language symptom descriptions.
- Cross-reference age, gender, and medical history.
- Categorize severity (Emergency, Urgent, Routine, Home Care).
- Provide immediate, localized actions (e.g., finding nearby clinics).

### 5. Objectives
1. **Accessibility:** Provide 24/7 medical guidance regardless of doctor availability.
2. **Accuracy:** Use advanced LLMs to identify "Red Flag" symptoms instantly.
3. **Inclusion:** Support multiple regional languages and voice-based input/output.
4. **Efficiency:** Reduce non-emergency hospital visits by providing clear "Home Care" paths.

### 6. System Architecture
- **Frontend:** React 19 + TypeScript + Vite.
- **AI Core:** Gemini 3.1 Flash API (Vertex AI / Google AI SDK).
- **Styling:** Tailwind CSS (Modern UI/UX).
- **Communication:** Browser Web Speech API (Speech-to-Text & Text-to-Speech).
- **State Management:** React Hooks + LocalStorage for persistent history.

### 7. Workflow Pipeline
1. **Intake:** User provides profile (Age, Gender, Language).
2. **Dialogue:** AI engages in a multi-turn conversation to clarify symptoms.
3. **Reasoning:** Gemini API processes the transcript against medical triage protocols.
4. **Output:** System generates a JSON-structured report (Severity, Risk Score, Red Flags).
5. **Action:** User is guided to either emergency services, a clinic, or home remedies.

### 8. Core Features
- **Intelligent Symptom Chat:** Context-aware follow-up questions.
- **Risk Scoring:** 0-100% severity calculation.
- **Emergency Detection:** Instant detection of life-threatening conditions (chest pain, dyspnea).
- **Care Level Recommendation:** Specific guidance on where to go next.

### 9. Advanced Features
- **Multilingual Support:** 10+ languages including Hindi, Bengali, Arabic, and Swahili.
- **Voice Assistance:** "Mic-to-Chat" for input and "Read Aloud" for assistant responses and final reports.
- **Health Dashboard:** A local history view to track past assessments.

### 10. Technology Stack
- **Framework:** React 19 (SPA).
- **AI Model:** `gemini-3.1-flash` (Optimized for speed and JSON output).
- **Icons:** Lucide React.
- **Animations:** Framer Motion (Smooth layout transitions).
- **Voice:** Web Speech API (Native browser support).

### 11. AI/NLP Reasoning Pipeline
The system uses a **System Instruction Layer** to ground the AI. It enforces:
- Non-diagnostic language (Safety First).
- Structured JSON output for UI rendering.
- Pattern matching for "Red Flags" like altered consciousness or severe bleeding.

### 12. Prototype Overview
The prototype consists of a four-stage flow:
1. **Welcome Stage:** Onboarding.
2. **Profile Stage:** Context setting.
3. **Chat Stage:** NLP Symptom collection (Voice supported).
4. **Result Dashboard:** Severity visualizer with localized hospital search.

### 13. Scalability & Future Scope
- **Offline Mode:** Using lightweight on-device models (e.g., Gemini Nano).
- **IoT Integration:** Connecting with wearable heart rate or SpO2 monitors.
- **Doctor Handover:** Direct API integration with hospital management systems (HMS).

### 14. Feasibility Analysis
- **Technical:** High, leveraging existing browser APIs and cloud AI.
- **Economic:** Low operational cost per triage compared to human staffing.
- **Operational:** Easy deployment via Progressive Web App (PWA) technology.

### 15. Ethical Considerations & Security
- **Privacy:** No sensitive PII (Name, SSN) required.
- **Bias:** Multi-language training to reduce linguistic discrimination.
- **Disclaimer:** Prominent warnings that the tool is assistive, not diagnostic.

### 16. Innovation & Uniqueness
CuraTriage's uniqueness lies in its **Accessibility Stack**. While most triage bots are text-only in English, CuraTriage bridges the gap for rural users who may prefer speaking in their native dialect.

### 17. Social Impact
- Reduced mortality in rural areas through faster emergency identification.
- Lowered healthcare costs for low-income families by avoiding unnecessary clinic visits.
- Increased health literacy through explained "Symptom Analysis."

### 18. Challenges Faced
- **Hallucination Control:** Solved via strict System Instructions and Schema enforcement.
- **Voice Consistency:** Managing different accents and browser-specific speech engines.
- **UI Density:** Balancing clinical data presentation with simplicity for low-literacy users.

### 19. Advantages of the System
- Instant response (Zero latancy compared to waiting lines).
- Objective severity scoring.
- Multilingual and Voice-first design.
- Persistent local history for patient tracking.

### 20. Conclusion
CuraTriage demonstrates how modern AI can be democratized to solve critical infrastructure gaps. By acting as a Preliminary Triage layer, it optimizes hospital resources and empowers patients with actionable, safe, and localized medical guidance.

### 21. References
- *World Health Organization (WHO):* Reports on global medical staff shortages.
- *Google Gemini Documentation:* Best practices for Medical NLP.
- *CDC Triage Protocols:* Guidance for emergency symptom prioritization.
