import api from "@plugins/api.js";
import apiUrls from "@plugins/apiUrls.js";

const state = {
    
    userid: null,
    username: null,
    name: null,
    surname: null,
    email: null,
    avatar: null,
    phone: null,
    country_code: null,
    country: null,
    province: null,
    city: null,
    street: null,
    address: null,
    role: null,
    status: null,
    online: null,
    availability: null,
    description: null,
    
    last_login_android: null,
    last_logout_android: null,
    last_login_ios: null,
    last_logout_ios: null,
    last_login_web: null,
    last_logout_web: null,
    user_created: null,
    user_updated: null,
    online_for_android: null,
    offline_for_android: null,
    online_for_ios: null,
    offline_for_ios: null,
    online_for_web: null,
    offline_for_web: null,

    cred_stars: {
      rating: null,
      emptyIcon: 'mdi-star-outline',
      fullIcon: 'mdi-star',
      halfIcon: 'mdi-star-half',
      length: 5,
      hover: true,
      readonly: false,
      size: 20,
    },
    
    isOnline: true,
    showOnline: true,
    showLastLoginAndroid: false,
    showLastLogoutAndroid: false,
    showLastLoginIos: false,
    showLastLogoutIos: false,
    showLastLoginWeb: false,
    showLastLogoutWeb: false,
    showOnlineFor_Android: false,
    showOnlineFor_Ios: false,
    showOnlineFor_Web: false,
    showOfflineFor_Android: false,
    showOfflineFor_Ios: false,
    showOfflineFor_Web: false,
    showUserVerified: false,
    showUserCreated: false,
    showUserUpdated: false,
    showRealName: false,
    showEmail: false,
    showAddress: false,
    showCredibilityStars: false,
    showPhone: false,
      
};

const getters = {
    getProfileData: (state) => {
        return {
            userid: state.userid,
            username: state.username,
            name: state.name,
            surname: state.surname,
            email: state.email,
            avatar: state.avatar,
            description: state.description,
            country_code: state.country_code,
            province: state.province,
            city: state.city,
            phone: state.phone,
            online: state.online,
            availability: state.availability,
            role: state.role,
        };
    },
    getProfileMetaData: (state) => {
        return {
            last_login_android: state.last_login_android,
            last_logout_android: state.last_logout_android,
            last_login_ios: state.last_login_ios,
            last_logout_ios: state.last_logout_ios,
            last_login_web: state.last_login_web,
            last_logout_web: state.last_logout_web,
            user_created: state.user_created,
            user_updated: state.user_updated,
            online_for_android: state.online_for_android,
            offline_for_android: state.offline_for_android,
            online_for_ios: state.online_for_ios,
            offline_for_ios: state.offline_for_ios,
            online_for_web: state.online_for_web,
            offline_for_web: state.offline_for_web,
            cred_stats: state.cred_stars
        };
    },
    getProfileVisibility: (state) => {
        return {
            isOnline: state.isOnline,
            showOnline: state.showOnline,
            showLastLoginAndroid: state.showLastLoginAndroid,
            showLastLogoutAndroid: state.showLastLogoutAndroid,
            showLastLoginIos: state.showLastLoginIos,
            showLastLogouIos: state.showLastLogoutIos,
            showLastLoginWeb: state.showLastLoginWeb,
            showLastLogoutWeb: state.showLastLogoutWeb,
            showOnlineFor_Android: state.showOnlineFor_Android,
            showOfflineFor_Android: state.showOfflineFor_Android,
            showOnlineFor_Ios: state.showOnlineFor_Ios,
            showOfflineFor_Ios: state.showOfflineFor_Ios,
            showOnlineFor_Web: state.showOnlineFor_Web,
            showOfflineFor_Web: state.showOfflineFor_Web,
            showUserVerified: state.showUserVerified,
            showUserCreated: state.showUserCreated,
            showUserUpdated: state.showUserUpdated,
            showRealName: state.showRealName,
            showEmail: state.showEmail,
            showAddress: state.showAddress,
            showCredibilityStars: state.showCredibilityStars,
            showPhone: state.showPhone
        };
    }
};

const mutations = {
    setUserData(state, data) {
        data.userid = data.id;
        data.username = data.user;
        setProfileData(state, data);
        setMetaData(state, data);
        setVisiblityData(state);
    },
    setAvatar(state, data) {
        state.avatar = data.avatar;
    },
    setPersonalInfo(state, data) {
        state.name = data.name;
        state.surname = data.surname;
        state.description = data.description;
    },
};

function setProfileData(state, data) {
    state.userid = data.userid;
    state.username = data.username;
    state.name = data.name;
    state.surname = data.surname;
    state.email = data.email;
    state.avatar = data.avatar;
    state.description = data.description;
    state.country_code = data.country_code;
    state.province = data.province;
    state.city = data.city;
    state.phone = data.phone;
    state.online = data.online;
    state.availability = data.availability;
    state.role = data.role;
}

function setMetaData(state, data) {
    state.last_login_android = data.last_login_android;
    state.last_logout_android = data.last_logout_android;
    state.last_login_ios = data.last_login_ios;
    state.last_logout_ios = data.last_logout_ios;
    state.last_login_web = data.last_login_web;
    state.last_logout_web = data.last_logout_web;
    state.user_created = data.user_created;
    state.user_updated = data.user_updated;
    state.online_for_android = new Date(1995, 11, 17, 3, 24, 0)
}

 function setVisiblityData(state) {
    state.isOnline = state.online !== null;
    state.showLastLoginAndroid = state.last_login_android !== null;
    state.showLastLogoutAndroid = state.last_logout_android !== null;
    state.showLastLoginIos= state.last_login_ios !== null;
    state.showLastLogoutIos = state.last_logout_ios !== null;
    state.showLastLoginWeb = state.last_login_web !== null;
    state.showLastLogoutWeb = state.last_logout_web !== null;
    state.showOnlineFor_Android = state.showLastLoginAndroid && state.showLastLogoutAndroid;
    state.showOfflineFor_Android = state.showLastLoginAndroid && state.showLastLogoutAndroid;
    state.showOnlineFor_Ios = state.showLastLoginIos && state.showLastLogoutIos;
    state.showOfflineFor_Ios = state.showLastLoginIos && state.showLastLogoutIos;
    state.showOnlineFor_Web = state.showLastLoginWeb && state.showLastLogoutWeb;
    state.showOfflineFor_Web = state.showLastLoginWeb && state.showLastLogoutWeb;
    state.showUserVerified = state.showUserVerified;
    state.showUserCreated = state.user_created !== null && state.user_created !== undefined;
    state.showUserUpdated = state.user_updated !== null && state.user_updated !== undefined;
    state.showRealName = state.name !== null && state.surname !== null;
    state.showEmail = state.email !== null;
    state.showAddress = state.country_code !== null ;
    state.showCredibilityStars = state.cred_stars.rating !== null;
    state.showPhone = state.phone !== null;
}

const actions = {
    async profileData({ state }, data) {
        return await api.axiosApi.get(apiUrls.user.user + data.userid);
    },
    async editProfileData({state}, data) {
        return await api.axiosApi.put(apiUrls.user.user + state.userid + apiUrls.user.personal, data);
    },
    async editProfileAvatar({state}, data) {
        return await api.axiosApi.put(apiUrls.user.user + state.userid + apiUrls.user.avatar, data, 
            { headers: {'Accept': 'multipart/form-data', 'Content-Type': 'multipart/form-data' }});
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}