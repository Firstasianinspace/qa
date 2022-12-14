import axios from "axios";
import { Cookies } from "quasar";

const fetchClient = () => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const BaseApi = axios.create(defaultOptions);

  BaseApi.interceptors.request.use(function (config) {
    const options = {
      expires: "58m 10s",
    };
    const token = Cookies.get("authToken", options);
    config.headers.Authorization = token;
    return config;
  });

  return BaseApi;
};

export default fetchClient();
