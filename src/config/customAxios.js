import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost/wordpress/wp-json/",
});

// const customAxios = axios.create({
//   baseURL: "/api/wp-json/",
// });

const getAccessToken = () => localStorage.getItem("token");

customAxios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
);

export default customAxios;
