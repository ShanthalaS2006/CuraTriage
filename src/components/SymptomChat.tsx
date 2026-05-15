import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, Info, ChevronLeft, Activity } from 'lucide-react';
import { ChatMessage, PatientProfile, TriageResult } from '../types';
import { generateFollowUpQuestion, analyzeSymptoms } from '../services/gemini';
import { cn } from '../lib/utils';

interface SymptomChatProps {
  profile: PatientProfile;
  onComplete: (result: TriageResult) => void;
  onBack: () => void;
}

export function SymptomChat({ profile, onComplete, onBack }: SymptomChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: `Hello. I'm CuraTriage AI. Tell me, what symptoms are you experiencing today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe how you feel..."
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
