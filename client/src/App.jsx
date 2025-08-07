import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './form/UserLogin';
import UserSignup from './form/UserSignup';
import ChooseRole from './pages/ChooseRole';
import InterView from './pages/InterView';
import DashBoard from './components/dashboard/DashBoard';
import UserNavbar from './components/UserNavbar';

function AppContent() {
  const location = useLocation();

  // Hide navbar on any /dashboard route
  const hideNavbar = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!hideNavbar && <UserNavbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/choose-role' element={<ChooseRole />} />
        <Route path='/interview' element={<InterView />} />
        <Route path='/dashboard/*' element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
