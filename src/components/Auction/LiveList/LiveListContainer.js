import LiveList from './LiveListComponent';
import {connect} from "react-redux";
import {fetchLiveAuction} from '~actions/auction';

const mapStateToProps = ({auctions: {products, count, currentPage, sizePerPage}}) => ({products, count, currentPage, sizePerPage});

export default connect(mapStateToProps, {fetchLiveAuction})(LiveList);