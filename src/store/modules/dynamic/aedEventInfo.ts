import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import {AedEventCloseInfo, AedEventMore, AedEventRescuerInfo, EventDto} from "@/types";
import {accessToken, aedRSocketApi} from "@/plugins/api";
import {bufToJson, dataBuf, metadataBuf} from "@/plugins/api/rsocket-util";
import {eventApi} from "@/plugins/api/api-urls";
import {statusOptions} from "@/plugins/enums/event-options";

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
    address = "";
    comment = "";
    status= statusOptions.UNKNOWN
    requestedTime = [0];

    @Mutation
    setAedEventInfo(data: AedEventMore) {
        this.id = data.id;
        this.userid = data.userid;
        this.username = data.username;
        this.occurrenceType = data.occurrenceType;
        this.address = data.address;
        this.comment = data.comment;
        this.status = data.status;
        this.requestedTime = data.requestedTime;
    }

    @Mutation
    setStatusOnProgress(){
        this.status=statusOptions.ONPROGRESS;
    }
    @Mutation
    setStatusCompleted(){
        this.status=statusOptions.COMPLETED;
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

    @Action({commit:"setStatusCompleted"})
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