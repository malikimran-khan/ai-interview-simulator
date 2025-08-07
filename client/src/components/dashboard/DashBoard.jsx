import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import Home from './Home';
import UserRecord from './UserRecord';
import UserProfile from './UserProfile';
import WeakAreas from './WeakAreas';
import Logout from './Logout';
import ActualAnswer from './ActualAnswer';

export default function DashBoard() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <SideBar />

      {/* Content area */}
      <div className="flex-1 p animate-fadeIn bg-white text-black">
        <Routes>
          <Route
            path="*"
            element={
              <h2 className="text-xl text-center font-semibold bg-white text-black p-4 rounded shadow">
                Select a page
              </h2>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/user-record" element={<UserRecord />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/weak-areas" element={<WeakAreas />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/actual-answer" element={<ActualAnswer />} />
        </Routes>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
}
