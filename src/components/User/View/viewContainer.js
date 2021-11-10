import View from './ViewComponent';
import {connect} from "react-redux";
import { viewUser }  from '~actions/users'

const mapStateToProps = ({users: { view }}) => ({ view });

export default connect(mapStateToProps, { viewUser })(View);
