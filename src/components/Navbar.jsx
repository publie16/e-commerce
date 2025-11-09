import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 border-b border-gray-700 text-gray-200 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition-colors">
          E-Store
        </Link>

        <nav className="flex items-center gap-4">
          {/* User Links */}
          {user?.role === 'user' && (
            <>
              <Link
                to="/"
                className="px-3 py-1 rounded hover:bg-gray-800 transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/cart"
                className="px-3 py-1 rounded hover:bg-gray-800 transition-colors"
              >
                Cart ({cart.reduce((s, i) => s + i.qty, 0)})
              </Link>
            </>
          )}

          {/* Admin Links */}
          {user?.role === 'admin' && (
            <>
              <Link
                to="/admin"
                className="px-3 py-1 rounded hover:bg-gray-800 transition-colors"
              >
                Admin Dashboard
              </Link>
              <Link
                to="/admin/products"
                className="px-3 py-1 rounded hover:bg-gray-800 transition-colors"
              >
                Manage Products
              </Link>
            </>
          )}

          {/* Authentication */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">{user.name}</div>
              <button
                onClick={() => { 
                  logout(); 
                  navigate('/'); 
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
