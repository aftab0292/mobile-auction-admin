import List from './ListComponent';
import {connect} from "react-redux";
import {fetchFeatures, updateFeatureStatus, deleteFeature} from '~actions/features';

const mapStateToProps = ({features: {features, count, currentPage, sizePerPage, searchedTerm, sort}}) => ({features, count, currentPage, sizePerPage, searchedTerm, sort});

export default connect(mapStateToProps, {fetchFeatures, updateFeatureStatus, deleteFeature})(List);