import {
    FETCH_USERS,
    VIEW_USER,
    UPDATE_USER_STATUS,
    DELETE_USER
} from "~actions/users/types";

const INITIAL_STATE = {
    users: {
        1: []
    },
    count: 0,
    currentPage: 1,
    sizePerPage: 10,
    searchedTerm: '',
    sort: {
        createdAt: 'desc'
    },
    view: {}
};

const usersReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case FETCH_USERS:
            return {
                ...state,
                users: {
                    ...state.users,
                    [payload.page]: payload.users
                },
                count: payload.count,
                currentPage: payload.page,
                sizePerPage: payload.sizePerPage,
                searchedTerm: payload.searchedTerm,
                sort: payload.sort
            };
        case VIEW_USER: {
            return {
                ...state,
                view: payload.view
            }
        }
        case UPDATE_USER_STATUS: {
            const updatedUserIndex = state.users[state.currentPage].findIndex(item => item._id === payload.id);
            let users = state.users;
            if(updatedUserIndex >= 0) {
                users[state.currentPage][updatedUserIndex].isSuspended = payload.status;
                users = {
                    ...users,
                };
            }
            return {
                ...state,
                users,
            }
        }
        case DELETE_USER: {
            const deletedUserIndex = state.users[state.currentPage].findIndex(item => item._id === payload.id);
            let users = state.users;
            let currentPage = state.currentPage;
            if(deletedUserIndex >= 0) {
                users[currentPage].splice(deletedUserIndex, 1);
                users = {
                    ...users
                };
                (users[currentPage].length === 0 && currentPage > 1) && (currentPage = currentPage-1)
            }
            return {
                ...state,
                users,
                count: state.count - 1,
                currentPage
            }
        }
        default:
            return state;
    }
};

export default usersReducer;
