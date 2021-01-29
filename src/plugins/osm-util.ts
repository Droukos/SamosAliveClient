import { accessToken } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { osmApi } from "@/plugins/api/api-urls";
import {
  IReverseOsmData,
  OsmAddress,
  ReverseOsmLatLon,
  SearchOsmAddress
} from "@/types/osm";
import {IAedDevPreview} from "@/types/aed-device";
import {aedRSocketApi, getAccessTokenJwt} from "@/plugins/api/rsocket-api";

export function emptyRouteInfo() {
  return {
    coordinates: [],
    instructions: [],
    name: "",
    summary: {
      totalDistance: 0,
      totalTime: 0
    },
    waypointIndices: []
  };
}

export function sortAedDevices(previewAedDevices: IAedDevPreview[]) {
  previewAedDevices.sort((a, b) => {
    if (a.responseRouteInfo == undefined && b.responseRouteInfo == undefined)
      return 0;
    else if (a.responseRouteInfo == undefined) return -1;
    else if (b.responseRouteInfo == undefined) return 1;
    else if (
        a.responseRouteInfo.summary.totalDistance >
        b.responseRouteInfo.summary.totalDistance
    )
      return 1;
    else if (
        a.responseRouteInfo.summary.totalDistance <
        b.responseRouteInfo.summary.totalDistance
    )
      return -1;
    else return 0;
  });
}

function getAddressLabelFromSplitData(data: string) {
  const address: string[] = data.split(", ");
  if (address.length == 8) {
    return (
      address[0] +
      " " +
      address[1] +
      ", " +
      address[2] +
      ", " +
      address[4] +
      ", " +
      address[7]
    );
  } else if (address.length == 9) {
    return (
      address[1] +
      " " +
      address[0] +
      ", " +
      address[2] +
      ", " +
      address[3] +
      ", " +
      address[5] +
      ", " +
      address[8]
    );
  } else if (address.length == 12) {
    return (
      address[0] +
      ", " +
      address[1] +
      ", " +
      address[2] +
      ", " +
      address[3] +
      ", " +
      address[5] +
      ", " +
      address[8]
    );
  } else {
    return data;
  }
}

export async function searchOsmAddress(data: SearchOsmAddress) {
  return new Promise(resolve => {
    aedRSocketApi().then(aedRSocket =>
      aedRSocket
        .requestResponse({
          data: dataBuf(data),
          metadata: metadataBuf(accessToken, osmApi.osmSearchAddress)
        })
        .subscribe({
          onComplete: value => {
            const result = bufToJson(value);
            const newData = [];
            for (let i = 0; i < result.length; i++) {
              newData.push({
                label: getAddressLabelFromSplitData(result[i].display_name),
                y: result[i].lat,
                x: result[i].lon
              });
            }
            resolve(newData);
          },
          onError: error => console.error(error)
        })
    );
  });
}

export async function reverseOsmGeocoding(
  data: ReverseOsmLatLon
): Promise<IReverseOsmData> {
  return getAccessTokenJwt().then(token => {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(token, osmApi.osmReverseSearch)
          })
          .subscribe({
            onComplete: value => {
              resolve(bufToJson(value));
            },
            onError: error => console.error(error)
          })
      );
    });
  });
}

export function getAddressLabel(data: OsmAddress) {
  return (
    data.road +
    " " +
    data.house_number +
    ", " +
    data.suburb +
    ", " +
    data.city +
    ", " +
    data.country
  );
}

//export async function findRouteRescuerDeviceEvent(
//  data: OsrmRoutesToSearch
//): Promise<RouteResult[]> {
//  return getAccessTokenJwt().then(token => {
//    return new Promise(resolve => {
//      const routeResults: RouteResult[] = [];
//      aedRSocketApi().then(aedRSocket => {
//        aedRSocket
//          .requestStream({
//            data: dataBuf(data.routesToSearch),
//            metadata: metadataBuf(token, osmApi.osrmSearchRescDevEv)
//          })
//          .subscribe({
//            onNext: value => routeResults.push(bufToJson(value)),
//            onError: error => console.error(error),
//            onSubscribe: sub => sub.request(data.routesToSearch.length)
//          });
//        resolve(routeResults);
//      });
//    });
//  });
//}
