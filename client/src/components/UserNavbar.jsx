import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Cpu, LogOut, LayoutDashboard, History, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 w-full px-6 py-4 z-50 pointer-events-none">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="max-w-6xl mx-auto glass-card rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl px-6 py-3 flex items-center justify-between pointer-events-auto"
      >
        {/* Left Side: Logo */}
        <Link to="/" className="flex items-center space-x-3 group relative overflow-hidden">
          <div className="p-2 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-all duration-300 glow-blue">
            <Cpu className="text-primary w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-lg md:text-xl font-bold tracking-tight leading-none group-hover:tracking-wide transition-all duration-500">
              AI INTERVIEW
            </h1>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] leading-none mt-1">
              Neural <span className="text-secondary">Engine</span>
            </span>
          </div>
        </Link>

        {/* Right Side: Navigation */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {token ? (
            <>
              {/* Dashboard Short Link (Hidden on small mobile) */}
              <Link to="/dashboard" className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
                <LayoutDashboard size={16} />
                OVERVIEW
              </Link>
              
              <div className="h-6 w-px bg-white/5 hidden md:block" />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard/user-profile')}
                className="flex items-center gap-2.5 px-3 md:px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/5 transition-all group"
              >
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary/30 transition-colors">
                  <User size={14} className="text-secondary" />
                </div>
                <span className="text-xs font-bold hidden sm:inline">IDENTITY</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="p-2.5 text-gray-500 hover:text-red-400 transition-colors"
                title="Disconnect"
              >
                <LogOut size={20} />
              </motion.button>
            </>
          ) : (
            <div className="flex items-center space-x-2 md:space-x-4 font-bold text-xs uppercase tracking-widest">
              <Link 
                to="/login" 
                className="px-4 py-3 text-gray-400 hover:text-white transition-all border border-transparent hover:border-white/5 rounded-xl"
              >
                Access
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-3 bg-secondary text-dark rounded-xl glow-green hover:brightness-110 transition-all flex items-center gap-2"
              >
                <Sparkles size={14} />
                Enroll
              </Link>
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  );
}
