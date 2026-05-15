/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  UserCircle, 
  Activity, 
  ArrowRight, 
  AlertCircle,
  Clock,
  HeartPulse,
  Home,
  ShieldCheck,
  ChevronRight,
  History
} from 'lucide-react';
import { PatientProfile, TriageResult, TriageRecord } from './types';
import { SymptomChat } from './components/SymptomChat';
import { ResultDashboard } from './components/ResultDashboard';
import { ProfileForm } from './components/ProfileForm';
import { HistoryDashboard } from './components/HistoryDashboard';

type FlowStep = 'welcome' | 'profile' | 'chat' | 'result' | 'history';

export default function App() {
  const [step, setStep] = useState<FlowStep>('welcome');
  const [profile, setProfile] = useState<PatientProfile>({});
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [records, setRecords] = useState<TriageRecord[]>([]);

  // Load history from local storage
  useEffect(() => {
    const saved = localStorage.getItem('curatriage_history');
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const saveRecord = (result: TriageResult) => {
    const newRecord: TriageRecord = {
      ...result,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      patientInfo: profile
    };
    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem('curatriage_history', JSON.stringify(updated));
  };

  const startTriage = () => setStep('profile');

  const onProfileComplete = (data: PatientProfile) => {
    setProfile(data);
    setStep('chat');
  };

  const onTriageComplete = (result: TriageResult) => {
    setTriageResult(result);
    saveRecord(result);
    setStep('result');
  };

  const viewHistory = () => setStep('history');

  const clearHistory = () => {
    if (confirm("Are you sure you want to delete all history?")) {
      setRecords([]);
      localStorage.removeItem('curatriage_history');
    }
  };

  const reset = () => {
    setStep('welcome');
    setProfile({});
    setTriageResult(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={reset}
          >
            <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-blue-900 italic">CuraTriage</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
             <ShieldCheck className="w-4 h-4 text-emerald-500" />
             <span>AI Assisted</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center space-y-8 py-12"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-4 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse" />
                <img 
                  src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=800&auto=format&fit=crop"
                  alt="Medical Care"
                  referrerPolicy="no-referrer"
                  className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-3xl shadow-2xl border-4 border-white mx-auto transition-transform hover:scale-105 duration-500"
                />
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                  Intelligent Health Triage <br/>
                  <span className="text-blue-600">Right When You Need It.</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  CuraTriage uses advanced AI to help you assess your symptoms, identify risks, 
                  and find the appropriate level of care—instantly.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
                {[
                  { icon: Activity, label: "Symptom Analysis", desc: "NLP-driven insight" },
                  { icon: AlertCircle, label: "Risk Prediction", desc: "Severity scoring" },
                  { icon: Clock, label: "Fast Guidance", desc: "No waiting lines" },
                  { icon: HeartPulse, label: "Safe & Reliable", desc: "Emergency detection" }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <item.icon className="w-6 h-6 text-blue-500 mb-2" />
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs text-slate-400">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button
                  id="start-triage-btn"
                  onClick={startTriage}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition-all w-full md:w-auto"
                >
                  Begin Assessment
                  <ArrowRight className="w-5 h-5" />
                </button>

                {records.length > 0 && (
                  <button
                    onClick={viewHistory}
                    className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:shadow-lg transition-all w-full md:w-auto"
                  >
                    <History className="w-5 h-5 text-blue-600" />
                    Past Records ({records.length})
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                * CuraTriage is an assessment tool, not a diagnosis. 
                Always seek professional medical advice for critical conditions.
              </p>
            </motion.div>
          )}

          {step === 'profile' && (
            <ProfileForm 
              key="profile" 
              onComplete={onProfileComplete} 
              onBack={() => setStep('welcome')}
            />
          )}

          {step === 'chat' && (
            <SymptomChat 
              key="chat" 
              profile={profile} 
              onComplete={onTriageComplete}
              onBack={() => setStep('profile')}
            />
          )}

          {step === 'result' && triageResult && (
            <ResultDashboard 
              key="result" 
              result={triageResult} 
              profile={profile}
              onReset={reset}
            />
          )}

          {step === 'history' && (
            <HistoryDashboard
              key="history"
              history={records}
              onBack={reset}
              onSelect={(record) => {
                setProfile(record.patientInfo);
                setTriageResult(record);
                setStep('result');
              }}
              onClear={clearHistory}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-12 py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 opacity-50">
            <Stethoscope className="w-4 h-4" />
            <span className="font-bold lowercase italic text-sm">CuraTriage</span>
          </div>
          <p className="text-xs text-slate-400">
            Assisting underserved communities through intelligent healthcare accessibility.
            <br/>
            © 2026 CuraTriage AI Systems.
          </p>
        </div>
      </footer>
    </div>
  );
}
