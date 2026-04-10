import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideBar from './SideBar';
import UserProfile from './UserProfile';
import UserRecord from './UserRecord';
import WeakAreas from './WeakAreas';
import StatDashboard from './StatDashboard';
import ActualAnswer from './ActualAnswer';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashBoard() {
  return (
    <div className="flex bg-dark min-h-screen text-white font-body selection:bg-primary/30">
      {/* Fixed Sidebar */}
      <SideBar />

      {/* Dynamic Content Area */}
      <main className="flex-1 min-h-screen flex flex-col relative">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <Routes>
              <Route path="stat-dashboard" element={<StatDashboard />} />
              <Route path="user-profile" element={<UserProfile />} />
              <Route path="user-record" element={<UserRecord />} />
              <Route path="weak-areas" element={<WeakAreas />} />
              <Route path="actual-answer" element={<ActualAnswer />} />
              <Route index element={<StatDashboard />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
