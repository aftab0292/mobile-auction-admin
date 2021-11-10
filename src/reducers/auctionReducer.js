import {
    LIVE_AUCTION,
    LIVE_AUCTION_VIEW,
    UPCOMING_AUCTION,
    UPCOMING_AUCTION_VIEW,
    TOTAL_BIDS,
    PARTICIPANTS_USER
} from '~actions/auction/types';

const INITIAL_STATE = {
    products: {
        1: [],
    },
    count: 0,
    currentPage: 1,
    sizePerPage: 10,
    upcomingProducts: {
        data: {
            1: [],
        },
        count: 0,
        currentPage: 1,
        sizePerPage: 10,
    },

    bids: {
        data: {
            1: [],
        },
        count: 0,
        currentPage: 1,
        sizePerPage: 10,
    },
    participants: {
        data: {
            1: [],
        },
        count: 0,
        currentPage: 1,
        sizePerPage: 10,
    },
    liveView: {},
    upcomingView: {},
};

const auctionReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIVE_AUCTION:
            return {
                ...state,
                products: {
                    ...state.products,
                    [payload.page]: payload.products,
                },
                count: payload.count,
                currentPage: payload.page,
                sizePerPage: payload.sizePerPage,
            };
        case LIVE_AUCTION_VIEW: {
            return {
                ...state,
                liveView: payload.view,
            };
        }
        case UPCOMING_AUCTION:
            return {
                ...state,
                upcomingProducts: {
                    data: {
                        [payload.page]: payload.products,
                    },
                    count: payload.count,
                    currentPage: payload.page,
                    sizePerPage: payload.sizePerPage,
                },
            };
        case UPCOMING_AUCTION_VIEW: {
            return {
                ...state,
                upcomingView: payload.view,
            };
        }
        case TOTAL_BIDS:
            return {
                ...state,
                bids: {
                    data: {
                        [payload.page]: payload.bids,
                    },
                    count: payload.count,
                    currentPage: payload.page,
                    sizePerPage: payload.sizePerPage,
                },
            };
            case PARTICIPANTS_USER:
                return {
                    ...state,
                    participants: {
                        data: {
                            [payload.page]: payload.participants,
                        },
                        count: payload.count,
                        currentPage: payload.page,
                        sizePerPage: payload.sizePerPage,
                    },
                };
        default:
            return state;
    }
};

export default auctionReducer;
