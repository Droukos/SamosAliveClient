import axios from "axios";
import router from "@/router";
import Vue from "vue";
import VueCookies from "vue-cookies";
import { authApi } from "./api-urls";
import {
  RSocketClient,
  BufferEncoders,
  MESSAGE_RSOCKET_COMPOSITE_METADATA
} from "rsocket-core";
import RSocketWebSocketClient from "rsocket-websocket-client";
import { ReactiveSocket } from "rsocket-types";
import { CancelCallback } from "rsocket-flowable/Single";

Vue.use(VueCookies);

export let accessToken = "";

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
      return new Promise(reject => reject(error));
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
          .then(response => resolve(response))
          .catch(error => reject(error));
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

const keepAlive = 60000;
const lifetime = 180000;
const dataMimeType = "application/json";
const metadataMimeType = MESSAGE_RSOCKET_COMPOSITE_METADATA.string;
const defaultSetup = {
  keepAlive,
  lifetime,
  dataMimeType,
  metadataMimeType
};

let authRSocket: ReactiveSocket<any, any>;
let userRSocket: ReactiveSocket<any, any>;
export let aedRSocket: ReactiveSocket<any, any>;
export let newsRSocket: ReactiveSocket<any, any>;
let cdnRSocket: ReactiveSocket<any, any>;

const authRSocketAddr = "ws://localhost:8989";
const userRSocketAddr = "ws://localhost:8985";
const aedRSocketAddr = "ws://localhost:8987";
const newsRSocketAddr = "ws://localhost:8986";
const cdnRSocketAddr = "ws://localhost:8983";

const authClient = new RSocketClient({
  setup: defaultSetup,
  transport: new RSocketWebSocketClient(
    {
      url: "",
      wsCreator: () => new WebSocket(authRSocketAddr),
      debug: true
    },
    BufferEncoders
  )
});

const userClient = new RSocketClient({
  setup: defaultSetup,
  transport: new RSocketWebSocketClient(
    {
      url: "",
      wsCreator: () => new WebSocket(userRSocketAddr),
      debug: true
    },
    BufferEncoders
  )
});

const cdnClient = new RSocketClient({
  setup: defaultSetup,
  transport: new RSocketWebSocketClient(
    {
      url: "",
      wsCreator: () => new WebSocket(cdnRSocketAddr),
      debug: true
    },
    BufferEncoders
  )
});

const aedClient = new RSocketClient({
  setup: defaultSetup,
  transport: new RSocketWebSocketClient(
    {
      url: "",
      wsCreator: () => new WebSocket(aedRSocketAddr),
      debug: true
    },
    BufferEncoders
  )
});

const newsClient = new RSocketClient({
  setup: defaultSetup,
  transport: new RSocketWebSocketClient(
    {
      url: "",
      wsCreator: () => new WebSocket(newsRSocketAddr),
      debug: true
    },
    BufferEncoders
  )
});

export function authConn() {
  authClient.connect().subscribe({
    onComplete: (socket: ReactiveSocket<any, any>) => {
      authRSocket = socket;
    },
    onError: (error: Error) =>
      console.log("Connection has been refused due to ", error),
    onSubscribe: (cancel: CancelCallback) => console.log(cancel)
  });
}

export function userConn(): Promise<ReactiveSocket<any, any>> {
  return new Promise(resolve =>
    userClient.connect().subscribe({
      onComplete: (socket: ReactiveSocket<any, any>) => {
        userRSocket = socket;
        resolve(socket);
      },
      onError: (error: Error) =>
        console.log("Connection has been refused due to ", error),
      onSubscribe: (cancel: CancelCallback) => console.log(cancel)
    })
  );
}

export function aedConn(): Promise<ReactiveSocket<any, any>> {
  return new Promise(resolve =>
    aedClient.connect().subscribe({
      onComplete: (socket: ReactiveSocket<any, any>) => {
        aedRSocket = socket;
        resolve(socket);
      },
      onError: (error: Error) =>
        console.log("Connection has been refused due to ", error),
      onSubscribe: (cancel: CancelCallback) => console.log(cancel)
    })
  );
}

export function newsConn(): Promise<ReactiveSocket<any, any>> {
  return new Promise(resolve =>
    newsClient.connect().subscribe({
      onComplete: (socket: ReactiveSocket<any, any>) => {
        newsRSocket = socket;
        resolve(socket);
      },
      onError: (error: Error) =>
        console.log("Connection has been refused due to ", error),
      onSubscribe: (cancel: CancelCallback) => console.log(cancel)
    })
  );
}

export function cdnConn(): Promise<ReactiveSocket<any, any>> {
  return new Promise(resolve =>
    cdnClient.connect().subscribe({
      onComplete: (socket: ReactiveSocket<any, any>) => {
        cdnRSocket = socket;
        resolve(socket);
      },
      onError: error =>
        console.log("Connection has been refused due to ", error),
      onSubscribe: (cancel: CancelCallback) => console.log(cancel)
    })
  );
}

export function getAccessTokenJwt(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (accessToken != "") resolve(accessToken);
    else {
      const maxTries = 30;
      return (function someDelay(tries) {
        if (accessToken != "") resolve(accessToken);
        else if (tries < maxTries)
          setTimeout(function() {
              someDelay(tries);
          }, 100);
        else reject("");
        tries++;
      })(0);
    }
  });
}

export function authRSocketApi() {
  if (authRSocket == undefined) {
    authConn();
  }

  return authRSocket;
}

export async function cdnRSocketApi(): Promise<ReactiveSocket<any, any>> {
  return cdnRSocket == undefined && Vue.$cookies.isKey("loggedIn")
    ? cdnConn()
    : cdnRSocket;
}

export async function userRSocketApi(): Promise<ReactiveSocket<any, any>> {
  return userRSocket == undefined && Vue.$cookies.isKey("loggedIn")
    ? userConn()
    : userRSocket;
}

export async function aedRSocketApi(): Promise<ReactiveSocket<any, any>> {
  return aedRSocket == undefined && Vue.$cookies.isKey("loggedIn")
    ? aedConn()
    : aedRSocket;
}

export async function newsRSocketApi(): Promise<ReactiveSocket<any, any>> {
  return newsRSocket == undefined && Vue.$cookies.isKey("loggedIn")
    ? newsConn()
    : newsRSocket;
}
export default axiosApi;
