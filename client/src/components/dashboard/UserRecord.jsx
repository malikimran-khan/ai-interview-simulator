import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { 
  History, 
  Calendar, 
  ChevronRight, 
  Briefcase, 
  Trophy,
  Search,
  ArrowUpRight,
  Zap
} from 'lucide-react';

export default function UserRecord() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const res = await api.get(`/interview/${userId}`);
          setRecords(res.data);
        } catch (err) {
          console.error('Failed to fetch records:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRecords();
  }, []);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-dark">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex-1 p-8 bg-dark overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight font-heading">
              Interview <span className="text-primary italic">Chronicles</span>
            </h2>
            <p className="text-gray-400 font-body">Review your past performance and growth trajectory</p>
          </div>

          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by job title..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none text-white transition-all text-sm"
            />
          </div>
        </div>

        {records.length === 0 ? (
          <div className="glass-card rounded-3xl p-20 text-center border-dashed border-white/10">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <History size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Records Detected</h3>
            <p className="text-gray-500 max-w-sm mx-auto">You haven't completed any interview sessions yet. Start your first session to see your records here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {records.map((record, index) => (
              <motion.div
                key={record._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group glass-card rounded-3xl p-6 border-white/5 hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="text-primary" size={20} />
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:glow-blue transition-all">
                    <Briefcase size={28} className="text-primary" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white leading-tight">{record.jobTitle}</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-bold text-gray-400 uppercase tracking-widest border border-white/5">
                          {record.experience} LEVEL
                        </span>
                        <span className="px-2 py-0.5 rounded bg-secondary/10 text-[9px] font-bold text-secondary uppercase tracking-widest border border-secondary/10">
                          COMPLETED
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-gray-500 font-body">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-gray-600" />
                        {new Date(record.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Trophy size={12} className="text-secondary" />
                        {record.responses?.length || 0} Questions Answered
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="hidden lg:flex gap-8">
                      <div className="text-center">
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mb-1">Depth</div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-primary' : 'bg-white/10'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mb-1">Status</div>
                        <div className="text-secondary font-bold text-sm">Analyzed</div>
                      </div>
                    </div>
                    
                    <motion.button 
                      whileHover={{ x: 3 }}
                      className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/20 text-gray-500 group-hover:text-primary transition-all border border-white/5 group-hover:border-primary/20"
                    >
                      <ChevronRight size={20} />
                    </motion.button>
                  </div>
                </div>

                {/* Quick Info Bar */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                  <div className="flex items-center gap-4">
                    <span>ID: {record._id.substring(record._id.length - 8).toUpperCase()}</span>
                    <span className="text-white/10">|</span>
                    <span>ENGINE: GPT-4-TURBO</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary/60">
                    <Zap size={10} />
                    <span>AI INSIGHTS READY</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
