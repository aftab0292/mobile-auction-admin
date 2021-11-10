import ChangePassword from './ChangePasswordComponent';
import {connect} from "react-redux";

import {changePassword} from "~actions/auth";

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {changePassword})(ChangePassword);