import { useState } from 'react';
import { motion } from 'motion/react';
import { UserCircle, ShieldCheck, ChevronLeft, ArrowRight } from 'lucide-react';
import { PatientProfile } from '../types';
import { cn } from '../lib/utils';

interface ProfileFormProps {
  onComplete: (data: PatientProfile) => void;
  onBack: () => void;
}

export function ProfileForm({ onComplete, onBack }: ProfileFormProps) {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [history, setHistory] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      age: parseInt(age) || undefined,
      gender,
      history
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-xl mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 px-8 py-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <UserCircle className="w-6 h-6" />
              Patient Profile
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Help us understand your context for a more accurate assessment.
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
             <UserCircle className="w-32 h-32" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Years"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other / Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">
              Medical History (Optional)
            </label>
            <textarea
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              placeholder="e.g., Diabetes, Hypertension, recent surgeries, or allergies..."
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-xs text-blue-800 leading-relaxed">
              Your data is processed securely by our AI to provide guidance. We do not store sensitive identifiers.
            </p>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-4 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="submit"
              className="flex-[2] bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              Continue to Symptoms
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
