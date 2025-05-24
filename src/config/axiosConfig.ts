import axios from 'axios';
import axiosRetry from 'axios-retry';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000, // 10s timeout to avoid hanging requests
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => Math.pow(2, retryCount) * 1000, // 1s, 2s, 4s
  retryCondition: (error) =>
    axiosRetry.isNetworkError(error) ||
    [502, 503, 504].includes(error.response?.status || 0),
  shouldResetTimeout: true,
});


export default axiosInstance;
