import {
    FETCH_CATEGORIES,
    EDIT_CATEGORY,
    UPDATE_CATEGORY_STATUS,
    DELETE_CATEGORY,
} from "./types";

import {
    fetchCategoriesApi,
    addCategoryApi,
    editCategoryApi,
    updateCategoryApi,
    updateCategoryStatusApi,
    deleteCategoryApi
} from "~apis/category";
import { toast } from 'react-toastify';

export const fetchCategories = searchData => async dispatch => {
    const { data: { count, categories } } = await fetchCategoriesApi(searchData);
    dispatch({
        type: FETCH_CATEGORIES,
        payload: {
            count,
            categories,
            page: searchData.page,
            sizePerPage: searchData.sizePerPage,
            searchedTerm: searchData.searchedTerm,
            sort: {
                [searchData.sortKey]: searchData.sortType
            }
        }
    })
};

export const addCategory = (formData, redirect) => async () => {
    const {success, message} = await addCategoryApi(formData);
    success && redirect(formData.parent ? `/categories/sub-categories/${formData.parent}` : '/categories');
    success && toast(message);
};

export const editCategory = id => async dispatch => {
    const {data} = id ? await editCategoryApi(id) : {data: {}};
    dispatch({
        type: EDIT_CATEGORY,
        payload: {
            edit: data
        }
    });
};

export const updateCategory = (id, formData, redirect) => async () => {
    const {success, message} = await updateCategoryApi(id, formData);
    success && redirect('/categories');
    success && toast(message);
};

export const updateCategoryStatus = (id, status) => async dispatch => {
    const {success, message} = await updateCategoryStatusApi({id, status});
    success && dispatch({
        type: UPDATE_CATEGORY_STATUS,
        payload: {
            id,
            status
        }
    });
    success && toast(message);
};

export const deleteCategory = id => async dispatch => {
    const {success, message} = await deleteCategoryApi(id);
    success && dispatch({
        type: DELETE_CATEGORY,
        payload: {
            id
        }
    });
    success && toast(message);
};
