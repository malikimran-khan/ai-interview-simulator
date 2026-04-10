import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { 
  Target, 
  Search, 
  AlertCircle, 
  TrendingDown, 
  Zap,
  ChevronRight,
  BrainCircuit,
  History
} from 'lucide-react';

export default function WeakAreas() {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const res = await api.get(`/interview/${userId}`);
          setInterviews(res.data);
        } catch (err) {
          console.error('Failed to fetch interviews:', err);
        } finally {
          setFetching(false);
        }
      }
    };
    fetchInterviews();
  }, []);

  const handleGetWeakAreas = async (record) => {
    setLoading(true);
    setSelectedInterview(record);
    try {
      const res = await api.post('/interview/weak-areas', {
        records: record.responses,
      });
      setWeakAreas(res.data.weakAreasList);
    } catch (err) {
      alert('Failed to analyze weak areas');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex-1 flex items-center justify-center bg-dark">
      <div className="flex flex-col items-center space-y-4">
        <BrainCircuit className="animate-pulse text-primary w-10 h-10" />
        <p className="text-gray-500 font-mono text-xs">CALIBRATING ANALYSIS ENGINE...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-8 bg-dark overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight font-heading">
            Skill <span className="text-red-400 italic">Diagnostic</span>
          </h2>
          <p className="text-gray-400 font-body">Identify technical gaps and focus areas for improvement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interview List (Left) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2 flex items-center gap-2">
              <History size={14} /> Select Session
            </h3>
            <div className="space-y-3">
              {interviews.length === 0 ? (
                <div className="glass-card p-6 rounded-2xl text-center border-dashed border-white/5 text-gray-500 text-sm">
                  Complete an interview first to see analysis.
                </div>
              ) : (
                interviews.map((record) => (
                  <motion.div
                    key={record._id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGetWeakAreas(record)}
                    className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                      selectedInterview?._id === record._id 
                      ? 'border-primary bg-primary/10 glow-blue' 
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold text-white text-sm">{record.jobTitle}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-500 uppercase">{record.experience} level</span>
                      <ChevronRight size={14} className={selectedInterview?._id === record._id ? 'text-primary' : 'text-gray-600'} />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Analysis View (Right) */}
          <div className="lg:col-span-8">
            {!selectedInterview ? (
              <div className="h-full flex flex-col items-center justify-center glass-card rounded-3xl p-12 border-dashed border-white/10 text-center space-y-4">
                <Target size={48} className="text-gray-700" />
                <p className="text-gray-500 font-body">Choose an interview session from the left <br /> to launch the AI diagnostic.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="glass-card rounded-3xl p-6 border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-400/10 rounded-xl flex items-center justify-center border border-red-400/20">
                      <TrendingDown className="text-red-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Diagnostic Report</h4>
                      <p className="text-xs text-gray-500">{selectedInterview.jobTitle} Simulation</p>
                    </div>
                  </div>
                  {loading && <div className="flex items-center gap-2 text-primary font-bold text-xs"><Zap size={14} className="animate-bounce" /> ANALYZING...</div>}
                </div>

                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-40 rounded-3xl bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {weakAreas.map((item, idx) => {
                      const gaps = item.weakAreas?.split('Action Points:')[0]?.replace('Gaps:', '').trim();
                      const actions = item.weakAreas?.split('Action Points:')[1]?.trim();

                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="glass-card rounded-3xl p-8 border-white/5 space-y-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-[10px] font-bold text-gray-500">
                              Q{idx + 1}
                            </div>
                            <div className="text-lg font-medium text-white/90 leading-snug">
                              {item.question}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-red-400/5 border border-red-400/10 space-y-3">
                              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-widest">
                                <TrendingDown size={14} />
                                Identified Gaps
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed font-body">
                                {gaps || "No significant gaps identified."}
                              </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                                <Zap size={14} />
                                Action Plan
                              </div>
                              <div className="text-gray-300 text-sm leading-relaxed font-body whitespace-pre-line">
                                {actions || "Maintain current level of detail."}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
