// src/pages/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from '../api/axios';

interface UserProfile {
  id: string;
  username: string;
  email?: string;
  role: string;
  area?: string; // Por ejemplo, área asignada
}

/**
 * ProfilePage — shows current user profile and details.
 */
export const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/auth/me'); // endpoint /me
        setProfile(res.data);
      } catch (err) {
        console.error('Error loading profile', err);
        setProfile(user || null); // fallback to info from context
      }
    };
    fetchProfile();
  }, [user]);

  if (!profile) return <p>Loading profile...</p>;

  return (
  <div className="flex justify-center p-4">
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg">
  <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">My Profile</h2>
      <div className="space-y-3 text-gray-700">
        <p><span className="font-medium">Username:</span> {profile.username}</p>
  {profile.email && <p><span className="font-medium">Email:</span> {profile.email}</p>}
        <p><span className="font-medium">Rol:</span> {profile.role}</p>
  {profile.area && <p><span className="font-medium">Assigned area:</span> {profile.area}</p>}
      </div>
    </div>
  </div>
);

};
