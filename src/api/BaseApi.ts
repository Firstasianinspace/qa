import axios from 'axios'
import type { AxiosInstance } from 'axios'

const fetchClient = () => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const BaseApi: AxiosInstance  = axios.create(defaultOptions);

  BaseApi.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    config.headers.Authorization =  token ? token : '';
    return config;
  });

  return BaseApi;
};

export default fetchClient();