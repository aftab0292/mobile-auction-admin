import LogIn from './LogInComponent';
import {connect} from "react-redux";

import {signIn} from "~actions/auth";

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {signIn})(LogIn);
