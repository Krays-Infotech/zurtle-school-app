import axios from "axios";
import configuration from "./configuration";
import {
  getValueFromLocalStorage,
  getValueFromLocalStorageKey,
  localStorageKey,
} from "../utils/helper";

const instance = axios.create({
  baseURL: configuration.baseUrl,
  withCredentials: false,
});

instance.interceptors.request.use(
  async (config) => {
    const token = JSON.stringify(
      getValueFromLocalStorageKey("userDetails", "token")
    );
    if (token != null && token !== undefined) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    // console.log("Request", config);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  (error) => {
    try {
      if (error.response) {
        console.log("Error", error.response);
        const { status, data } = error.response;
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem("userData");
          console.log("dfgsdfg", data);
        }
        console.log("dfgsdfg", data);
        return Promise.reject(status);
      } else {
        return Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
    }
  }
);

export const authorizedGet = (url, config = {}) => {
  return instance.get(url, config);
};

export const authorizedPost = (url, data, config = {}) => {
  return instance.post(url, data, config);
};

export const authorizedPut = (url, data, config = {}) => {
  return instance.put(url, data, config);
};

export const authorizedDel = (url, config = {}) => {
  return instance.delete(url, config);
};

export default instance;
