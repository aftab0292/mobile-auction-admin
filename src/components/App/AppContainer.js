import {connect} from "react-redux";
import App from './AppComponent';

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(App);
