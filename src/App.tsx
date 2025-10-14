import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { ProfilePage } from './pages/ProfilePage';
import { AdminSummary } from './pages/ResumeStats';
import { CatalogPage } from './pages/CatalogPage';
import { ProtectedRoute } from './router/Router';
import { Navbar } from './components/Navbar';
import { useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();
  const hideNavbarOn = ['/login', '/register'];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminsummary"
          element={
            <ProtectedRoute>
              <AdminSummary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/catalog"
          element={<CatalogPage />}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};
