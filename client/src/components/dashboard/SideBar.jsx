import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaUsers,
  FaLightbulb,
  FaClipboardList,
  FaSignOutAlt,
  FaRobot,
} from 'react-icons/fa';

export default function SideBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/dashboard/home', icon: <FaHome /> },
    { label: 'User Record', path: '/dashboard/user-record', icon: <FaUsers /> },
    { label: 'User Profile', path: '/dashboard/user-profile', icon: <FaUser /> },
    { label: 'Weak Areas', path: '/dashboard/weak-areas', icon: <FaLightbulb /> },
    { label: 'Actual Answer', path: '/dashboard/actual-answer', icon: <FaClipboardList /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="w-60 h-screen bg-black text-white flex flex-col justify-between py-6 px-4 shadow-lg border-r border-gray-700">
      {/* Top Logo/Title */}
      <div className="flex items-center space-x-2 mb-8">
        <FaRobot size={24} className="text-green-400 animate-bounce" />
        <span className="text-xl font-bold">AI Interview</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex-1 space-y-3">
        {navItems.map(({ label, path, icon }) => (
          <li key={path}>
            <Link
              to={path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg font-medium transition duration-200 ${
                pathname === path
                  ? 'bg-white text-black'
                  : 'hover:bg-white hover:text-black text-white'
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-2 text-white rounded-lg hover:bg-red-600 hover:text-white transition duration-200"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
