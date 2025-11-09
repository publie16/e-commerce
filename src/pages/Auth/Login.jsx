import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e, role = null) => {
    e.preventDefault();
    let userEmail = email;

    if (role === 'admin') userEmail = 'admin@demo.com';
    const user = login(userEmail, password);

    if (user.role === 'admin') navigate('/admin');
    else navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg bg-gray-800 text-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-white">Login</h1>
      <form className="space-y-4">
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
        <div className="flex gap-3">
          <button
            onClick={(e) => submit(e, 'user')}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            Login as User
          </button>
          <button
            onClick={(e) => submit(e, 'admin')}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition"
          >
            Login as Admin
          </button>
        </div>
      </form>
      <div className="mt-6 text-center text-gray-400 text-sm">
          <p>~!~ Account not saved actually — just a demo login form.</p>
          <p className="mt-2 text-blue-400 font-medium">Admin login: admin@demo.com</p>
        </div>
    </div>
  );
}
