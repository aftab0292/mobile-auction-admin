import base from './base';

export const fetchLiveAuctionApi = ({ page, sizePerPage }) =>
    base.get(`/features/liveAuction/list?page=${page}&perPage=${sizePerPage}`);

export const fetchUpcomingAuctionApi = ({ page, sizePerPage }) =>
    base.get(`/features/upcomingAuction/list?page=${page}&perPage=${sizePerPage}`);

export const fetchBidsApi = ({ id, page, sizePerPage }) =>
    base.get(`/features/Auction/bids?id=${id}&page=${page}&perPage=${sizePerPage}`);

export const fetchParticipantsApi = ({ id, page, sizePerPage }) =>
    base.get(`/features/Auction/participants?id=${id}&page=${page}&perPage=${sizePerPage}`);

export const liveViewApi = productId => base.post(`/features/auction/view`, { productId: productId });
