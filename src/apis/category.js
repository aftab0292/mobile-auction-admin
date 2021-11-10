import base from './base';

export const fetchCategoriesApi = ({
        page,
        sizePerPage,
        searchedTerm,
        sortKey,
        sortType,
        parent
    }) => base.get(`/categories/list${parent ? `/${parent}` : ''}?page=${page}&perPage=${sizePerPage}&searchedTerm=${searchedTerm}&sortKey=${sortKey}&sortType=${sortType}`);

export const addCategoryApi = formData => base.post(`/categories`, formData);

export const editCategoryApi = id => base.get(`/categories/${id}`);

export const updateCategoryApi = (id, formData) => base.post(`/categories/${id}`, formData);

export const updateCategoryStatusApi = ({ id, status }) => base.get(`/categories/update-status/${id}?status=${status}`);

export const deleteCategoryApi = id => base.delete(`/categories/${id}`);
