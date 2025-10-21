import auth from '@react-native-firebase/auth';
import axios from 'axios';

const defaultAxiosInstance = axios.create();

defaultAxiosInstance.interceptors.request.use(
  async config => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const freshToken = await currentUser.getIdToken(true);
      config.headers.Authorization = `Bearer ${freshToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

defaultAxiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export default defaultAxiosInstance;
