import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  History as HistoryIcon, 
  Calendar, 
  User, 
  AlertCircle,
  Archive,
  ArrowUpRight
} from 'lucide-react';
import { TriageRecord, TriageSeverity } from '../types';
import { cn } from '../lib/utils';

interface HistoryDashboardProps {
  history: TriageRecord[];
  onBack: () => void;
  onSelect: (record: TriageRecord) => void;
  onClear: () => void;
}

export function HistoryDashboard({ history, onBack, onSelect, onClear }: HistoryDashboardProps) {
  const getSeverityColor = (severity: TriageSeverity) => {
    switch (severity) {
      case TriageSeverity.EMERGENCY: return "bg-red-100 text-red-700 border-red-200";
      case TriageSeverity.URGENT: return "bg-amber-100 text-amber-700 border-amber-200";
      case TriageSeverity.ROUTINE: return "bg-blue-100 text-blue-700 border-blue-200";
      case TriageSeverity.HOME_CARE: return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-slate-200"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex items-center gap-2">
          <HistoryIcon className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">Triage History</h2>
        </div>
        <button 
          onClick={onClear}
          className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1"
        >
          <Archive className="w-3 h-3" />
          Clear all
        </button>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <HistoryIcon className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">No previous records</h3>
          <p className="text-sm text-slate-400">Complete your first assessment to see it here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.sort((a, b) => b.timestamp - a.timestamp).map((record) => (
            <motion.div
              layoutId={record.id}
              key={record.id}
              onClick={() => onSelect(record)}
              className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border",
                      getSeverityColor(record.severity)
                    )}>
                      {record.severity}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(record.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {record.analysis.split('.')[0]}
                  </h4>
                  <div className="flex items-center gap-4 text-[10px] font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {record.patientInfo.age}yr {record.patientInfo.gender}
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Risk: {record.riskScore}%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
