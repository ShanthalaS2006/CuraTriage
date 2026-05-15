import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, Info, ChevronLeft, Activity, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { ChatMessage, PatientProfile, TriageResult } from '../types';
import { generateFollowUpQuestion, analyzeSymptoms } from '../services/gemini';
import { cn } from '../lib/utils';
import { LANG_CODES } from '../constants';

// Voice Recognition Types (Browser API)
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SymptomChatProps {
  profile: PatientProfile;
  onComplete: (result: TriageResult) => void;
  onBack: () => void;
}

const GREETINGS: Record<string, string> = {
  "English": "Hello. I'm CuraTriage AI. Tell me, what symptoms are you experiencing today?",
  "Hindi": "नमस्ते। मैं क्यूराट्राएज एआई हूं। मुझे बताएं, आज आप किन लक्षणों का अनुभव कर रहे हैं?",
  "Spanish": "Hola. Soy CuraTriage AI. Dígame, ¿qué síntomas está experimentando hoy?",
  "French": "Bonjour. Je suis l'IA CuraTriage. Dites-moi, quels symptômes ressentez-vous aujourd'hui ?",
  "Arabic": "مرحباً. أنا CuraTriage AI. أخبرني ، ما هي الأعراض التي تعاني منها اليوم؟",
  "Bengali": "হ্যালো। আমি কুরাট্রেজ এআই। বলুন, আজ আপনি কী কী উপসর্গ অনুভব করছেন?",
  "Portuguese": "Olá. Eu sou a CuraTriage AI. Diga-me, quais sintomas você está sentindo hoje?",
  "Russian": "Здравствуйте. Я CuraTriage AI. Скажите, какие симптомы вы испытываете сегодня?",
  "Urdu": "ہیلو۔ میں CuraTriage AI ہوں۔ مجھے بتائیں ، آج آپ کن علامات کا سامنا کر رہے ہیں؟",
  "Swahili": "Habari. Mimi ni CuraTriage AI. Niambie, ni dalili gani unazopata leo?"
};

export function SymptomChat({ profile, onComplete, onBack }: SymptomChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: GREETINGS[profile.preferredLanguage || 'English'] || GREETINGS["English"] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Voice Recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = LANG_CODES[profile.preferredLanguage || "English"] || "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [profile.preferredLanguage]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInput('');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Speech recognition already started or failed", e);
        setIsListening(false);
      }
    }
  };

  const speak = (text: string, index: number) => {
    if (isSpeaking === index) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_CODES[profile.preferredLanguage || "English"] || "en-US";
    
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);
    setIsSpeaking(index);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const assistantResponse = await generateFollowUpQuestion(newMessages, profile);
      
      if (assistantResponse.includes("assessment")) {
        // AI signaling it has enough info
        const result = await analyzeSymptoms(newMessages, profile);
        onComplete(result);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: assistantResponse }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: 'assistant', content: "I encounterd an issue. Let's try to complete the assessment with what we have." }]);
      const result = await analyzeSymptoms(newMessages, profile);
      onComplete(result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForceComplete = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeSymptoms(messages, profile);
      onComplete(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto flex flex-col h-[600px] bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="font-bold text-slate-700">Triage Intelligence</span>
        </div>
        <button 
          onClick={handleForceComplete}
          disabled={messages.length < 2 || isLoading}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50"
        >
          Finish Now
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex flex-col max-w-[85%]",
              msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              {msg.role === 'assistant' && (
                <button 
                  onClick={() => speak(msg.content, i)}
                  className={cn(
                    "p-1.5 rounded-full transition-colors",
                    isSpeaking === i ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400 hover:text-blue-500"
                  )}
                >
                  {isSpeaking === i ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>
              )}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
              msg.role === 'user' 
                ? "bg-blue-600 text-white rounded-tr-none" 
                : "bg-slate-100 text-slate-800 rounded-tl-none"
            )}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 p-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs font-medium italic">Analyzing symptoms...</span>
          </div>
        )}
      </div>

      {/* Guidance */}
      <div className="px-6 py-2 bg-amber-50 border-y border-amber-100 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-600" />
        <span className="text-[10px] text-amber-800 font-medium">Please describe your symptoms in detail (duration, location, severity).</span>
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-50/50">
        <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-inner focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <button
            onClick={toggleListening}
            className={cn(
              "p-3 rounded-xl transition-all",
              isListening ? "bg-red-500 text-white animate-pulse" : "bg-slate-50 text-slate-400 hover:text-blue-500"
            )}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? "Listening..." : "Describe how you feel..."}
            className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
