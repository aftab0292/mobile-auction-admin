import {
    FETCH_FEATURES,
    EDIT_FEATURE,
    UPDATE_FEATURE_STATUS,
    DELETE_FEATURE,
    FETCH_FEATURE_USERS
} from "./types";

import {
    fetchFeatureApi,
    addFeatureApi,
    editFeatureApi,
    updateFeatureApi,
    updateFeatureStatusApi,
    deleteFeatureApi,
    fetchFeatureUsersApi
} from "~apis/feature";
import { toast } from 'react-toastify';

export const fetchFeatures = searchData => async dispatch => {
    const {data: {count, features}} = await fetchFeatureApi(searchData);
    dispatch({
        type: FETCH_FEATURES,
        payload: {
            count,
            features,
            page: searchData.page,
            sizePerPage: searchData.sizePerPage,
            searchedTerm: searchData.searchedTerm,
            sort: {
                [searchData.sortKey]: searchData.sortType
            }
        }
    });
};

export const addFeature = (formData, redirect) => async () => {
    const {success, message} = await addFeatureApi(formData);
    success && redirect('/features');
    success && toast(message);
};

export const editFeature = id => async dispatch => {
    const {data} = id ? await editFeatureApi(id) : {data: {}};
    dispatch({
        type: EDIT_FEATURE,
        payload: {
            edit: data
        }
    });
};

export const updateFeature = (id, formData, redirect) => async () => {
    const {success, message} = await updateFeatureApi(id, formData);
    success && redirect('/features');
    success && toast(message);
};

export const updateFeatureStatus = (id, status) => async dispatch => {
    const {success, message} = await updateFeatureStatusApi({id, status});
    success && dispatch({
        type: UPDATE_FEATURE_STATUS,
        payload: {
            id,
            status
        }
    });
    success && toast(message);
};

export const deleteFeature = id => async dispatch => {
    const {success, message} = await deleteFeatureApi(id);
    success && dispatch({
        type: DELETE_FEATURE,
        payload: {
            id
        }
    });
    success && toast(message);
};

export const fetchFeatureUsers = searchData => async dispatch => {
    const {data: {count, featureUsers}} = await fetchFeatureUsersApi(searchData);
    dispatch({
        type: FETCH_FEATURE_USERS,
        payload: {
            count,
            featureUsers,
            page: searchData.page,
            sizePerPage: searchData.sizePerPage,
            searchedTerm: searchData.searchedTerm,
            sort: {
                [searchData.sortKey]: searchData.sortType
            }
        }
    });
};
