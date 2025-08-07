import React, { useEffect, useState } from 'react';

export default function UserRecord() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/interview/${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch records');

        const reversedRecords = data.reverse();
        setRecords(reversedRecords);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchRecords();
    else {
      setError('User not logged in');
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Your Interview Records
      </h2>

      {loading ? (
        <p className="text-center text-white text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">No records found.</p>
      ) : (
        <div className="space-y-6">
          {records.map((record) => (
            <div
              key={record._id}
              className="bg-gray-900 border border-white rounded-lg p-5 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              <h3 className="text-xl text-white font-semibold mb-2">
                {record.jobTitle}
              </h3>
              <p className="text-sm mb-3 text-gray-300">
                Experience: {record.experience}
              </p>

              <ul className="space-y-3">
                {[...record.responses].reverse().map((resp, idx) => (
                  <li
                    key={idx}
                    className="bg-black p-4 rounded text-sm border-l-4 border-white"
                  >
                    <p>
                      <span className="text-white font-semibold">Q:</span> {resp.question}
                    </p>
                    <p>
                      <span className="text-white font-semibold">A:</span> {resp.answer}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="text-xs mt-4 text-right text-gray-400">
                Submitted on {new Date(record.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
