
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';

/**
 * LoginPage — simple login form using AuthContext.login
 */
export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [usernameOrEmail, setusernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(usernameOrEmail, password);
      navigate('/dashboard'); // solo si login es exitoso
    } catch (err: any) {
      // si el backend devuelve 400, 401 o similar
  setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-4">
  <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md sm:max-w-lg">
    {/* Title */}
    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome</h2>
    <p className="text-center text-gray-500 mb-6">Enter your credentials to continue</p>

    {/* Error */}
    {error && (
      <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-center font-medium animate-pulse">
        {error}
      </div>
    )}

    {/* Formulario */}
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {/* Email */}
      <div className="flex flex-col">
  <label htmlFor="usernameOrEmail" className="mb-2 font-semibold text-gray-700">Email</label>
        <InputText
          id="usernameOrEmail"
          value={usernameOrEmail}
          onChange={(e) => setusernameOrEmail(e.target.value)}
          placeholder="user@example.com"
          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 hover:shadow-md"
          style={{ minHeight: '3rem' }}
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
  <label htmlFor="password" className="mb-2 font-semibold text-gray-700">Password</label>
        <Password
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          toggleMask
          feedback={false}
          placeholder="*********"
          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 hover:shadow-md"
          style={{ minHeight: '3rem' }}
          required
        />
      </div>

      {/* Botón */}
      <Button
        type="submit"
  label={loading ? 'Loading...' : 'Sign In'}
        icon="pi pi-sign-in"
        className="w-full rounded-xl py-3 mt-2 transition-transform duration-200 hover:scale-105 hover:shadow-lg p-button-primary"
        disabled={loading}
      />
    </form>

    {/* Link a registro */}
    <p className="text-center text-gray-500 text-sm mt-6">
      Don't have an account? <a href="/register" className="text-blue-500 font-semibold hover:underline">Register</a>
    </p>
  </div>
</div>



  );
};
