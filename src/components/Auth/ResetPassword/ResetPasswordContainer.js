import ResetPassword from './ResetPasswordComponent';
import {connect} from "react-redux";

import {resetPassword} from "~actions/auth";

const mapStateToProps = ({auth: {user}}) => ({user});

export default connect(mapStateToProps, {resetPassword})(ResetPassword);
