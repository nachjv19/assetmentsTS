import axios from './axios';

export interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const res = await axios.post('/auth/login', data);
  return res.data;
};

export const me = async (token?: string) => {
  if (!token) throw new Error('No token')
  const res = await axios.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}
