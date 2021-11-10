import base from './base';

export const fetchUsersApi = (
    {
        page,
        sizePerPage,
        searchedTerm,
        sortKey,
        sortType
    }) => base.get(`/users?page=${page}&perPage=${sizePerPage}&searchedTerm=${searchedTerm}&sortKey=${sortKey}&sortType=${sortType}`);

export const viewUserApi = ({ id }) => base.get(`/users/${id}`);

export const updateUserStatusApi = ({ id, status }) => base.get(`/users/update-status/${id}?status=${status}`);

export const deleteUserApi = ({ id }) => base.delete(`/users/${id}`);
