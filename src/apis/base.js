import axios from 'axios';
import {useStore} from "../util";
import {toast} from 'react-toastify';
import { __ } from '~i18n';

const api = useStore(axios.create({baseURL: '/api'}));
let activeToast = null;

api.interceptors.request.use(config => {
    const {getState} = api.store;
    const {
        auth: {
            isLoggedIn, token
        },
        settings: {
            language
        }
    } = getState();

    if(isLoggedIn) {
        config.headers.authorization = token;
    }
    config.headers['Accept-Language'] = language || 'en';
    return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => {
    const {success, data, message} = response.data;
    if (!success) {
        if (!toast.isActive(activeToast)) {
            activeToast = toast(message);
        }
    }
    return {success, data, message};
}, error => {
    if (!toast.isActive(activeToast)) {
        activeToast = toast(__('SERVER_NOT_FOUND'));
    }
    return Promise.reject(error);
});

export default api;
