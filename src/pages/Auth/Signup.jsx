
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    if (role === 'admin' && email !== 'admin@demo.com') {
      alert("Only 'admin@demo.com' can be admin in this demo.");
      return;
    }

    const user = signup(email, password, name, role);
    if (user.role === 'admin') navigate('/admin');
    else navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg bg-gray-800 text-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-white">Sign Up</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          required
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center gap-6 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
              className="accent-blue-500"
            />
            User
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
              className="accent-red-500"
            />
            Admin
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition mt-3"
        >
          Create Account
        </button>
      </form>
      <div className="mt-6 text-center text-gray-400 text-sm">
          <p>~!~ Account not saved actually — just a demo signup form.</p>
          <p className="mt-2 text-blue-400 font-medium">Admin login: admin@demo.com</p>
        </div>
    </div>
  );
}
