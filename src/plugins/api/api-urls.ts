export const userApi: Record<string, string> = {
    user: "user.filter.by.id",
    searchPreview: "user.get.preview",
    userData: "/user/user_data",
    usersByUsernameLike: "user.get.username.like",
    personal: "user.put.personal.info",
    getPrivacySets: "user.get.privacy.sets",
    putPrivacySets: "user.put.privacy.info",
    status: "user.put.availability.state.",
};

export const cdnApi: Record<string, string> = {
    avatar: "cdn.user.put.avatar",
    putAvatarPic: "/cdn/put_avatar_pic",
    aedDeviceRegister: "/cdn/put_aed_device_pics",
    aedDevicePic: "/cdn/put_aed_device_pic",
    aedDeviceAddressPic: "/cdn/put_aed_device_address_pic"
};

export const authApi: Record<string, string> = {
    login: "/auth/login",
    logout: "/auth/logout",
    signup: "auth.signup",
    checkUsername: "auth.username.check",
    checkEmail: "auth.email.check",
    accessToken: "/auth/token/access_token",
    userData: "/auth/token/user_data"
};

export const eventApi: Record<string, string> = {
    createEvent: "aed.event.post",
    findOccurrenceType: "aed.event.get",
    findEventId: "aed.event.getId",
    aedEventsListen: "aed.event.listen",
    aedEventListenSub: "aed.event.listen.sub",
    aedEventsFetchUnassigned: "aed.event.fetch.pending",
    aedEventPush: "aed.event.push",
    subRescuer: "aed.event.subRescuer",
    closeAedEvent: "aed.event.close"
};

export const osmApi: Record<string, string> = {
    osmSearchAddress: "aed.osm.search",
    osmReverseSearch: "aed.osm.reverse",
    osrmSearchWaypoints: "aed.osrm.search",
    osrmSearchRescDevEv: "aed.osrm.search.resc_dev_ev"
}

export const aedDeviceApi: Record<string, string> = {
    registerAedDevice: "aed.device.register",
    fetchAedDevice: "aed.device.fetch.byId",
    fetchAedDeviceInArea: "aed.device.fetch.inArea",
    fetchAedDeviceInAreaAvailable: "aed.device.fetch.inArea.available",
    fetchAedDeviceInAreaAvailableWithRouteInfo: "aed.device.fetch.inArea.available.withRouteInfo",
    fetchAedDevicePreviews: "aed.device.fetch.preview.byNickname",
    editAedDeviceInfo: "aed.device.info.edit"
}

export const newsApi: Record<string, string> = {
    createNews: "news.post",
    findNews: "news.get",
    findNewsId: "news.getId"
};

export const problemsApi: Record<string, string> = {
    createProblems: "aed.problems.post",
    findProblems: "aed.problems.get",
    findProblemsId: "aed.problems.getId",
    subTechnical: "aed.problems.subTechnical",
    closeAedProblems: "aed.problems.close"
}

export function apiWithVar(api: string, variable: string | undefined) {
    return api + "/" + variable;
}
