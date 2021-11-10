import {
    FETCH_USERS,
    VIEW_USER,
    UPDATE_USER_STATUS,
    DELETE_USER,
} from "./types";

import {
    fetchUsersApi,
    viewUserApi,
    updateUserStatusApi,
    deleteUserApi
} from "~apis/users";

export const fetchUsers = searchData => async dispatch => {
    const { data: { count, users } } = await fetchUsersApi(searchData);
    dispatch({
        type: FETCH_USERS,
        payload: {
            count,
            users,
            page: searchData.page,
            sizePerPage: searchData.sizePerPage,
            searchedTerm: searchData.searchedTerm,
            sort: {
                [searchData.sortKey]: searchData.sortType
            }
        }
    });
};

export const viewUser = id => async dispatch => {
    const {data} = await viewUserApi({id});
    dispatch({
        type: VIEW_USER,
        payload: {
            view: data
        }
    });
};

export const updateUserStatus = (id, status) => async dispatch => {
    const {success} = await updateUserStatusApi({id, status});
    success && dispatch({
        type: UPDATE_USER_STATUS,
        payload: {
            id,
            status
        }
    });
};

export const deleteUser = id => async dispatch => {
    const {success} = await deleteUserApi({id});
    success && dispatch({
        type: DELETE_USER,
        payload: {
            id
        }
    });
};
