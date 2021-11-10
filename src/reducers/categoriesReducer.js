import {
    FETCH_CATEGORIES,
    EDIT_CATEGORY,
    UPDATE_CATEGORY_STATUS,
    DELETE_CATEGORY
} from "~actions/categories/types";

const INITIAL_STATE = {
    categories: {
        1: []
    },
    count: 0,
    currentPage: 1,
    sizePerPage: 10,
    searchedTerm: '',
    sort: {
        createdAt: 'desc'
    },
    edit: {}
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [payload.page]: payload.categories
                },
                count: payload.count,
                currentPage: payload.page,
                sizePerPage: payload.sizePerPage,
                searchedTerm: payload.searchedTerm,
                sort: payload.sort
            };
        case EDIT_CATEGORY: {
            return {
                ...state,
                edit: payload.edit
            }
        }
        case UPDATE_CATEGORY_STATUS: {
            const updatedCategoryIndex = state.categories[state.currentPage].findIndex(item => item._id === payload.id);
            let categories = state.categories;
            if(updatedCategoryIndex >= 0) {
                categories[state.currentPage][updatedCategoryIndex].isSuspended = payload.status;
                categories = {
                    ...categories,
                };
            }
            return {
                ...state,
                categories,
            }
        }
        case DELETE_CATEGORY: {
            const deletedCategoryIndex = state.categories[state.currentPage].findIndex(item => item._id === payload.id);
            let categories = state.categories;
            let currentPage = state.currentPage;
            if(deletedCategoryIndex >= 0) {
                categories[currentPage].splice(deletedCategoryIndex, 1);
                categories = {
                    ...categories
                };
                (categories[currentPage].length === 0 && currentPage > 1) && (currentPage = currentPage-1)
            }
            return {
                ...state,
                categories,
                count: state.count - 1,
                currentPage
            }
        }
        default:
            return state;
    }
};

export default categoriesReducer;
