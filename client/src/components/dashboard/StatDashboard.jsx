import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Award, 
  Activity,
  History,
  ArrowUpRight,
  BrainCircuit,
  PieChart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StatDashboard() {
  const [stats, setStats] = useState({
    totalInterviews: 0,
    avgAccuracy: 78,
    topRole: 'N/A',
    weakestArea: 'System Architecture',
  });
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const res = await api.get(`/interview/${userId}`);
          const interviews = res.data;
          setRecentInterviews(interviews.slice(0, 3));
          setStats(prev => ({
            ...prev,
            totalInterviews: interviews.length,
            topRole: interviews[0]?.jobTitle || 'N/A'
          }));
        } catch (err) {
          console.error('Failed to fetch stats:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-dark">
      <BrainCircuit className="animate-spin text-primary w-10 h-10" />
    </div>
  );

  return (
    <div className="flex-1 p-8 bg-dark overflow-y-auto space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight font-heading">
            Neural <span className="text-primary italic">Overview</span>
          </h2>
          <p className="text-gray-400 font-body">Real-time analysis of your professional trajectory</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/choose-role" 
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 glow-blue hover:brightness-110 transition-all"
          >
            <Zap size={18} />
            Initialize Sim
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Simulations', value: stats.totalInterviews, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Avg. Accuracy', value: `${stats.avgAccuracy}%`, icon: Target, color: 'text-secondary', bg: 'bg-secondary/10' },
          { label: 'Peak Performance', value: stats.topRole, icon: Award, color: 'text-purple-400', bg: 'bg-purple-400/10' },
          { label: 'Success Rate', value: '92%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl border-white/5 space-y-4"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{stat.label}</div>
              <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <History size={20} className="text-primary" />
              Recent Attempts
            </h3>
            <Link to="/dashboard/user-record" className="text-xs text-primary font-bold hover:underline flex items-center gap-1 uppercase tracking-widest">
              View All <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="space-y-4">
            {recentInterviews.length === 0 ? (
              <div className="glass-card p-12 rounded-3xl border-dashed border-white/5 text-center text-gray-500">
                No simulations recorded yet. Launch your first one today.
              </div>
            ) : (
              recentInterviews.map((record, i) => (
                <Link 
                  to="/dashboard/user-record" 
                  key={record._id}
                  className="block group"
                >
                  <div className="glass-card p-6 rounded-2xl border-white/5 group-hover:border-primary/20 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:glow-blue">
                        <BrainCircuit size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-white leading-tight">{record.jobTitle}</div>
                        <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">{new Date(record.createdAt).toLocaleDateString()} • {record.experience}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-gray-400 uppercase font-bold">Insights</div>
                        <div className="text-secondary font-bold text-xs">Ready</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 text-gray-500 group-hover:text-primary transition-colors">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Skill Composition (Right) */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xl font-bold text-white px-2 flex items-center gap-2">
            <PieChart size={20} className="text-secondary" />
            Neural Pulse
          </h3>
          <div className="glass-card p-8 rounded-3xl border-white/5 space-y-8">
            <div className="space-y-6">
              {[
                { label: 'Technical Accuracy', percent: 85, color: 'bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]' },
                { label: 'Conciseness', percent: 62, color: 'bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.5)]' },
                { label: 'System Logic', percent: 78, color: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' },
                { label: 'Soft Skills', percent: 91, color: 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' },
              ].map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">{skill.label}</span>
                    <span className="text-white font-bold">{skill.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percent}%` }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                      className={`h-full ${skill.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-white/5">
              <div className="text-[10px] text-gray-500 uppercase font-bold mb-3 tracking-widest text-center">Primary Focus Area</div>
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                <span className="text-sm font-bold text-white">{stats.weakestArea}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
