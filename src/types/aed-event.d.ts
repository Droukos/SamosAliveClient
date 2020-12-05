import {User} from "@/types/index";

declare namespace AedEvent {
    type id = string;
    type occurrenceType = number;
    type mapX = number;
    type mapY = number;
    interface occurrencePoint {
        x: AedEvent.mapX;
        y: AedEvent.mapY;
    }
    type address = string;
    type comment = string;
    type status = number;
    type requestedTime = string;//number [];
    type completedTime = string;
    type rescuer = string;
    type conclusion = string;

    interface AedEventCreateDto {
        username: User.Username;
        occurrenceType: AedEvent.occurrenceType;
        mapX: AedEvent.mapX;
        mapY: AedEvent.mapY;
        address: AedEvent.address;
        comment: AedEvent.comment;
    }
    interface AedEventCardDto{
        id: AedEvent.id;
        userid: User.UserId;
        username: User.Username;
        occurrenceType: AedEvent.occurrenceType;
        address: AedEvent.address;
        comment: AedEvent.comment;
        status: AedEvent.status;
        requestedTime: AedEvent.requestedTime;
    }
    interface AedEventInfoDto{
        id: AedEvent.id;
        userid: User.UserId;
        username: User.Username;
        occurrenceType: AedEvent.occurrenceType;
        occurrencePoint: AedEvent.occurrencePoint;
        address: AedEvent.address;
        comment: AedEvent.comment;
        status: AedEvent.status;
        requestedTime: AedEvent.requestedTime;
        completedTime: AedEvent.completedTime;
        rescuer: AedEvent.rescuer;
        conclusion: AedEvent.conclusion;
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
    }

    interface AedEventCloseInfo {
        id: AedEvent.id,
        conclusion: AedEvent.conclusion
    }
    export type EventDto = {
        id: AedEvent.id;
    }
}
export type AedEventCreateDto = AedEvent.AedEventCreateDto;
export type AedEventCardDto = AedEvent.AedEventCardDto;
export type AedEventInfoDto = AedEvent.AedEventInfoDto;
export type AedSearchInfo = AedEvent.AedSearchInfo;
export type AedEventRescuerInfo = AedEvent.AedEventRescuerInfo;
export type AedEventCloseInfo = AedEvent.AedEventCloseInfo;
export type EventDto = AedEvent.EventDto;
