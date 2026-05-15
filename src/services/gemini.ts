import { GoogleGenAI, Type } from "@google/genai";
import { TriageResult, ChatMessage, PatientProfile, TriageSeverity } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const TRIAGE_SYSTEM_INSTRUCTION = `You are CuraTriage AI, a professional medical triage assistant. 
Your goal is to help patients in underserved areas receive preliminary medical guidance.

PRINCIPLES:
1. SAFETY FIRST: Always check for emergency symptoms (red flags) like chest pain, difficulty breathing, severe bleeding, or altered consciousness.
2. EMPATHY: Use professional yet reassuring and empathetic language.
3. CLEAR GUIDANCE: Provide actionable steps, not just information.
4. NON-DIAGNOSTIC: Remind users that you are an AI, not a human doctor, and this is a triage tool, not a definitive diagnosis.

TRIAGE CATEGORIES:
- EMERGENCY: Immediate life-threatening conditions. Advice: "Go to the nearest ER immediately" or "Call emergency services".
- URGENT: Non-life-threatening but needs quick attention (within 24 hours).
- ROUTINE: Needs a doctor's visit but can wait for an appointment.
- HOME_CARE: Likely manageable with rest/OTC medications, but monitoring is required.

When the user provides symptoms, analyze them thoroughly. Identify red flags.`;

export async function analyzeSymptoms(
  messages: ChatMessage[],
  profile: PatientProfile
): Promise<TriageResult> {
  const model = "gemini-3-flash-preview";
  
  const historyString = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
  const profileString = `Patient: ${profile.age || 'Unknown'}yo ${profile.gender || 'Unknown'}. History: ${profile.history || 'None'}`;

  const prompt = `
    Analyze the following patient interaction and provide a structured triage report.
    ${profileString}
    
    CONVERSATION:
    ${historyString}
    
    Return a detailed JSON object matching the TriageResult schema.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: TRIAGE_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          severity: {
            type: Type.STRING,
            enum: Object.values(TriageSeverity),
            description: "Categorized severity level"
          },
          riskScore: {
            type: Type.NUMBER,
            description: "Risk score from 0 to 100"
          },
          analysis: {
            type: Type.STRING,
            description: "Brief medical reasoning for the triage level"
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of next steps for the patient"
          },
          redFlagsIdentified: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Any dangerous symptoms detected"
          },
          suggestedCareLevel: {
            type: Type.STRING,
            description: "Textual description of where to go (ER, Clinic, Home, etc.)"
          },
          immediateActions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "What to do right now (e.g., Sit down, don't eat, call ambulance)"
          }
        },
        required: ["severity", "riskScore", "analysis", "recommendations", "redFlagsIdentified", "suggestedCareLevel", "immediateActions"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse triage result", e);
    throw new Error("Could not complete triage analysis.");
  }
}

export async function generateFollowUpQuestion(
  messages: ChatMessage[],
  profile: PatientProfile
): Promise<string> {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: messages.map(m => ({ role: m.role as any, parts: [{ text: m.content }] })),
    config: {
      systemInstruction: `${TRIAGE_SYSTEM_INSTRUCTION}\nBased on the user's symptoms, ask precisely ONE focused follow-up question to better assess their risk. Check for duration, intensity, or specific complicating factors. Be concise and professional. If you have enough info to triage, say 'I have enough information to perform an assessment.'`
    }
  });

  return response.text?.trim() || "Can you tell me more about your symptoms?";
}
