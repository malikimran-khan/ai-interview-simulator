import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineRobot } from 'react-icons/ai';

export default function UserNavbar() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/dashboard/user-profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-black shadow-lg">
      {/* Left: Logo with text */}
      <div className="flex items-center space-x-3">
        <AiOutlineRobot className="text-white text-3xl animate-pulse" />
        <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wide">
          AI-Powered Interview Simulator
        </h1>
      </div>

      {/* Right: Profile Button */}
      <div>
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-md hover:bg-white hover:text-black transition duration-300"
        >
          <FaUserCircle className="text-lg" />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
}
