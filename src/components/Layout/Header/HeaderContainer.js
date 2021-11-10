import Header from './HeaderComponent';
import {connect} from "react-redux";
import {signOut} from '~actions/auth';
import {withRouter} from "react-router-dom";

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, {signOut})(Header));
