# 🩺 CuraTriage — AI-Powered Smart Healthcare Triage System



<p align="center">
  <b>AI-Assisted Emergency Triage & Healthcare Guidance Platform</b>
</p>

<p align="center">
  Built with React + Gemini AI + Voice Intelligence
</p>

---

# 📘 Executive Summary

CuraTriage is an innovative AI-driven healthcare triage solution designed to provide immediate preliminary medical guidance, especially for underserved and rural communities.

Powered by the Gemini 3.1 Flash model, the system performs:

- Intelligent symptom analysis
- Real-time risk assessment
- Emergency detection
- AI-assisted healthcare guidance

The platform also supports multilingual communication and voice assistance, making healthcare more accessible for users with low literacy or language barriers.

---

# 📱 Application Preview

## 🧾 Patient Profile Collection



The onboarding module collects:
- Age
- Gender
- Preferred language
- Medical history

This enables contextual and personalized AI triage analysis.

---

## 🤖 AI Symptom Conversation



The AI assistant dynamically interacts with users using:
- Natural language understanding
- Follow-up medical questioning
- Voice-enabled communication
- Severity clarification

This conversational workflow replaces traditional static healthcare forms.

---

## 🚨 Emergency Assessment Dashboard



The system generates:
- Emergency severity classification
- Risk percentage
- Red flag detection
- Immediate care recommendations
- Emergency guidance actions

---

# ❗ Problem Statement

Global healthcare systems face severe challenges including:

- Shortage of medical professionals
- Long waiting times in hospitals
- Misdiagnosis due to unreliable internet searches
- Overloaded emergency departments
- Language and literacy barriers in healthcare access

Patients in rural communities are particularly affected due to limited healthcare infrastructure and delayed medical attention.

---

# 💡 Proposed Solution

CuraTriage introduces a Patient-First AI Triage System that replaces traditional static healthcare forms with dynamic AI-powered conversations.

The AI system:
- Understands natural language symptom descriptions
- Evaluates medical severity
- Detects emergency red flags
- Provides personalized care recommendations
- Suggests localized healthcare actions

## Severity Categories

- 🚨 Emergency
- ⚠ Urgent
- 🩺 Routine Care
- 🏠 Home Care

---

# 🎯 Objectives

- Provide 24/7 accessible healthcare guidance
- Improve emergency response identification
- Reduce unnecessary hospital visits
- Support multilingual and voice-first interaction
- Deliver intelligent and fast patient triage

---

# 🏗 System Architecture

| Layer | Technology |
|------|-------------|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS |
| AI Engine | Gemini 3.1 Flash |
| Voice Support | Web Speech API |
| State Management | React Hooks + LocalStorage |
| Animations | Framer Motion |

---

# 🔄 Workflow Pipeline

## 1️⃣ Intake Stage

Users provide:
- Age
- Gender
- Language preference
- Medical history

## 2️⃣ AI Dialogue

The AI assistant engages in contextual conversations to collect symptoms and clarify severity.

## 3️⃣ AI Reasoning Engine

Gemini AI processes:
- Symptoms
- Patient history
- Risk indicators
- Emergency patterns

## 4️⃣ Smart Output

The system generates:
- Risk score
- Red flag symptoms
- Care recommendations
- Emergency guidance

---

# 🧠 AI/NLP Reasoning Pipeline

CuraTriage uses a carefully engineered System Instruction Layer to ensure:

✅ Safe and non-diagnostic communication  
✅ Structured JSON responses  
✅ Red Flag symptom detection  
✅ Risk-based severity analysis  
✅ Controlled AI hallucination prevention  

The system detects dangerous symptoms such as:
- Chest pain
- Severe bleeding
- Altered consciousness
- Breathing difficulty
- Neurological symptoms

---

# 🚀 Core Features

## 🤖 Intelligent Symptom Chat
Dynamic AI conversations with contextual follow-up questions.

## 📊 Risk Scoring
Severity analysis with a 0–100% risk calculation.

## 🚨 Emergency Detection
Instant identification of critical medical conditions.

## 🩺 Care Recommendations
Guidance for:
- Emergency services
- Clinics
- Home care pathways

---

# 🌍 Advanced Features

## 🗣 Multilingual Support

Supports 10+ languages including:
- Hindi
- Bengali
- Arabic
- Swahili
- French
- Spanish

## 🎙 Voice Assistance

- Speech-to-Text input
- Text-to-Speech AI responses
- Voice-based accessibility

## 📈 Health Dashboard

Stores local patient assessment history for future reference.

---

# 🖥 Prototype Flow

The application follows a four-stage healthcare workflow:

1. Welcome & Onboarding  
2. Patient Profile Collection  
3. AI Symptom Conversation  
4. Emergency Assessment Dashboard  

---

# 📈 Scalability & Future Scope

Future enhancements include:

- 📱 Progressive Web App (PWA)
- ☁ Cloud deployment
- ⌚ Wearable device integration
- 🏥 Hospital Management System APIs
- 🧠 Offline AI using Gemini Nano

---

# 🔐 Security & Ethical Considerations

## Privacy

- No sensitive personal identification stored
- Secure local processing approach

## Safety

- AI acts only as an assistive triage layer
- No definitive diagnosis provided

## Bias Reduction

- Multilingual accessibility reduces healthcare inequality

---

# 🌟 Innovation & Uniqueness

CuraTriage stands out through its:

✅ Voice-first healthcare interaction  
✅ Rural accessibility focus  
✅ Multilingual AI triage  
✅ Real-time emergency prioritization  
✅ Lightweight and scalable deployment  

Unlike traditional triage systems, CuraTriage is designed specifically for accessibility and inclusivity.

---

# 🌍 Social Impact

CuraTriage contributes to:

- Reduced rural healthcare mortality
- Faster emergency response
- Improved healthcare accessibility
- Reduced unnecessary hospital burden
- Increased healthcare awareness

---

# ⚠ Challenges Faced

| Challenge | Solution |
|-----------|----------|
| AI Hallucination | Strict prompt engineering |
| Voice Accent Variations | Browser speech optimization |
| UI Simplicity | Minimal and accessible UX |

---

# ✅ Advantages of the System

- Instant AI-driven response
- Objective risk scoring
- Voice-enabled interaction
- Multilingual accessibility
- Persistent patient assessment history
- Reduced healthcare workload

---

# 🏁 Conclusion

CuraTriage demonstrates how modern AI technologies can bridge critical healthcare infrastructure gaps.

By functioning as a Preliminary AI Triage Layer, the system empowers patients with:
- Faster healthcare guidance
- Safer emergency decisions
- Accessible medical assistance
- Intelligent healthcare navigation

The project represents a scalable and impactful step toward democratizing healthcare accessibility using Artificial Intelligence.

---

# 🛠 Installation

```bash
git clone https://github.com/yourusername/curatriage.git

cd curatriage

npm install

npm run dev
# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/12302c4d-7206-4393-b467-23adbfe30eb7

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
