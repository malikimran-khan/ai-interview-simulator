import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserEdit, FaSave, FaPhoneAlt, FaIdCard, FaMapMarkerAlt, FaImage } from 'react-icons/fa';

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    phone: '',
    cnic: '',
    address: '',
    image: '',
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/${userId}`);
        setUser(res.data);
        setForm({
          phone: res.data.phone || '',
          cnic: res.data.cnic || '',
          address: res.data.address || '',
          image: res.data.image || '',
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/auth/${userId}`, form);
      setUser(res.data);
      setEditMode(false);
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile');
    }
  };

  const isValidImage = (url) => url?.match(/\.(jpeg|jpg|gif|png)$/i);

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }} className="flex justify-center items-center p-6">
      <div className="w-full max-w-lg bg-[#111] rounded-xl shadow-xl p-6 space-y-4 animate-fade-in">
        <div className="text-center">
          <img
            src={
              isValidImage(user.image)
                ? user.image
                : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            }
            alt="Profile"
            className="mx-auto rounded-full border-4 border-white"
            style={{ width: 120, height: 120, objectFit: 'cover' }}
          />
          <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
          <p className="text-gray-300">{user.email}</p>
        </div>

        <div className="space-y-2">
          {editMode ? (
            <>
              <ProfileInput label="Phone" name="phone" icon={<FaPhoneAlt />} value={form.phone} onChange={handleChange} />
              <ProfileInput label="CNIC" name="cnic" icon={<FaIdCard />} value={form.cnic} onChange={handleChange} />
              <ProfileInput label="Address" name="address" icon={<FaMapMarkerAlt />} value={form.address} onChange={handleChange} />
              <ProfileInput label="Image URL" name="image" icon={<FaImage />} value={form.image} onChange={handleChange} />
              <button
                onClick={handleUpdate}
                className="flex items-center justify-center w-full mt-4 px-4 py-2 bg-white text-black font-semibold rounded hover:scale-105 transition duration-300"
              >
                <FaSave className="mr-2" /> Save Changes
              </button>
            </>
          ) : (
            <>
              <p><FaPhoneAlt className="inline mr-2 text-green-400" /> <strong>Phone:</strong> {user.phone || 'N/A'}</p>
              <p><FaIdCard className="inline mr-2 text-green-400" /> <strong>CNIC:</strong> {user.cnic || 'N/A'}</p>
              <p><FaMapMarkerAlt className="inline mr-2 text-green-400" /> <strong>Address:</strong> {user.address || 'N/A'}</p>
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center justify-center w-full mt-4 px-4 py-2 bg-white text-black font-semibold rounded hover:scale-105 transition duration-300"
              >
                <FaUserEdit className="mr-2" /> Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileInput({ label, name, value, onChange, icon }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1 flex items-center">
        <span className="mr-2 text-green-400">{icon}</span>
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 bg-black text-white border border-gray-600 rounded focus:outline-none focus:border-green-400"
      />
    </div>
  );
}
