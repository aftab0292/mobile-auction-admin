import base from './base';

export const uploadFileApi = (type, formData) => base.post(`/utils/upload/${type}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});