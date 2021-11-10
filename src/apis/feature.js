import base from './base';

export const fetchFeatureApi = ({
        page,
        sizePerPage,
        searchedTerm,
        sortKey,
        sortType,
    }) => base.get(`/features/list?page=${page}&perPage=${sizePerPage}&searchedTerm=${searchedTerm}&sortKey=${sortKey}&sortType=${sortType}`);

export const addFeatureApi = formData => base.post(`/features`, formData);

export const editFeatureApi = id => base.get(`/features/${id}`);

export const updateFeatureApi = (id, formData) => base.put(`/features/update/${id}`, formData);

export const updateFeatureStatusApi = ({ id, status }) => base.get(`/features/update-status/${id}?status=${status}`);

export const deleteFeatureApi = id => base.delete(`/features/delete/${id}`);

export const fetchFeatureUsersApi = ({
        page,
        sizePerPage,
        searchedTerm,
        sortKey,
        sortType,
     }) => base.get(`/features/users?page=${page}&perPage=${sizePerPage}&searchedTerm=${searchedTerm}&sortKey=${sortKey}&sortType=${sortType}`);

