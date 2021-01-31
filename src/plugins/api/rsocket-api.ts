import {
  BufferEncoders,
  MESSAGE_RSOCKET_COMPOSITE_METADATA,
  RSocketClient
} from "rsocket-core";
import { ReactiveSocket } from "rsocket-types";
import RSocketWebSocketClient from "rsocket-websocket-client";
import { CancelCallback } from "rsocket-flowable/Single";
import Vue from "vue";
import { accessToken } from "@/plugins/api/index";
import {
    aedRSocketAddr,
    authRSocketAddr,
    cdnRSocketAddr,
    newsRSocketAddr,
    userRSocketAddr
} from "@/plugins/api/addresses";

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
    onComplete: (socket: ReactiveSocket<any, any>) => (authRSocket = socket),
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
