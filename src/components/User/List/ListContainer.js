import List from './ListComponent';
import {connect} from "react-redux";
import {fetchUsers, updateUserStatus, deleteUser} from '~actions/users';

const mapStateToProps = ({users: {users, count, currentPage, sizePerPage, searchedTerm, sort}}) => ({
    users,
    count,
    currentPage,
    sizePerPage,
    searchedTerm,
    sort,
});

export default connect(mapStateToProps, {fetchUsers, updateUserStatus, deleteUser})(List);
