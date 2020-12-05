import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import {AedEventCloseInfo, AedEventMore, AedEventRescuerInfo, EventDto} from "@/types/aed-event";
import {accessToken, aedRSocketApi} from "@/plugins/api";
import {bufToJson, dataBuf, metadataBuf} from "@/plugins/api/rsocket-util";
import {eventApi} from "@/plugins/api/api-urls";
import {statusOptions} from "@/plugins/enums/event-options";
import {AedEvent} from "@/types/aed-event";
import AedEventComplete = AedEvent.AedEventComplete;

@Module({
    dynamic: true,
    namespaced: true,
    store: store,
    name: "aedEventInfo"
})
export default class AedEventInfo extends VuexModule implements AedEventMore{
    id = "";
    userid = "";
    username = "";
    occurrenceType = 0;
    occurrencePoint = {x:0,y:0};
    address = "";
    comment = "";
    status= statusOptions.UNKNOWN
    requestedTime = "";
    completedTime = "";
    rescuer = "";
    conclusion = "";

    @Mutation
    setAedEventInfo(data: AedEventMore) {
        this.id = data.id;
        this.userid = data.userid;
        this.username = data.username;
        this.occurrenceType = data.occurrenceType;
        this.occurrencePoint = data.occurrencePoint;
        this.address = data.address;
        this.comment = data.comment;
        this.status = data.status;
        this.requestedTime = data.requestedTime;
        this.completedTime = data.completedTime;
        this.rescuer = data.rescuer;
        this.conclusion = data.conclusion;
    }

    @Mutation
    setStatusOnProgress(){
        this.status=statusOptions.ONPROGRESS;
    }
    @Mutation
    setEventCompleted(data: AedEventComplete){
        this.status=statusOptions.COMPLETED;
        this.completedTime = data.completedTime;
        this.rescuer = data.rescuer;
        this.conclusion = data.conclusion;
    }

    @Action({ commit: "setAedEventInfo" })
    async findEventId(data: EventDto) {
        return new Promise(resolve => {
            aedRSocketApi().then(aedRSocket =>
                aedRSocket
                    .requestResponse({
                        data: dataBuf(data),
                        metadata: metadataBuf(accessToken, eventApi.findEventId)
                    })
                    .subscribe({
                        onComplete: value => resolve(bufToJson(value)),
                        onError: error => console.error(error)
                    })
            );
        });
    }

    @Action({commit:"setStatusOnProgress"})
    async subRescuer(data: AedEventRescuerInfo) {
        return new Promise(resolve => {
            aedRSocketApi().then(aedRSocket =>
                aedRSocket
                    .requestResponse({
                        data: dataBuf(data),
                        metadata: metadataBuf(accessToken, eventApi.subRescuer)
                    })
                    .subscribe({
                        onComplete: value => resolve(bufToJson(value)),
                        onError: error => console.error(error)
                    })
            );
        });
    }

    @Action({commit:"setEventCompleted"})
    async closeAedEvent(data: AedEventCloseInfo) {
        return new Promise(resolve => {
            aedRSocketApi().then(aedRSocket =>
                aedRSocket
                    .requestResponse({
                        data: dataBuf(data),
                        metadata: metadataBuf(accessToken, eventApi.closeAedEvent)
                    })
                    .subscribe({
                        onComplete: value => resolve(bufToJson(value)),
                        onError: error => console.error(error)
                    })
            );
        });
    }
}