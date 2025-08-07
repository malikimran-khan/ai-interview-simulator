import React, { useState } from 'react';
import axios from 'axios';

export default function ChooseRole() {
  const colors = {
    primary: '#000000',         // Page background
    secondary: '#111111',       // Card background
    accent: '#FFFFFF',          // Buttons, links, border highlights
    textPrimary: '#FFFFFF',     // Main text
    textSecondary: '#DDDDDD',   // Subtext / muted
  };

  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You must be logged in to start an interview.');
      window.location.href = '/login';
      return;
    }

    if (!jobTitle || !experience) {
      alert('Please select job title and experience level.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/interview/start', {
        userId,
        jobTitle,
        experience,
      });

      localStorage.setItem('interviewSession', JSON.stringify(res.data));
      alert('Role selected! Now launching interview simulation...');
      window.location.href = '/interview';
    } catch (error) {
      console.error('Error starting interview:', error);
      alert('Failed to start interview session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: colors.primary }}
    >
      <div
        className="w-full max-w-lg rounded-xl shadow-xl p-8 space-y-6"
        style={{ backgroundColor: colors.secondary }}
      >
        <h2 className="text-2xl font-bold text-center" style={{ color: colors.accent }}>
          Choose Your Role
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1" style={{ color: colors.textSecondary }}>
              Job Title
            </label>
            <select
              className="w-full p-3 border rounded"
              style={{
                borderColor: colors.accent,
                color: colors.textPrimary,
                backgroundColor: colors.secondary,
              }}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            >
              <option value="">Select Job Title</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1" style={{ color: colors.textSecondary }}>
              Experience Level
            </label>
            <select
              className="w-full p-3 border rounded"
              style={{
                borderColor: colors.accent,
                color: colors.textPrimary,
                backgroundColor: colors.secondary,
              }}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            >
              <option value="">Select Experience Level</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior Level</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded font-semibold transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ backgroundColor: colors.accent, color: colors.primary }}
          >
            {loading ? 'Loading...' : 'Start Interview'}
          </button>
        </form>
      </div>

      {/* Fix option visibility for all browsers */}
      <style>
        {`
          select option {
            background-color: ${colors.secondary};
            color: ${colors.textPrimary};
          }
        `}
      </style>
    </div>
  );
}
