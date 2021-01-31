import { Payload } from "rsocket-types";
import {
  encodeAndAddCustomMetadata,
  encodeAndAddWellKnownMetadata,
  MESSAGE_RSOCKET_ROUTING
} from "rsocket-core";

declare const Buffer: any;

const bearerMimeType = "message/x.rsocket.authentication.bearer.v0";

export function dataBuf(jsonObj: Record<string, any>): Uint8Array {
  return new Buffer(JSON.stringify(jsonObj));
}

export function metadataBuf(jwtToken: string, route: string): Uint8Array {
  return encodeAndAddWellKnownMetadata(
    encodeAndAddCustomMetadata(
      Buffer.alloc(0),
      bearerMimeType,
      Buffer.from(jwtToken)
    ),
    MESSAGE_RSOCKET_ROUTING,
    Buffer.from(String.fromCharCode(route.length) + route)
  );
}

export function metadataOnlyRoute(route: string) {
  return encodeAndAddWellKnownMetadata(
    Buffer.from(""),
    MESSAGE_RSOCKET_ROUTING,
    Buffer.from(String.fromCharCode(route.length) + route)
  );
}

export function bufToData(payload: Payload<any, any>) {
  return payload.data.toString("utf8");
}
export function bufToJson(payload: Payload<any, any>) {
  return JSON.parse(bufToData(payload));
}
