import Edit from './EditComponent';
import {connect} from "react-redux";
import { editCategory, updateCategory } from "~actions/categories";

const mapStateToProps = ({categories : { edit }}, ownProps) => {
    const id = ownProps.match.params.id || null;
    return {
        edit,
        id
    }
};

export default connect(mapStateToProps, {editCategory, updateCategory })(Edit);