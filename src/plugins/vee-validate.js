import {
    extend,
    configure
} from "vee-validate";
import {
    required,
    email,
    min,
    max,
    regex
} from "vee-validate/dist/rules";
import i18n from "./i18n.js";
import babelPolyfill from 'babel-polyfill';
import api from './api.js';
import apiUrls from './apiUrls.js';

configure({
    defaultMessage: (field, values) => {
        values._field_ = i18n.t(`fields.${field}`);

        return i18n.t(`validation.${values._rule_}`, values);
    }
});

extend("regex_email", {
    ...email,
    message: (_, values) => i18n.t('validations.field_invalid', [_])
});

///Override the default message.
extend('required', {
    ...required,
    // the values param is the placeholders values
    message: (_, values) => i18n.t('validations.required', [_])
});
extend("positive", value => {
    return value >= 0;
});

extend("username_regex", {
    ...regex,
    message: (_, values) => i18n.t('validations.username_regex')
});

extend("unique_username", {
    validate: async function (username) {
        if (username.length < 2) return;
        
        try {
           await api.axiosApi.post(apiUrls.auth.check_username, { user: username });
           return true;
        } catch (err) {
            if (err.response.status === 400) { return false; }
        }
    },
    message: (_, values) =>  i18n.t('validations.field_taken', [i18n.t('fields.username')])
});

extend("unique_email", {
    validate: async function (email) {
        if (email.length < 5) return;

        try {
           await api.axiosApi.post(apiUrls.auth.check_email, { email: email });
           return true;
        } catch (err) {
            if (err.response.status === 400) { return false; }
        }
    },
    message: (_, values) =>  i18n.t('validations.field_taken', [i18n.t('fields.email')])
});

extend("password_regex", {
    ...regex,
    message: (_, values) => i18n.t('validations.pass_regex')
});

extend("min", {
    ...min,
    //values._field_
    //values.rule
    //values.length
    //values._value_
    message: (_, values) => i18n.t('validations.min', [_, values.length])
});


extend('Password', {
    params: ['target'],
    validate(value, {
        target
    }) {
        return value === target;
    },
    message: (_, values) => i18n.t('validations.pass_match')
});

extend("max", {
    ...max,
    message: (_, values) => i18n.t('validations.max', [_, values.length])
});

extend("minmax", {
    validate(value, {
        min,
        max
    }) {
        return value.length >= min && value.length <= max;
    },
    params: ["min", "max"],
    message: (_, values) => i18n.t('validations.between', [_, values.min, values.max])
});