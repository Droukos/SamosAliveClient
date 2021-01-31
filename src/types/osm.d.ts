import { LatLng } from "leaflet";
import { AedEvent } from "@/types/aed-event";
import { AedDevPreview } from "@/types/aed-device";

declare namespace OsmServer {
  interface AedDevicePreviewWithRouteDto {
    aedEventId: AedEvent.id;
    aedDeviceInfoPreviewDto: AedDevPreview;
    routeInfo: any;
  }
}

declare namespace OsmClient {
  interface AedDeviceAreaLookWithRoute {
    eventId: AedEvent.id;
    eventLat: number;
    eventLng: number;
    distance: number;
    rescuerLat: number;
    rescuerLng: number;
  }
}

export type AedDeviceAreaLookWithRoute = OsmClient.AedDeviceAreaLookWithRoute;

export type AedDevicePreviewWithRouteDto = OsmServer.AedDevicePreviewWithRouteDto;

declare namespace OsmGeneral {
  type geometry = string;
  type code = string;
  type weight = number;
  type distance = number;
  type duration = number;
  type driving_side = string;
  type Mode = { ferry: { default: string; destination: string; name: string } };
  type name = string;

  interface Waypoint {
    hint: string;
    distance: number;
    location: number[];
    name: string;
  }
  type Waypoints = Waypoint[];
  type coordinates = LatLng[];
  type waypointIndices = number[];
  interface Instruction {
    direction: string;
    distance: distance;
    exit: string;
    index: number;
    mode: string;
    modifier: string;
    road: string;
    text: string;
    time: number;
    type: string;
  }
  interface Summary {
    totalDistance: number;
    totalTime: number;
  }
  type instructions = Instruction[];
  type summary = Summary;

  interface ResponseRouteInfo {
    coordinates: coordinates;
    instructions: instructions;
    name: string;
    summary: Summary;
    waypointIndices?: waypointIndices;
  }

  interface Maneuver {
    bearing_after: number;
    location: number[];
    type: string;
    bearing_before: number;
    modifier: Modifier;
    exit?: number;
  }

  type Modifier =
    | "left"
    | "right"
    | "sharp left"
    | "sharp right"
    | "slight left"
    | "slight right"
    | "straight"
    | "uturn";

  interface Language {}
  interface Summary {
    totalDistance: OsmGeneral.distance;
    totalTime: OsmGeneral.duration;
  }
  interface OsrmInstruction {
    name: string;
    coordinates: LatLng[];
    instructions: any[];
    summary: Summary;
  }
  interface OsrmWaypoints {
    waypoints: { lat: number; lon: number }[];
  }
  interface OsrmWaypointsExtra {
    aedDeviceId: string;
    aedEventId: string;
    locale: string;
    waypoints: { lat: number; lon: number }[];
  }

  interface Lane {
    valid: boolean;
  }
  interface Intersections {
    lanes: Lane[];
  }

  interface Steps {
    intersections: Intersections[];
    driving_side: driving_side;
    geometry: geometry;
    duration: duration;
    distance: distance;
    name: name;
    weight: weight;
    mode: Mode;
    maneuver: Maneuver;
    rotary_name?: string;
    destinations?: string;
    exits?: string;
    junction_name?: string;
  }

  interface Leg {
    steps: Steps[];
    weight: weight;
    distance: distance;
    summary: string;
    duration: duration;
  }

  interface Routes {
    legs: Leg[];
    weight_name: string;
    geometry: geometry;
    weight: weight;
    distance: distance;
    duration: duration;
  }

  interface OsmResponse {
    code: code;
    waypoints: Waypoints;
    routes: Routes[];
  }
}

export type Instruction = OsmGeneral.Instruction;
export type Summary = OsmGeneral.Summary;
export type RouteInfo = OsmGeneral.ResponseRouteInfo;
export type OsrmWaypoints = OsmGeneral.OsrmWaypoints;
export type OsrmInstruction = OsmGeneral.OsrmInstruction;
export type OsrmWaypointsExtra = OsmGeneral.OsrmWaypointsExtra;
export type Geometry = OsmGeneral.geometry;
export type Maneuver = OsmGeneral.Maneuver;
export type OsmResponse = OsmGeneral.OsmResponse;
export type Routes = OsmGeneral.Routes;

export interface SearchOsmAddress {
  address: string;
}

export interface ReverseOsmLatLon {
  lat: number;
  lon: number;
}

export interface OsmAddress {
  city: string;
  country: string;
  country_code: string;
  county: string;
  house_number: string;
  neighbourhood: string;
  postcode: string;
  road: string;
  state: string;
  state_district: string;
  suburb: string;
}

export interface DevRoutesResult {
  locale: string;
  devRoutes: AedDevicePreviewWithRouteDto[];
}

export interface RouteResult {
  aedDeviceId: string;
  aedEventId: string;
  responseRoute: OsrmInstruction;
}

export interface ReverseOsmData {
  place_id: number;
  licence: string;
  osm_id: number;
  osm_type: string;
  address: OsmAddress;
  boundingbox: string[];
  display_name: string;
  lat: string;
  lon: string;
}
