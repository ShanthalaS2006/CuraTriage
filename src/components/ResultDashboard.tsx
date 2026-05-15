import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  MapPin, 
  Phone, 
  RefreshCcw, 
  ArrowRight,
  ShieldAlert,
  Thermometer,
  Zap,
  Clock,
  Home
} from 'lucide-react';
import { TriageResult, TriageSeverity } from '../types';
import { cn } from '../lib/utils';

interface ResultDashboardProps {
  result: TriageResult;
  onReset: () => void;
}

export function ResultDashboard({ result, onReset }: ResultDashboardProps) {
  const getSeverityStyle = (severity: TriageSeverity) => {
    switch (severity) {
      case TriageSeverity.EMERGENCY:
        return "from-red-500 to-red-700 text-white border-red-200";
      case TriageSeverity.URGENT:
        return "from-amber-500 to-orange-600 text-white border-amber-200";
      case TriageSeverity.ROUTINE:
        return "from-blue-500 to-indigo-600 text-white border-blue-200";
      case TriageSeverity.HOME_CARE:
        return "from-emerald-500 to-teal-600 text-white border-emerald-200";
      default:
        return "from-slate-500 to-slate-700 text-white";
    }
  };

  const getSeverityIcon = (severity: TriageSeverity) => {
    switch (severity) {
      case TriageSeverity.EMERGENCY: return ShieldAlert;
      case TriageSeverity.URGENT: return AlertTriangle;
      case TriageSeverity.ROUTINE: return Clock;
      case TriageSeverity.HOME_CARE: return Home;
      default: return Info;
    }
  };

  const Icon = getSeverityIcon(result.severity);

  const handleFindCenters = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        window.open(`https://www.google.com/maps/search/health+center+hospital/@${latitude},${longitude},14z`, '_blank');
      }, () => {
        // Fallback if geolocation fails
        window.open(`https://www.google.com/maps/search/health+center+hospital+near+me`, '_blank');
      });
    } else {
      window.open(`https://www.google.com/maps/search/health+center+hospital+near+me`, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* Risk Summary Header */}
      <div className={cn(
        "rounded-3xl p-8 shadow-2xl bg-gradient-to-br relative overflow-hidden",
        getSeverityStyle(result.severity)
      )}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              Assessment Report
            </div>
            <h2 className="text-4xl font-black">{result.severity}</h2>
            <p className="text-white/80 max-w-md font-medium leading-relaxed">
              {result.suggestedCareLevel}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
             <span className="text-sm font-bold opacity-80 uppercase">Risk Level</span>
             <span className="text-5xl font-black">{result.riskScore}%</span>
          </div>
        </div>
        <Icon className="absolute -right-8 -bottom-8 w-64 h-64 opacity-10" />
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Symptom Analysis
            </h3>
            <div className="prose prose-slate prose-sm max-w-none">
               <ReactMarkdown>{result.analysis}</ReactMarkdown>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Recommended Care Pathway
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3 text-slate-700 text-sm italic">
                  <span className="bg-blue-50 text-blue-600 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i+1}
                  </span>
                  {rec}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          {/* Red Flags Card */}
          {result.redFlagsIdentified.length > 0 && (
            <section className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-3">Red Flags Detected</h3>
              <ul className="space-y-2">
                {result.redFlagsIdentified.map((flag, i) => (
                  <li key={i} className="flex items-center gap-2 text-red-800 text-xs font-bold bg-white/50 p-2 rounded-lg border border-red-100">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                    {flag}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Immediate Actions */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Right Now</h3>
            <div className="space-y-3">
              {result.immediateActions.map((action, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 border border-slate-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  {action}
                </div>
              ))}
            </div>
          </section>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
          >
            <RefreshCcw className="w-4 h-4" />
            New Assessment
          </button>
        </div>
      </div>

      <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="font-bold text-slate-900">Need Immediate Help?</div>
            <div className="text-slate-500 text-sm italic">Sharing your location can help us find clinics.</div>
          </div>
        </div>
        <button 
          onClick={handleFindCenters}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors"
        >
          Find Nearby Health Centers
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-400 py-4 italic">
        Disclaimer: This report is generated by CuraTriage AI. It is intended for informational triage only and does not constitute a formal medical diagnosis. If symptoms persist or worsen, contact clinical staff immediately.
      </p>
    </motion.div>
  );
}
