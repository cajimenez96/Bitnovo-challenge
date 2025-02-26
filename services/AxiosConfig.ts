import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://payments.pre-bnvo.com/api/v1/",
  headers: {
    "Content-Type": "multipart/form-data",
    "X-Device-Id": "75e766d4-dd3a-44c3-a876-0acbe1c6d82c",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Error de respuesta:", error.response.data);
    } else if (error.request) {
      console.error("Error de solicitud:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
