import UpcomingList from './UpcomingListComponent';
import { connect } from 'react-redux';
import { fetchUpcomingAuction } from '~actions/auction';

const mapStateToProps = ({
    auctions: {
        upcomingProducts: { data, count, currentPage, sizePerPage },
    },
}) => ({ data, count, currentPage, sizePerPage });

export default connect(mapStateToProps, { fetchUpcomingAuction })(UpcomingList);
