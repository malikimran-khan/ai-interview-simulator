import React, { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Code2, 
  Database, 
  Globe, 
  Settings, 
  Terminal,
  Zap,
  Cpu,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ROLES = [
  { id: 'frontend', title: 'Frontend Developer', icon: Globe, color: 'text-blue-400' },
  { id: 'backend', title: 'Backend Developer', icon: Terminal, color: 'text-purple-400' },
  { id: 'fullstack', title: 'Full Stack Developer', icon: Code2, color: 'text-emerald-400' },
  { id: 'devops', title: 'DevOps Engineer', icon: Settings, color: 'text-orange-400' },
  { id: 'datascientist', title: 'Data Scientist', icon: BarChart3, color: 'text-indigo-400' },
  { id: 'mobile', title: 'Mobile Developer', icon: Database, color: 'text-rose-400' },
];

export default function ChooseRole() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('Entry-Level');
  const [questionCount, setQuestionCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!selectedRole) return alert('Please select a job role first');
    
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }

      const res = await api.post('/interview/start', {
        jobTitle: selectedRole,
        experience: selectedLevel,
        userId: userId,
        questionCount: questionCount
      });

      localStorage.setItem('interviewData', JSON.stringify(res.data));
      navigate('/interview');
    } catch (err) {
      console.error(err);
      alert('Failed to initialize AI session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark py-16 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -ml-64 -mt-64" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -mr-64 -mb-64" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading"
          >
            Initialize Your <span className="text-primary italic">Simulation</span>
          </motion.h2>
          <p className="text-gray-400 font-body max-w-xl mx-auto italic">"The best way to predict the future is to create it." Select your path below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls (Left) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Star size={14} className="text-primary" /> Select Experience
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {['Entry-Level', 'Mid-Level', 'Senior-Level'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                        selectedLevel === lvl 
                        ? 'bg-primary/20 border-primary text-primary glow-blue' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} className="text-secondary" /> Session Length
                </label>
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                  {[3, 5, 10].map((count) => (
                    <button
                      key={count}
                      onClick={() => setQuestionCount(count)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        questionCount === count 
                        ? 'bg-secondary text-dark shadow-lg' 
                        : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {count} Qs
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 italic px-1">
                  {questionCount === 3 ? "Quick check-up. Focus on core basics." : 
                   questionCount === 5 ? "Vigorous assessment. Deep technical dive." : 
                   "Full simulation. Technical, coding, and behavioral."}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading || !selectedRole}
              onClick={handleStart}
              className="w-full py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 glow-blue hover:bg-blue-600 transition-all disabled:opacity-50 disabled:grayscale"
            >
              {loading ? (
                <>
                  <Cpu className="animate-spin" size={20} />
                  <span>INITIALIZING AI...</span>
                </>
              ) : (
                <>
                  <Zap size={20} />
                  <span>LAUNCH SIMULATION</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Role Selection (Right) */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xl font-semibold text-white/90 ml-2 border-l-4 border-primary pl-3">Job Role</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.title;
                return (
                  <motion.div
                    key={role.id}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole(role.title)}
                    className={`cursor-pointer p-6 rounded-2xl glass-card transition-all flex flex-col items-center justify-center text-center space-y-4 border-2 ${
                      isSelected ? 'border-primary bg-primary/10 glow-blue' : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`p-3 rounded-xl bg-white/5 ${role.color}`}>
                      <Icon size={28} />
                    </div>
                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                      {role.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
