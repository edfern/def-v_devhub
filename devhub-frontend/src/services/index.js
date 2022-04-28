import axios from 'axios';
import { BACKEND_API } from '../consts/backend';

const API_USER = BACKEND_API;

export const newUser = async ({ userInfo }) => {
  const data = await axios.post(`${API_USER}/user/save`, userInfo);
  return data.data;
};
