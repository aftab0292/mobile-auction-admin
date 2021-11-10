import UsersList from './UsersListComponent';
import { connect } from 'react-redux';
import { fetchFeatureUsers } from '~actions/features';

const mapStateToProps = ({
    features: {
        featureUsers: { data, count, currentPage, sizePerPage, searchedTerm, sort },
    },
}) => ({ data, count, currentPage, sizePerPage, searchedTerm, sort });

export default connect(mapStateToProps, { fetchFeatureUsers })(UsersList);
