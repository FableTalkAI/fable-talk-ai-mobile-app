import axios from 'axios';

const defaultAxiosInstance = axios.create();

defaultAxiosInstance.interceptors.request.use(config => {
  return config;
});

defaultAxiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export default defaultAxiosInstance;
