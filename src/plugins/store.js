import Vue from "vue";
import Vuex from "vuex";
import search from "@/plugins/store_modules/search";
import profile from "@/plugins/store_modules/profile";
import api from "@/plugins/api.js";
import apiUrls from "@/plugins/apiUrls.js";

Vue.use(Vuex);

const store = new Vuex.Store({
    namespace: true,
    state: {
        locale: "en",
        theme: "dark",
        userid: "",
        username: "",
        name: "",
        surname: "",
        email: "",
        avatar: "",
        description: "",
        roles: "",
        online: "",
        availability: "",
        domain: document.querySelector('meta[name="serve"]').getAttribute('content'),
        device: document.querySelector('meta[name="device"]').getAttribute('content'),
    },
    mutations: {
        setAvatar(state, data) {
            state.avatar = data.avatar;
        },
        setTheme(state, data) {
            state.theme = data;
        },
        setLocale(state, data) {
            state.locale = data.locale;
        },
        setPersonalInfo(state, data) {
            state.name = data.name;
            state.surname = data.surname;
            state.description = data.description;
        },
        setStatus(state, data) {
            state.availability = data.status;
        },
        setUserData(state, data) {
            console.log(data.roles);
            state.userid = data.id;
            state.username = data.user;
            state.name = data.name;
            state.surname = data.surname;
            state.email = data.email;
            state.avatar = data.avatar;
            state.description = data.description;
            state.online = data.online;
            state.availability = data.availability;
            state.roles = data.roles;
        }
    },
    getters: {
        getRoles: state => {
            return state.roles;
        },
        getLocale: state => {
            return state.locale;
        },  
        getUserID: state => {
            return state.userid;
        },
        isSignedIn: state => {
            return state.userid != "" && state.username !="";
        },
        getIsDarkMode: state => {
            return state.theme == "dark";
        },
        getAvatar: state => {
            return state.avatar;
        },
        getAvailability: state => {
            return state.availability;
        },
        getUsername: state => {
            return state.username;
        }
    },
    actions: {
        async fetchUserData({ commit }) {
            await api.axiosApi.post(apiUrls.user.user_data).then(response => {
                commit('setUserData', response.data);
            });
        },
        async loginUser({state}, data) {
            return await api.axiosApi.post(apiUrls.auth.login, { 
                user: data.user,
                pass: data.pass,
            });
        },
        async registerUser({state}, data) {
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
        },
        async changeStatus({state}, data) {
            return await api.axiosApi.put(apiUrls.user.user + state.userid + apiUrls.user.status, data);
        }
    },
    modules: {
        search: search,
        profile: profile
    }
});

export default store;