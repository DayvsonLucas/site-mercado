import axios from 'axios'
import { getToken } from "./auth";
import settings from '../../src/config'

const api = axios.create({
  baseURL: settings.defaultSettings.REACT_APP_BASE_URL
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;