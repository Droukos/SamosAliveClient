import api from "@plugins/api.js";
import apiUrls from "@plugins/apiUrls.js";

const state = {

};

const getters = {

};

const actions = {
    async fetchUsersPreview({ rootState }, data) {
        return await api.axiosApi.post(apiUrls.user.search_preview, { user: data.user });
    }
};

const mutations = {

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
