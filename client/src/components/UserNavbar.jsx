import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Cpu, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleProfileClick = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/dashboard/user-profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 w-full glass px-6 py-4 flex items-center justify-between shadow-2xl"
    >
      <Link to="/" className="flex items-center space-x-3 group active:scale-95 transition-transform">
        <div className="p-2 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors glow-blue">
          <Cpu className="text-primary w-6 h-6 animate-pulse" />
        </div>
        <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
          AI Interview <span className="text-primary">Simulator</span>
        </h1>
      </Link>

      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProfileClick}
              className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-xl glass-card hover:bg-white/10 transition-colors border-white/5"
            >
              <User size={18} className="text-secondary" />
              <span className="hidden sm:inline">Profile</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-2 text-red-400 hover:text-red-300 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </motion.button>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <Link to="/login" className="px-4 py-2 text-white font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2 bg-primary text-white font-semibold rounded-xl hover:bg-blue-600 transition-all glow-blue">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
