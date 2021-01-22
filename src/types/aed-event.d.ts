import {PreviewRescuer, PreviewUserCh, User} from "@/types/index";
import {AedDevice, IAedDevPreview} from "@/types/aed-device";
import {ISubscription} from "rsocket-types";
import AedComment = AedEvent.AedComment;

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
    commsN: number
  }

  interface AedDeviceRescuer {
    id: string,
    uniqueNickname: AedDevice.UniqueNickname;
    modelName: AedDevice.ModelName;
    description: AedDevice.ModelDescription;
    status: AedDevice.Status;
    picUrl: AedDevice.DevicePic;
    address: AedDevice.Address;
    homePoint: AedDevice.HomePoint;
    onEventId: AedDevice.OnEventId;
    takenOn: AedDevice.TakenOn;
    estimatedFinish: AedDevice.EstimatedFinish;
    rescuerUsername: User.Username;
    rescuerName: User.Name;
    rescuerSurname: User.Surname;
    rescuerEmail: User.Email;
    rescuerPhone: User.Phone;
    rescuerAvatar: User.Avatar;
    rescuerStatus: User.Availability;
    rescuerRoles: string[];
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
    estimatedFinish: AedDevice.EstimatedFinish;
    aedDevicePreview?: IAedDevPreview
  }

  interface AedEventCloseInfo {
    id: AedEvent.id;
    conclusion: AedEvent.conclusion;
  }
  export type EventDto = {
    id: AedEvent.id;
  };

  export interface AedEventCommentDto {
    eventId: string,
    comment: string
  }

  export interface AedComment {
    id: string,
    eventId: AedEvent.id,
    username: User.Username,
    message: string,
    posted: string,
    allComments?: number
  }

  export interface AedCommentReqDto {
    eventId: AedEvent.id,
    pageOffset: number
  }

  export interface AedCommentsResDto {
    pageOffset: number,
    comments: AedComment[];
  }

  export interface EventPreviewUsers {
    users: PreviewUserCh[];
  }
}

interface ChannelSubs {
  event: ISubscription;
  device: ISubscription;
  rescuer: ISubscription;
  users: ISubscription;
  discussion: ISubscription;
}

interface ChSubControl {
  evSub?: boolean;
  rescuerSub?: boolean;
  devSub?: boolean;
  usersSub?: boolean;
  discSub?: boolean;
}

export interface EventChannelSub {
  eventId: string;
  value: ChannelSubs;
}

export interface EventComment {
  eventId: string;
  value: AedComment;
}
export interface EventUser {
  eventId: string;
  value: PreviewUserCh;
}
export interface EventDevice {
  eventId: string;
  value: IAedDevPreview;
}

export interface EventUsers {
  eventId: string;
  value: PreviewUserCh[];
}

export interface EventRescuer {
  eventId: string;
  value: PreviewRescuer;
}

export interface EventInfo {
  eventId: string;
  value: AedEventInfoDto
}

export interface RescuerAndDevice {
  rescuer: PreviewRescuer,
  device: IAedDevPreview
}

export type AedEventCreateDto = AedEvent.AedEventCreateDto;
export type AedEventCardDto = AedEvent.AedEventCardDto;
export type AedEventInfoDto = AedEvent.AedEventInfoDto;
export type AedSearchInfo = AedEvent.AedSearchInfo;
export type AedEventRescuerInfo = AedEvent.AedEventRescuerInfo;
export type AedEventCloseInfo = AedEvent.AedEventCloseInfo;
export type EventDto = AedEvent.EventDto;
