import React, { useState } from 'react';
import axios from 'axios';

export default function UserSignup() {
  const colors = {
    primary: '#0A192F',         // Page background
    secondary: '#112240',       // Card background
    accent: '#64FFDA',          // Buttons, links, border highlights
    highlight: '#8892B0',       // Placeholder text
    error: '#FF6B6B',           // Error messages
    success: '#3ED598',         // Success messages
    textPrimary: '#FFFFFF',     // Main text
    textSecondary: '#E6F1FF',   // Subtext / muted
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('Signup successful!');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: colors.primary }}
    >
      <div
        className="w-full max-w-md rounded-xl shadow-lg p-8 space-y-6"
        style={{ backgroundColor: colors.secondary }}
      >
        <h2
          className="text-2xl font-bold text-center"
          style={{ color: colors.accent }}
        >
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-transparent placeholder-[#8892B0] text-white"
            style={{ borderColor: colors.accent }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-transparent placeholder-[#8892B0] text-white"
            style={{ borderColor: colors.accent }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-transparent placeholder-[#8892B0] text-white"
            style={{ borderColor: colors.accent }}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-transparent placeholder-[#8892B0] text-white"
            style={{ borderColor: colors.accent }}
            required
          />

          <button
            type="submit"
            className="w-full p-3 rounded font-semibold hover:opacity-90 transition duration-300"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
            }}
          >
            Sign Up
          </button>
        </form>

        <div className="text-sm text-center space-y-2" style={{ color: colors.textSecondary }}>
          <p>
            Already have an account?{' '}
            <a
              href="/login"
              className="font-semibold"
              style={{ color: colors.accent }}
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
