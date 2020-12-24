import { LatLng } from "leaflet";

declare namespace Osm {
  type geometry = string;
  type code = string;
  type weight = number;
  type distance = number;
  type duration = number;
  type driving_side = string;
  type Mode = { ferry: { default: string; destination: string; name: string; }; };
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
    direction: string,
    distance: distance,
    exit: string,
    index: number,
    mode: string,
    modifier: string,
    road: string,
    text: string,
    time: number,
    type: string
  }
  interface Summary {
    totalDistance: number,
    totalTime: number
  }
  type instructions = Instruction[];
  type summary = Summary

  interface ResponseRouteInfo {
    coordinates: coordinates,
    instructions: instructions,
    name: string,
    summary: Summary,
    waypointIndices: waypointIndices
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
    totalDistance: Osm.distance;
    totalTime: Osm.duration;
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
    valid: boolean
  }
  interface Intersections {
    lanes: Lane[]
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

export type Instruction = Osm.Instruction;
export type Summary = Osm.Summary;
export type ResponseRouteInfo = Osm.ResponseRouteInfo;
export type OsrmWaypoints = Osm.OsrmWaypoints;
export type OsrmInstruction = Osm.OsrmInstruction;
export type OsrmWaypointsExtra = Osm.OsrmWaypointsExtra;
export type Geometry = Osm.geometry;
export type Maneuver = Osm.Maneuver;
export type OsmResponse = Osm.OsmResponse;
export type Routes = Osm.Routes;

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

export interface IReverseOsmData {
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
