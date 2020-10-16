import axios from "axios";
import router from "@/router";
import Vue from "vue";
import VueCookies from "vue-cookies";
import { authApi } from "./apiUrls";
import {
  RSocketClient,
  BufferEncoders,
  MESSAGE_RSOCKET_COMPOSITE_METADATA
} from "rsocket-core";
import RSocketWebSocketClient from "rsocket-websocket-client";
import { ReactiveSocket} from "rsocket-types";
import {CancelCallback} from "rsocket-flowable/Single";

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

export let authRSocket: ReactiveSocket<any, any>;
export let userRSocket: ReactiveSocket<any, any>;
export let aedRSocket: ReactiveSocket<any, any>;
export let newsRSocket: ReactiveSocket<any, any>;

const authRSocketAddr = "ws://localhost:8989";
const userRSocketAddr = "ws://localhost:8985";
const aedRSocketAddr = "ws://localhost:8987";

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

export function authConn() {
  authClient.connect().subscribe({
    onComplete: (socket: ReactiveSocket<any, any>) => {
      authRSocket = socket;
    },
    onError: (error: Error) => {
      console.log("Connection has been refused due to ", error);
    },
    //  onNext: value => {
    //      // console.log("got next value in requestStream..");
    //      console.log(value.data);
    //  },
    onSubscribe: (cancel: CancelCallback) => {
      /* call cancel() to abort */
      console.log("subscribe!");
      console.log(cancel);
    }
  });
}

export function userConn() {
    userClient.connect().subscribe({
        onComplete: (socket: ReactiveSocket<any, any>) => {
            userRSocket = socket;
        },
        onError: (error: Error) => {
            console.log("Connection has been refused due to ", error);
        },
        onSubscribe: (cancel: CancelCallback) => {
            /* call cancel() to abort */
            console.log("subscribe!");
            console.log(cancel);
        }
    });
}

export function aedConn() {
    aedClient.connect().subscribe({
        onComplete: (socket: ReactiveSocket<any, any>) => {
            aedRSocket = socket;
        },
        onError: (error: Error) => {
            console.log("Connection has been refused due to ", error);
        },
        onSubscribe: (cancel: CancelCallback) => {
            /* call cancel() to abort */
            console.log("subscribe!");
            console.log(cancel);
        }
    });
}


//rSocket.requestChannel().subscribe({
//      onNext: value => {
//          // console.log("got next value in requestStream..");
//          console.log(value.data);
//      },
//})




  //rSocket
  //    .requestResponse({
  //      data: dataBuf({}),
  //      metadata: metadataBuf(accessToken, "")
  //    })
  //    .subscribe({
  //      onComplete: (data: Payload<any, any>) => {
  //        console.log("got response with requestResponse");
  //        const response = data.data.toString();
  //        console.log(response);
  //      },
  //      onError: (error: Error) => {
  //        console.log("got error with requestResponse");
  //        console.error(error);
  //      },
  //      onSubscribe: (cancel: CancelCallback) => {
  //        /* call cancel() to stop onComplete/onError */
  //      }
  //    });

export default axiosApi;
