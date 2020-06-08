import Vue from "vue";
import store from "../store";
import api from "../api.js";
import apiUrls from "../apiUrls.js";

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
