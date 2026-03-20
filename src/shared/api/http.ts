import auth from '@react-native-firebase/auth';
import axios from 'axios';

const http = axios.create();

http.interceptors.request.use(
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

http.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error.response);
  },
);

export default http;
