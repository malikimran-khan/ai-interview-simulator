import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  Sparkles, 
  History, 
  ChevronRight, 
  LucideLayoutTemplate,
  Star,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function ActualAnswer() {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [feedback, setFeedback] = useState([]);
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

  const handleGetFeedback = async (record) => {
    setLoading(true);
    setSelectedInterview(record);
    try {
      const res = await api.post('/interview/feedback', {
        records: record.responses,
      });
      setFeedback(res.data.feedbacks);
    } catch (err) {
      alert('Failed to generate expert feedback');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex-1 flex items-center justify-center bg-dark">
      <Star className="animate-spin text-secondary w-10 h-10" />
    </div>
  );

  return (
    <div className="flex-1 p-8 bg-dark overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight font-heading">
            Expert <span className="text-secondary italic">Insights</span>
          </h2>
          <p className="text-gray-400 font-body">Compare your responses against AI-curated exemplary standards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interview List (Left) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 flex items-center gap-2">
              <History size={12} /> Select Record
            </h3>
            <div className="space-y-3">
              {interviews.map((record) => (
                <motion.div
                  key={record._id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGetFeedback(record)}
                  className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                    selectedInterview?._id === record._id 
                    ? 'border-secondary bg-secondary/10 glow-green' 
                    : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-white text-sm">{record.jobTitle}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-500 font-mono">{new Date(record.createdAt).toLocaleDateString()}</span>
                    <LucideLayoutTemplate size={14} className={selectedInterview?._id === record._id ? 'text-secondary' : 'text-gray-600'} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Feedback View (Right) */}
          <div className="lg:col-span-8">
            {!selectedInterview ? (
              <div className="h-full flex flex-col items-center justify-center glass-card rounded-3xl p-12 border-dashed border-white/10 text-center space-y-4">
                <CheckSquare size={48} className="text-gray-700" />
                <p className="text-gray-500 font-body italic">"The key to perfection is continuous iteration." <br /> Choose a session to start reviewing.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="glass-card rounded-3xl p-6 border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center border border-secondary/20">
                      <Sparkles className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Exemplary Analysis</h4>
                      <p className="text-xs text-secondary font-mono">Expert Guidelines Enforced</p>
                    </div>
                  </div>
                  {loading && <div className="flex items-center gap-2 text-secondary font-bold text-xs"><Zap size={14} className="animate-pulse" /> GENERATING...</div>}
                </div>

                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-48 rounded-3xl bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {feedback.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card rounded-3xl p-8 border-white/5 space-y-8"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                            <CheckCircle2 size={12} /> Challenge {idx + 1}
                          </div>
                          <h4 className="text-lg font-bold text-white leading-tight">{item.question}</h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Expert Critique</div>
                              <div className="px-2 py-0.5 rounded bg-red-400/10 text-[9px] text-red-400 font-bold uppercase">Critical Analysis</div>
                            </div>
                            <div className="text-sm text-gray-300 font-body p-5 rounded-2xl bg-white/5 border border-white/5 h-full leading-relaxed">
                              {item.feedback.feedback}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="text-[10px] font-bold text-secondary uppercase tracking-widest">Expert Blueprint</div>
                              <div className="px-2 py-0.5 rounded bg-secondary/10 text-[9px] text-secondary font-bold uppercase">Optimized Answer</div>
                            </div>
                            <div className="text-sm text-white font-body p-5 rounded-2xl bg-secondary/5 border border-secondary/10 h-full italic leading-relaxed">
                              {item.feedback.improved}
                            </div>
                          </div>
                        </div>

                        {/* User's Original Answer (Collapsed) */}
                        <div className="pt-4 border-t border-white/5">
                          <details className="group">
                            <summary className="text-[10px] text-gray-500 hover:text-white cursor-pointer transition-colors list-none flex items-center gap-2">
                              <ChevronRight size={12} className="group-open:rotate-90 transition-transform" />
                              View Your Original Response
                            </summary>
                            <p className="mt-3 text-xs text-gray-500 italic bg-black/20 p-4 rounded-xl border border-white/5">
                              "{item.userAnswer}"
                            </p>
                          </details>
                        </div>
                      </motion.div>
                    ))}
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
