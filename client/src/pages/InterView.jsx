import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronRight
} from 'lucide-react';

export default function InterView() {
  const [session, setSession] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSession = JSON.parse(localStorage.getItem('interviewData'));
    const userId = localStorage.getItem('userId');

    if (
      savedSession &&
      savedSession.questions &&
      savedSession.questions.length > 0 &&
      userId
    ) {
      setSession({ ...savedSession, userId });
    } else {
      navigate('/choose-role');
    }
  }, [navigate]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    const updatedAnswers = [
      ...answers,
      {
        question: session.questions[currentQuestionIndex],
        answer: answer.trim(),
      },
    ];

    setAnswers(updatedAnswers);
    setAnswer('');

    const isLastQuestion = currentQuestionIndex === session.questions.length - 1;

    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setLoading(true);
      try {
        await api.post('/interview/save', {
          userId: session.userId,
          jobTitle: session.jobTitle,
          experience: session.experience,
          responses: updatedAnswers,
        });

        localStorage.removeItem('interviewData');
        navigate('/dashboard/user-record'); // Redirect to records
      } catch (err) {
        console.error(err);
        alert('Failed to save interview.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!session) return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center space-y-4">
      <Loader2 className="animate-spin text-primary w-12 h-12" />
      <p className="text-gray-400 animate-pulse font-mono tracking-widest">INITIALIZING NEURAL LINK...</p>
    </div>
  );

  const totalQuestions = session.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-dark py-12 px-6 flex flex-col items-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-3xl z-10 space-y-8">
        {/* Progress Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase">
              <Cpu size={16} className="animate-pulse" />
              <span>AI Training Chamber</span>
            </div>
            <span className="text-gray-500 font-mono">Module {currentQuestionIndex + 1} of {totalQuestions}</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-primary to-secondary glow-blue"
            />
          </div>
        </div>

        {/* Interview Terminal */}
        <div className="glass-card rounded-3xl border-white/10 overflow-hidden shadow-2xl">
          <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-secondary font-mono ml-4 tracking-tighter uppercase">{session.experience.split('-')[0]} ASSESSMENT</span>
            </div>
            <Terminal size={16} className="text-gray-500" />
          </div>

          <div className="p-8 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Cpu size={20} className="text-primary" />
              </div>
              <div className="space-y-4 flex-1">
                <div className="inline-block px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Transmission Sequence
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-xl sm:text-2xl text-white font-medium leading-relaxed font-heading"
                  >
                    {session.questions[currentQuestionIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <form onSubmit={handleSubmitAnswer} className="space-y-6 pt-4 border-t border-white/5">
              <div className="relative">
                <textarea
                  autoFocus
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white font-body focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none placeholder-gray-600"
                  placeholder="Sync your thoughts and respond here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <div className="absolute bottom-4 right-4 text-[10px] text-gray-600 font-mono">
                  Characters: {answer.length}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                  <AlertCircle size={12} />
                  <span>Real-time analysis active. Be precise and confident.</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading || !answer.trim()}
                  className="px-8 py-3.5 bg-primary text-white rounded-xl font-bold flex items-center gap-3 glow-blue disabled:opacity-30 disabled:grayscale transition-all"
                >
                  <span>{loading ? 'Transmitting...' : currentQuestionIndex === totalQuestions - 1 ? 'End Simulation' : 'Next Module'}</span>
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <ChevronRight size={18} />}
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-2xl border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <Terminal size={14} className="text-gray-400" />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-tighter">Target Role</div>
              <div className="text-sm text-white font-medium">{session.jobTitle}</div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <CheckCircle2 size={14} className="text-secondary" />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-tighter">Experience</div>
              <div className="text-sm text-white font-medium">{session.experience} Level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
