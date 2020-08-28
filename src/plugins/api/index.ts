import axios from "axios";
import router from "@/router";
import Vue from "vue";
import VueCookies from "vue-cookies";
import { authApi } from "./apiUrls";

Vue.use(VueCookies);

let accessToken = "";

const axiosApi = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${accessToken}`
  }
});

export function setBearerAccToken(accToken: string) {
  accessToken = accToken;
  axiosApi.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
}

axiosApi.interceptors.response.use(
  response => {
    // Return a successful response back to the calling service
    return response;
  },
  error => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Logout user if token refresh didn't work or user is disabled
    if (
      error.config.url === authApi.accessToken ||
      error.config.url === authApi.userData
    ) {
      return router
        .push({ name: "login", query: { sh: "expired" } })
        .then(() => (accessToken = ""))
        .catch(() => {
          return;
        });
    }

    // Try request again with new token
    return axiosApi.put(authApi.accessToken).then(tokenResponse => {
      accessToken = tokenResponse.data.accessToken;
      // New request with new token
      const config = error.config;
      config.headers["Authorization"] = `Bearer ${accessToken}`;

      return new Promise((resolve, reject) => {
        axiosApi
          .request(config)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }
);

export function updateAccToken() {
  if (Vue.$cookies.isKey("loggedIn")) {
    setTimeout(() => {
      axiosApi
        .put(authApi.accessToken)
        .then(tokenResponse =>
          setBearerAccToken(tokenResponse.data.accessToken)
        )
        .catch(() =>
          router
            .push({ name: "login", query: { sh: "expired" } })
            .then(() => (accessToken = ""))
            .catch(() => {
              return;
            })
        );
      updateAccToken();
    }, 1080000); // 18 minutes
  }
}
export default axiosApi;
