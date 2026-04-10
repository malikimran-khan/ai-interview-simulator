import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  User, 
  History, 
  Target, 
  CheckSquare, 
  Home, 
  LogOut,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
  { path: '/dashboard/stat-dashboard', label: 'Neural Pulse', icon: LayoutDashboard },
  { path: '/dashboard/user-profile', label: 'My Identity', icon: User },
  { path: '/dashboard/user-record', label: 'Interview History', icon: History },
  { path: '/dashboard/weak-areas', label: 'Skill Analysis', icon: Target },
  { path: '/dashboard/actual-answer', label: 'Expert Blueprint', icon: CheckSquare },
  { path: '/', label: 'Launch Module', icon: Home, end: true },
];

export default function SideBar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <aside className="w-72 h-screen glass border-r border-white/10 flex flex-col p-6 sticky top-0">
      <div className="flex items-center space-x-3 mb-12 px-2">
        <div className="p-2 bg-primary/20 rounded-xl glow-blue">
          <LayoutDashboard className="text-primary w-6 h-6" />
        </div>
        <h1 className="text-white text-xl font-bold tracking-tight">
          AI Interview <span className="text-primary">Simulator</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4 px-2">Main Menu</div>
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `
              group flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300
              ${isActive 
                ? 'bg-primary/20 text-primary border border-primary/20 glow-blue forced-colors:bg-blue-600' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-primary' : 'text-gray-500 group-hover:text-white'} />
                <span className="font-semibold text-sm">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill" 
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary glow-blue" 
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-white/5 space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold text-xs">
            <Sparkles size={14} />
            <span>PRO VERSION</span>
          </div>
          <p className="text-[10px] text-gray-400">Unlock advanced AI feedback and unlimited simulations.</p>
          <button className="w-full py-2 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-blue-600 transition-colors">
            Upgrade Now
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all font-semibold text-sm"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
