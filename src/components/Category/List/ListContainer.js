import List from './ListComponent';
import {connect} from "react-redux";
import {fetchCategories, updateCategoryStatus, deleteCategory} from '~actions/categories';

const mapStateToProps = ({categories: {categories, count, currentPage, sizePerPage, searchedTerm, sort}}, ownProps) => {
    const parent = ownProps.match.params.id || null;
    return {
        categories,
        count,
        currentPage,
        sizePerPage,
        searchedTerm,
        sort,
        parent,
    }
};

export default connect(mapStateToProps, {fetchCategories, updateCategoryStatus, deleteCategory})(List);