import Add from './AddComponent';
import {connect} from "react-redux";
import { addFeature } from "~actions/features";

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, { addFeature })(Add);