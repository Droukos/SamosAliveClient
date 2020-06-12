import axios from 'axios';
import VueCookies from 'vue-cookies';
import router from "@plugins/router.js";
import apiUrls from "@plugins/apiUrls.js";

const axiosApi = axios.create({
  baseURL: document.querySelector('meta[name="serve"]').getAttribute('content'),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "device-os": document.querySelector('meta[name="device"]').getAttribute('content'),
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${VueCookies.get('accToken')}` 
  }
});

axiosApi.interceptors.response.use( (response) => {
  // Return a successful response back to the calling service
  return response;
}, (error) => {
  console.log(error.response);
  // Return any error which is not due to authentication back to the calling service
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // Logout user if token refresh didn't work or user is disabled
  if (error.config.url == apiUrls.auth.access_token) {
    
    VueCookies.remove('accToken');
    VueCookies.remove("refToken");
    router.push({ name: 'login', query: { s: 'expired' } });

    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // Try request again with new token
  return axiosApi.get(apiUrls.auth.access_token, {
        headers: {
          'Authorization': `Bearer ${VueCookies.get("refToken")}`
        }
      }).then((tokenRefreshResponse) => {

      VueCookies.set("accToken", tokenRefreshResponse.data.message, null, null, null, null, "Strict");
      if (tokenRefreshResponse.data.result.startsWith("newRefreshToken:")) { //new refresh token generated for user
        VueCookies.set("refToken", tokenRefreshResponse.data.result.replace("newRefreshToken:", ""), null, null, null, null, "Strict");
      }
      // New request with new token
      const config = error.config;
      config.headers['Authorization'] = `Bearer ${VueCookies.get('accToken')}`;

      return new Promise((resolve, reject) => {
        axiosApi.request(config).then(response => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      });

    })
    .catch((error) => {
      Promise.reject(error);
    });
});

export default {
  axiosApi
};