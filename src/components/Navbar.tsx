// src/components/Navbar.tsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar component — shows navigation links depending on auth state.
 */
export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <NavLink to="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold">TN</div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold">TechNova</h1>
                {user && <p className="text-xs text-gray-500">{user.username} · {user.role}</p>}
              </div>
            </NavLink>
          </div>

          <nav className="hidden md:flex gap-4 items-center">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}>Dashboard</NavLink>
            <NavLink to="/catalog" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}>Catalog</NavLink>
            {user && (
              <>
                <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}>Profile</NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/adminsummary" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}>Admin</NavLink>
                )}
                <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
              </>
            )}
            {!user && (
              <NavLink to="/login" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}>Login</NavLink>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setOpen(!open)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            <NavLink to="/dashboard" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'block text-blue-600 font-medium' : 'block text-gray-700'}>Dashboard</NavLink>
            <NavLink to="/catalog" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'block text-blue-600 font-medium' : 'block text-gray-700'}>Catalog</NavLink>
            {user && (
              <>
                <NavLink to="/profile" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'block text-blue-600 font-medium' : 'block text-gray-700'}>Profile</NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/adminsummary" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'block text-blue-600 font-medium' : 'block text-gray-700'}>Admin</NavLink>
                )}
                <button onClick={() => { setOpen(false); handleLogout(); }} className="w-full text-left text-red-600">Logout</button>
              </>
            )}
            {!user && (
              <NavLink to="/login" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'block text-blue-600 font-medium' : 'block text-gray-700'}>Login</NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
