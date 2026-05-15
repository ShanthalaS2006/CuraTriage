/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum TriageSeverity {
  EMERGENCY = 'EMERGENCY',
  URGENT = 'URGENT',
  ROUTINE = 'ROUTINE',
  HOME_CARE = 'HOME_CARE'
}

export interface TriageResult {
  severity: TriageSeverity;
  riskScore: number; // 0-100
  analysis: string;
  recommendations: string[];
  redFlagsIdentified: string[];
  suggestedCareLevel: string;
  immediateActions: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface PatientProfile {
  age?: number;
  gender?: string;
  history?: string;
  preferredLanguage?: string;
}

export interface TriageRecord extends TriageResult {
  id: string;
  timestamp: number;
  patientInfo: PatientProfile;
}
