import LiveView from './LiveViewComponent';
import { connect } from 'react-redux';
import { viewLiveAuction, fetchBids } from '~actions/auction';

const mapStateToProps = ({
    auctions: {
        liveView,
        bids: { data, count, currentPage, sizePerPage },
    },
}) => ({ liveView, data, count, currentPage, sizePerPage });

export default connect(mapStateToProps, { viewLiveAuction, fetchBids })(LiveView);
