import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, CreditCard, Save, Camera, Sparkles } from 'lucide-react';

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    address: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const res = await api.get(`/auth/profile/${userId}`);
          setProfile(res.data);
        } catch (err) {
          console.error('Failed to fetch profile:', err);
        } finally {
          setFetching(false);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem('userId');
    try {
      await api.put(`/auth/profile/${userId}`, profile);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex-1 flex items-center justify-center bg-dark">
      <div className="flex flex-col items-center space-y-4">
        <Sparkles className="animate-spin text-primary w-8 h-8" />
        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Retrieving Profile...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-8 bg-dark overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight font-heading">
              Personal <span className="text-primary italic">Identity</span>
            </h2>
            <p className="text-gray-400 font-body">Manage your profile and contact information</p>
          </div>
          <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 glow-blue">
            <Sparkles size={14} />
            Level 1 Candidate
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center space-y-6 border-white/5">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-blue-600 p-1 glow-blue animate-pulse-slow">
                  <div className="w-full h-full rounded-full bg-dark flex items-center justify-center overflow-hidden">
                    {profile.image ? (
                      <img src={profile.image} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={48} className="text-gray-600" />
                    )}
                  </div>
                </div>
                <button className="absolute bottom-1 right-1 p-2 bg-secondary text-dark rounded-full glow-green hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                <p className="text-gray-500 text-sm">{profile.email}</p>
              </div>

              <div className="w-full pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-primary font-bold text-lg">12</div>
                  <div className="text-[10px] text-gray-500 uppercase">Sims</div>
                </div>
                <div className="text-center">
                  <div className="text-secondary font-bold text-lg">84%</div>
                  <div className="text-[10px] text-gray-500 uppercase">Avg Score</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleUpdate} className="glass-card rounded-3xl p-8 space-y-6 border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={16} />
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none text-white transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={16} />
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none text-white transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Identity (CNIC)</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={16} />
                    <input
                      type="text"
                      name="cnic"
                      value={profile.cnic}
                      onChange={handleChange}
                      placeholder="00000-0000000-0"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none text-white transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Mailing Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-4 text-gray-600 group-focus-within:text-primary transition-colors" size={16} />
                    <textarea
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none text-white transition-all text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  type="submit"
                  className="px-8 py-3 bg-secondary text-dark rounded-xl font-bold flex items-center gap-2 glow-green hover:brightness-110 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Save size={18} />
                  <span>{loading ? 'Saving...' : 'Sync Changes'}</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
