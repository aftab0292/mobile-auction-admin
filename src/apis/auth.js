import base from './base';

export const signInApi = ({email, password}) => base.post('/auth/log-in', {email, password});

export const forgotPasswordApi = ({email}) => base.post('/auth/forgot-password', {email});

export const resetPasswordApi = ({email, otp, newPassword}) => base.post('/auth/reset-password', {email, otp, newPassword});

export const ChangePasswordApi = ({currentPassword, newPassword}) => base.post('/change-password', {currentPassword, newPassword});

export const updateProfileApi = formData => base.post('/profile', formData);

export const getSettingApi = () => base.get('/settings');

export const updateSettingApi = formData => base.post('/settings', formData);

