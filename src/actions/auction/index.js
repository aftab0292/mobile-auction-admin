import {
    LIVE_AUCTION,
    LIVE_AUCTION_VIEW,
    UPCOMING_AUCTION,
    UPCOMING_AUCTION_VIEW,
    TOTAL_BIDS,
    PARTICIPANTS_USER,
} from './types';

import {
    fetchLiveAuctionApi,
    liveViewApi,
    fetchUpcomingAuctionApi,
    fetchBidsApi,
    fetchParticipantsApi,
} from '~apis/auction';

export const fetchLiveAuction = searchData => async dispatch => {
    const {
        data: { count, products },
    } = await fetchLiveAuctionApi(searchData);
    dispatch({
        type: LIVE_AUCTION,
        payload: {
            count,
            products,
            page: searchData.page,
            sizePerPage: searchData.sizePerPage,
        },
    });
};

export const fetchUpcomingAuction = searchData => async dispatch => {
    const {
        data: { count, products },
    } = await fetchUpcomingAuctionApi(searchData);
    dispatch({
        type: UPCOMING_AUCTION,
        payload: {
            count,
            products,
            page: searchData.page,
            sizePerPage: searchData.sizePerPage,
        },
    });
};

export const viewLiveAuction = productId => async dispatch => {
    const { data } = await liveViewApi(productId);
    dispatch({
        type: LIVE_AUCTION_VIEW,
        payload: {
            view: data,
        },
    });
};

export const viewUpcomingAuction = productId => async dispatch => {
    const { data } = await liveViewApi(productId);
    dispatch({
        type: UPCOMING_AUCTION_VIEW,
        payload: {
            view: data,
        },
    });
};

export const fetchBids = searchData => async dispatch => {
    const {
        data: { count, bids },
    } = await fetchBidsApi(searchData);
    dispatch({
        type: TOTAL_BIDS,
        payload: {
            count,
            bids,
            page: searchData.page,
            sizePerPage: searchData.sizePerPage,
        },
    });
};

export const fetchParticipants = searchData => async dispatch => {
    const {
        data: { count, participants },
    } = await fetchParticipantsApi(searchData);
    dispatch({
        type: PARTICIPANTS_USER,
        payload: {
            count,
            participants,
            page: searchData.page,
            sizePerPage: searchData.sizePerPage,
        },
    });
};
