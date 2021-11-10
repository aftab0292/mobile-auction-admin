import Add from './AddComponent';
import {connect} from "react-redux";
import { addCategory } from "~actions/categories";

const mapStateToProps = ({}, ownProps) => {
    const parent = ownProps.match.params.id || null;
    return {
        parent
    };
};

export default connect(mapStateToProps, { addCategory })(Add);