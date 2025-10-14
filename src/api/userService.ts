// src/api/userService.ts
import axios from './axios';
import { User } from '../types/User';

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await axios.get('/users'); // ajusta el endpoint si es distinto
    return res.data;
  } catch (err: any) {
    console.error('Error fetching users:', err);
    return [];
  }
};
