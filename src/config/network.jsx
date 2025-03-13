import axios from "axios";
import configuration from "./configuration";

const instance = axios.create({
  baseURL: configuration.baseUrl,
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
    console.log("Request", config);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  (error) => {
    try {
      if (error.response) {
        const { status, data } = error.response;
        return Promise.reject(status);
      } else {
        return Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
    }
  },
);

export default instance;
