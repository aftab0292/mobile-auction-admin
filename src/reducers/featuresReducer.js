import {
    FETCH_FEATURES,
    EDIT_FEATURE,
    UPDATE_FEATURE_STATUS,
    DELETE_FEATURE,
    FETCH_FEATURE_USERS,
} from '~actions/features/types';

const INITIAL_STATE = {
    features: {
        1: [],
    },
    count: 0,
    currentPage: 1,
    sizePerPage: 10,
    searchedTerm: '',
    sort: {
        createdAt: 'desc',
    },
    featureUsers: {
        data: {
            1: [],
        },
        count: 0,
        currentPage: 1,
        sizePerPage: 10,
        searchedTerm: '',
        sort: {
            createdAt: 'desc',
        },
    },
    edit: {},
};

const featuresReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_FEATURES:
            return {
                ...state,
                features: {
                    ...state.features,
                    [payload.page]: payload.features,
                },
                count: payload.count,
                currentPage: payload.page,
                sizePerPage: payload.sizePerPage,
                searchedTerm: payload.searchedTerm,
                sort: payload.sort,
            };
        case EDIT_FEATURE: {
            return {
                ...state,
                edit: payload.edit,
            };
        }
        case UPDATE_FEATURE_STATUS: {
            const updatedFeatureIndex = state.features[state.currentPage].findIndex(item => item._id === payload.id);
            let features = state.features;
            if (updatedFeatureIndex >= 0) {
                features[state.currentPage][updatedFeatureIndex].isSuspended = payload.status;
                features = {
                    ...features,
                };
            }
            return {
                ...state,
                features,
            };
        }
        case DELETE_FEATURE: {
            const deletedFeatureIndex = state.features[state.currentPage].findIndex(item => item._id === payload.id);
            let features = state.features;
            let currentPage = state.currentPage;
            if (deletedFeatureIndex >= 0) {
                features[currentPage].splice(deletedFeatureIndex, 1);
                features = {
                    ...features,
                };
                features[currentPage].length === 0 && currentPage > 1 && (currentPage = currentPage - 1);
            }
            return {
                ...state,
                features,
                count: state.count - 1,
                currentPage,
            };
        }
        case FETCH_FEATURE_USERS:
            return {
                ...state,
                featureUsers: {
                    ...state.featureUsers,
                    data:{
                    [payload.page]: payload.featureUsers,
                    },
                    count: payload.count,
                    currentPage: payload.page,
                    sizePerPage: payload.sizePerPage,
                    searchedTerm: payload.searchedTerm,
                    sort: payload.sort,
                },
               
            };
        default:
            return state;
    }
};

export default featuresReducer;
