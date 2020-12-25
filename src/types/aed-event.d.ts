import { User } from "@/types/index";
import {AedDevice, IAedDevPreview} from "@/types/aed-device";

declare namespace AedEvent {
  type id = string;
  type occurrenceType = number;
  type mapLat = number;
  type mapLon = number;
  interface OccurrencePoint {
    x: AedEvent.mapLat;
    y: AedEvent.mapLon;
  }
  type phone = string;
  type address = string;
  type comment = string;
  type status = number;
  type requestedTime = string; //number [];
  type completedTime = string;
  type rescuer = string;
  type callee = string;
  type conclusion = string;

  interface AedEventCreateDto {
    username: User.Username;
    occurrenceType: AedEvent.occurrenceType;
    mapLat: AedEvent.mapLat;
    mapLon: AedEvent.mapLon;
    callee: AedEvent.callee,
    phone: AedEvent.phone,
    address: AedEvent.address;
    comment: AedEvent.comment;
  }
  interface AedEventCardDto {
    id: AedEvent.id;
    username: User.Username;
    occurrenceType: AedEvent.occurrenceType;
    address: AedEvent.address;
    comment: AedEvent.comment;
    status: AedEvent.status;
    requestedTime: AedEvent.requestedTime;
  }
  interface Comment {
    username: string,
    message: string,
    posted: string
  }
  interface AedEventInfoDto {
    id: AedEvent.id,
    username: User.Username,
    occurrenceType: AedEvent.occurrenceType,
    occurrencePoint: AedEvent.OccurrencePoint,
    aedDeviceId: AedDevice.AedDeviceId,
    address: AedEvent.address,
    comment: AedEvent.comment,
    status: AedEvent.status,
    phone: AedEvent.phone,
    requestedTime: AedEvent.requestedTime,
    completedTime: AedEvent.completedTime,
    rescuer: AedEvent.rescuer,
    conclusion: AedEvent.conclusion,
    callee: AedEvent.callee,
    comments?: Comment
  }

  interface AedEventComplete {
    completedTime: AedEvent.completedTime;
    rescuer: AedEvent.rescuer;
    conclusion: AedEvent.conclusion;
  }

  interface AedSearchInfo {
    occurrenceType: AedEvent.occurrenceType;
    status: AedEvent.status;
  }

  interface AedEventRescuerInfo {
    id: AedEvent.id;
    rescuer: AedEvent.rescuer;
    aedDeviceId: AedDevice.AedDeviceId;
    aedDevicePreview?: IAedDevPreview
  }

  interface AedEventCloseInfo {
    id: AedEvent.id;
    conclusion: AedEvent.conclusion;
  }
  export type EventDto = {
    id: AedEvent.id;
  };
}
export type AedEventCreateDto = AedEvent.AedEventCreateDto;
export type AedEventCardDto = AedEvent.AedEventCardDto;
export type AedEventInfoDto = AedEvent.AedEventInfoDto;
export type AedSearchInfo = AedEvent.AedSearchInfo;
export type AedEventRescuerInfo = AedEvent.AedEventRescuerInfo;
export type AedEventCloseInfo = AedEvent.AedEventCloseInfo;
export type EventDto = AedEvent.EventDto;
