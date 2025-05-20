import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080', // или твой API
  withCredentials: true, // ВАЖНО для передачи cookies
});

export default api;
