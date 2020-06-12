import Vue from "vue";
import Vuex from "vuex";
import search from "@plugins/store_modules/search";
import profile from "@plugins/store_modules/profile";
import api from "@plugins/api.js";
import apiUrls from "@plugins/apiUrls.js";

Vue.use(Vuex);

const store = new Vuex.Store({
    namespace: true,
    state: {
        locale: "en",
        userid: "",
        username: "",
        name: "",
        surname: "",
        email: "",
        avatar: "",
        description: "",
        role: 0,
        online: "",
        availability: "",
        domain: document.querySelector('meta[name="serve"]').getAttribute('content'),
        device: document.querySelector('meta[name="device"]').getAttribute('content'),
    },
    mutations: {
        setAvatar(state, data) {
            state.avatar = data.avatar;
        },
        setLocale(state, data) {
            state.locale = data.locale;
        },
        setPersonalInfo(state, data) {
            state.name = data.name;
            state.surname = data.surname;
            state.description = data.description;
        },
        setUserData(state, data) {
            state.userid = data.id;
            state.username = data.user;
            state.name = data.name;
            state.surname = data.surname;
            state.email = data.email;
            state.avatar = data.avatar;
            state.description = data.description;
            state.online = data.online;
            state.availability = data.availability;
            state.role = data.role;
        }
        
    },
    getters: {
        getRole: state => {
            return state.role;
        },
        getLocale: state => {
            return state.locale;
        },  
        getUserID: state => {
            return state.userid;
        }
    },
    actions: {
        async fetchUserData({ commit }, url, data) {
            await api.axiosApi.post(apiUrls.user.user_data).then(response => {
                commit('setUserData', response.data);
            });
        },
        async loginUser({ state }, data) {
            return await api.axiosApi.post(apiUrls.auth.login, { 
                user: data.user,
                pass: data.pass,
            });
        },
        async registerUser({ state }, data) {
            return await api.axiosApi.post(apiUrls.auth.signup, {
                user: data.username,
                pass: data.password,
                passC: data.password_confirmed,
                prsn: {
                  name: data.name,
                  sur: data.surname
                },
                email: data.email
            });
        }
    },
    modules: {
        search: search,
        profile: profile
    }
});

export default store;