import UpcomingView from './UpcomingViewComponent';
import { connect } from 'react-redux';
import { viewUpcomingAuction, fetchParticipants } from '~actions/auction';

const mapStateToProps = ({
    auctions: {
        upcomingView,
        participants: { data, count, currentPage, sizePerPage },
    },
}) => ({ upcomingView, data, count, currentPage, sizePerPage });

export default connect(mapStateToProps, { viewUpcomingAuction, fetchParticipants })(UpcomingView);
