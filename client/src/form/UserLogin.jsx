import React, { useState } from 'react';
import axios from 'axios';

export default function UserLogin() {
  const colors = {
    primary: '#0A192F',         // Background
    secondary: '#112240',       // Form container
    accent: '#64FFDA',          // Buttons, highlights
    highlight: '#8892B0',       // Placeholder text
    error: '#FF6B6B',           // Error messages
    success: '#3ED598',         // Success messages (if needed)
    textPrimary: '#FFFFFF',     // Main text on dark backgrounds
    textSecondary: '#E6F1FF',   // Subtext, muted
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);

      alert('Login successful!');
      window.location.href = '/';
    } catch (err) {
      alert(err?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: colors.primary }}
    >
      <div
        className="w-full max-w-md rounded-xl shadow-lg p-8 space-y-6"
        style={{ backgroundColor: colors.secondary }}
      >
        <h2 className="text-2xl font-bold text-center" style={{ color: colors.accent }}>
          Login to AI Simulator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded text-white bg-transparent placeholder-[#8892B0]"
            style={{
              borderColor: colors.accent,
              color: colors.textPrimary,
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded text-white bg-transparent placeholder-[#8892B0]"
            style={{
              borderColor: colors.accent,
              color: colors.textPrimary,
            }}
          />
          <button
            type="submit"
            className="w-full p-3 rounded font-semibold hover:opacity-90 transition duration-300"
            style={{ backgroundColor: colors.accent, color: colors.primary }}
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center" style={{ color: colors.textSecondary }}>
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="font-semibold" style={{ color: colors.accent }}>
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
