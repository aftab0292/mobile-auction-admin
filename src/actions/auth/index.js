import { SIGN_IN, SIGN_OUT, FORGOT_PASSWORD, UPDATE_PROFILE, SETTING } from './types';

import {
    signInApi,
    forgotPasswordApi,
    resetPasswordApi,
    ChangePasswordApi,
    updateProfileApi,
    getSettingApi,
    updateSettingApi,
} from '~apis/auth';
import { toast } from 'react-toastify';

export const signIn = ({ email, password }, redirect) => async dispatch => {
    const {
        success,
        data: { token, user },
    } = await signInApi({ email, password });
    if (success) {
        dispatch({
            type: SIGN_IN,
            payload: { token, user, isLoggedIn: true },
        });
        redirect('/');
    }
};

export const forgotPassword = ({ email }, redirect) => async dispatch => {
    const { success } = await forgotPasswordApi({ email });
    if (success) {
        dispatch({
            type: FORGOT_PASSWORD,
            payload: {
                user: {
                    email,
                },
            },
        });
        redirect('/auth/reset-password');
    }
};

export const updateProfile = data => async dispatch => {
    const { success, message } = await updateProfileApi(data);
    success &&
        dispatch({
            type: UPDATE_PROFILE,
            payload: {
                data,
            },
        });
    success && toast(message);
};

export const getSetting = () => async dispatch => {
    const {
        data: { setting },
    } = await getSettingApi();
    dispatch({
        type: SETTING,
        payload: {
            setting,
        },
    });
};

export const resetPassword = ({ email, otp, newPassword }, redirect) => async () => {
    const { success } = await resetPasswordApi({ email, otp, newPassword });
    success && redirect('/auth/log-in');
};
export const changePassword = ({ currentPassword, newPassword }, redirect) => async () => {
    const { success, message } = await ChangePasswordApi({ currentPassword, newPassword });
    success && toast(message);
    success && redirect('/');
};

export const updateSetting = (data) => async () => {
    const { success, message } = await updateSettingApi(data);
    success && toast(message);  
};

export const signOut = () => ({ type: SIGN_OUT });
