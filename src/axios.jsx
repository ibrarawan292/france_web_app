import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiURL from "./Config/Config";

const API = axios.create({
  baseURL: ApiURL,
  headers: {
    "Content-type": " application/json",
  },
});


// request interceptor for settting the two headers refresh & access tokens
API.interceptors.request.use(
  (config) => {
    // console.log(localStorage.getItem("AdminAuth"));
    const token = JSON.parse(localStorage.getItem("UserAuth"));

    if (
      token &&
      config.url !== "/RefreshToken" &&
      config.url !== "/Login" &&
      config.url !== "/ForgotPasswordAdmin" &&
      !config.url.includes("/ResetPasswordAdmin")
    ) {
      config.headers["Authorization"] = "Bearer " + token.access_token;
    } else if (
      config.url !== "/Login" &&
      config.url !== "/ForgotPasswordAdmin" &&
      !config.url.includes("/ResetPasswordAdmin")
    ) {
      config.headers["Authorization"] = "Bearer " + token.refresh_token;
    }

    // Optional
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor, when the backend throws error 403 for token expire it call the refresh token API and updates the token
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    // if (error.response.status === 400) {
    //   console.log(error.response.data.message);
    // }
    if (error.response.status !== 403) {
      toast.error(error.response.data.message);
    }
    if (error.response.status === 500) {
      toast.error("Oops! Something went wrong");
    }
    if(error.response.status === 401){
      // toast.error("You don't have permission to view this page");
      localStorage.removeItem("UserAuth")
      localStorage.setItem("UserIsLogin", false);
      window.location.reload();
      Navigate("/login");
    }
    if (error.response.status === 403) {
      return API.get("/RefreshToken").then((res) => {
        if (res.data.status === 200) {
          originalRequest._retry = true;
          let items = {
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
          };
          localStorage.setItem("UserAuth", JSON.stringify(items));
          // Navigate("/admin-dashboard");
          API.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.access_token;
          originalRequest.headers["Authorization"] =
            "Bearer " + res.data.access_token;
          // call failed request due to token expire
          return axios(originalRequest);
        }
      });
    }

    Promise.reject(error);
  }
);

export default API;
