import Vue from 'vue';

export default Vue.prototype.$WSMessageTypes = {
    route:{
        WS: {
            name: "WS",
            send_events: {
                WS_EVENT: {
                    name: "WS_EVENT",
                    SEND_SIGNOUT: "SEND_SIGNOUT",
                    SEND_BAN_USER: "SEND_BAN_USER",
                }
            },
            receive_events: {
                WS_EVENT: {
                    name: "WS_EVENT",
                    RECEIVE_USER_BANNED: "RECEIVE_USER_BANNED"
                }   
            }
        },
        CHAT: {
            name: "CHAT",
            send_events: {
                CHATROOM_EVENT: {
                    name: "CHATROOM_EVENT",
                    SEND_LISTEN_CHATROOM: "SEND_LISTEN_CHATROOM",
                    SEND_CHATMESSAGE: "SEND_CHATMESSAGE",
                    SEND_READ_CHATMESSAGE: "SEND_READ_CHATMESSAGE",
                    SEND_UNREAD_CHATMESSAGE: "SEND_UNREAD_CHATMESSAGE",
                    SEND_DELETE_CHATMESSAGE: "SEND_DELETE_CHATMESSAGE",
                    SEND_INVITE_USER: "SEND_INVITE_USER",
                    SEND_KICK_USER: "SEND_KICK_USER",
                    SEND_CHANGE_CHATROOM_NAME: "SEND_CHANGE_CHATROOM_NAME",
                    SEND_SHOW_USER_AVAILABILITY: "SEND_SHOW_USER_AVAILABILITY"
                },
                CHATS_EVENT: {
                    name: "CHATS_EVENT",
                    SEND_LISTEN_CHATS: "SEND_LISTEN_CHATS",
                    SEND_OPEN_CHATROOM: "SEND_OPEN_CHATROOM",
                    SEND_BAN_CHAT_USER: "SEND_BAN_CHAT_USER",
                }
            },
            receive_events: {
                CHATROOM_EVENT: {
                    name: "CHATROOM_EVENT",
                    RECEIVE_CHATMESSAGE: "RECEIVE_CHATMESSAGE",
                    RECEIVE_READ_CHATMESSAGE: "RECEIVE_READ_CHATMESSAGE",
                    RECEIVE_CHATNAME: "RECEIVE_CHATNAME",
                    RECEIVE_USER_AVAILABILITY: "RECEIVE_USER_AVAILABILITY",
                    RECEIVE_DELETED_CHATMESSAGE: "RECEIVE_DELETED_CHATMESSAGE",
                    RECEIVE_INVITED_USER: "RECEIVE_INVITED_USER",
                    RECEIVE_KICKED_USER: "RECEIVE_KICKED_USER",
                    RECEIVE_UNREAD_CHATMESSAGE: "RECEIVE_UNREAD_CHATMESSAGE",
                },
                CHATS_EVENT: {
                    name: "CHATS_EVENT",
                    RECEIVE_CHATS: "RECEIVE_CHATS",
                    RECEIVE_INVITED_CHATROOM: "RECEIVE_INVITED_CHATROOM",
                    RECEIVE_BANNED_CHAT_USER: "RECEIVE_BANNED_CHAT_USER"
                }
            }
        },
        LIVEMAP: {
            name: "LIVEMAP",
            send_events: {
                SEND_LISTEN_AEDS_ALL: "SEND_LISTEN_AEDS_ALL",
                SEND_AED_POS:        "SEND_AED_POS"
            }
        },
        LIVE_REPORTSMAP: {
            name: "LIVE_REPORTSMAP",
            send_events: {
                REPORTSMAP: {
                    name: "REPORTSMAP",
                    SEND_PUSH_REPORT: "SEND_PUSH_REPORT",
                    SEND_OPEN_REPORT: "SEND_OPEN_REPORT",
                    SEND_CLOSE_REPORT: "SEND_CLOSE_REPORT",
                    SEND_EDIT_REPORT: "SEND_EDIT_REPORT",
                    SEND_LISTEN_REPORTS: "SEND_LISTEN_REPORTS",
                    SEND_LISTEN_SELECTIVE_REPORTS: "SEND_LISTEN_SELECTIVE_REPORTS",
                    SEND_PERSIST_REPORTS_LISTENER: "SEND_PERSIST_REPORTS_LISTENER"
                },
            },
        },
        LIVE_EVENTSMAP: {
            name: "LIVE_EVENTSMAP",
            send_events: {
                EVENTSMAP: {
                    name: "EVENTSMAP",
                    SEND_PUSH_EVENT: "SEND_PUSH_EVENT",
                    SEND_OPEN_EVENT: "SEND_OPEN_EVENT",
                    SEND_CLOSE_EVENT: "SEND_CLOSE_EVENT",
                    SEND_SHOW_HISTORY: "SEND_SHOW_HISTORY",
                    SEND_EDIT_EVENT: "SEND_EDIT_EVENT",
                    SEND_LISTEN_EVENTS: "SEND_LISTEN_EVENTS",
                    SEND_LISTEN_SELECTIVE_INJEVENTS: "SEND_LISTEN_SELECTIVE_INJEVENTS",
                    SEND_PERSIST_INJEVENTS_LISTENER: "SEND_PERSIST_INJEVENTS_LISTENER"
                },
            },
        }
    },
};