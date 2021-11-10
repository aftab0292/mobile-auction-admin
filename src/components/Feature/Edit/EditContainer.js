import Edit from './EditComponent';
import {connect} from "react-redux";
import { editFeature, updateFeature } from "~actions/features";

const mapStateToProps = ({features : { edit }}, ownProps) => {
    const id = ownProps.match.params.id || null;
    return {
        edit,
        id
    }
};
export default connect(mapStateToProps, { editFeature, updateFeature })(Edit);