import auth from '@react-native-firebase/auth';
import axios from 'axios';

import i18n from '@/features/locales/i18n.ts';

const http = axios.create({
  headers: {
    'User-Agent': 'FableTalkAI-App',
  },
});

http.interceptors.request.use(
  async config => {
    config.headers['Accept-Language'] = i18n.resolvedLanguage || 'en';

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
