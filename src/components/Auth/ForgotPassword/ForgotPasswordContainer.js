import ForgotPassword from './ForgotPasswordComponent';
import {connect} from "react-redux";

import {forgotPassword} from "~actions/auth";

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {forgotPassword})(ForgotPassword);
