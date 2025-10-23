import axios from 'axios';
import { storage } from '../utils/storage';
import { Platform } from 'react-native';

// Replace with your actual IP address for mobile testing
const API_URL = Platform.select({
  web: 'http://localhost:3000',
  default: 'http://192.168.2.50:3000' // Replace XXX with your IP
});

console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: { 
    'Content-Type': 'application/json' 
  },
  timeout: 10000 // 10 second timeout
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await storage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log('Authentication error - redirecting to login');
    }
    return Promise.reject(error);
  }
);

export default api;