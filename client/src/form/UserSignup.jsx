import React, { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match');
    }
    
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', formData);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
      
      alert('Signup successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 relative overflow-hidden bg-dark">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -ml-48" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg z-10"
      >
        <div className="glass-card p-10 rounded-3xl space-y-8 border-white/10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight font-heading">
              Join the <span className="text-secondary italic">Future</span>
            </h2>
            <p className="text-gray-400 font-body">Create your AI coaching account today</p>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-5" onSubmit={handleSubmit}>
            <div className="sm:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 transition-all outline-none text-white font-body"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 transition-all outline-none text-white font-body"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 transition-all outline-none text-white font-body"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Confirm</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 transition-all outline-none text-white font-body"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="sm:col-span-2 w-full py-4 mt-2 bg-secondary text-dark rounded-2xl font-bold flex items-center justify-center space-x-2 glow-green hover:brightness-110 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Creating...' : 'Start My Journey'}</span>
              {!loading && <UserPlus size={18} />}
            </motion.button>
          </form>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Already a member?{' '}
              <Link to="/login" className="text-secondary font-semibold hover:underline flex items-center justify-center mt-1 group">
                Secure Login <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
