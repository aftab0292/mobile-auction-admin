import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CustomTable from '~components/Util/CustomTable';
import LazyImage from "~components/Util/LazyImage";
import Alert from "~components/Util/Alert";

class List extends Component {
    static propTypes = {
        categories: PropTypes.object,
        count: PropTypes.number.isRequired,
        fetchCategories: PropTypes.func.isRequired,
        updateCategoryStatus: PropTypes.func.isRequired,
        deleteCategory: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired,
        sizePerPage: PropTypes.number.isRequired,
        searchedTerm: PropTypes.string,
        sort: PropTypes.object.isRequired,
        parent: PropTypes.oneOfType([
            PropTypes.oneOf([null]),
            PropTypes.string,
        ]),
    };

    state = {
        targetCategoryId: null,
        isTargetCategorySuspended: false,
        modalDisplay: {
            deleteCategory: false,
            updateCategoryStatus: false,
        }
    };

    componentDidMount() {
        const {currentPage, sizePerPage, searchedTerm, sort, parent, fetchCategories} = this.props;
        fetchCategories({
            page: currentPage,
            sizePerPage,
            searchedTerm,
            sortKey: Object.keys(sort)[0],
            sortType: Object.values(sort)[0],
            parent
        });
    }

    fetchData = async ({page, sizePerPage, searchedTerm, sortKey, sortType}) => {
        const {parent, fetchCategories} = this.props;
        await fetchCategories({
            page,
            sizePerPage,
            searchedTerm,
            sortKey,
            sortType,
            parent
        });
    };

    setModalDisplay = (modal, display, targetCategoryId = null, isTargetCategorySuspended = false) => this.setState(state => ({
        targetCategoryId,
        isTargetCategorySuspended,
        modalDisplay: {
            ...state.modalDisplay,
            [modal]: display
        }
    }));

    onDeleteCategoryModalConfirm = async () => {
        const {deleteCategory} = this.props;
        const {targetCategoryId} = this.state;
        targetCategoryId && await deleteCategory(targetCategoryId);
        this.setModalDisplay('deleteCategory', false);
    };

    onUpdateCategoryStatusModalConfirm = async () => {
        const {updateCategoryStatus} = this.props;
        const {targetCategoryId, isTargetCategorySuspended} = this.state;
        targetCategoryId && await updateCategoryStatus(targetCategoryId, isTargetCategorySuspended);
        this.setModalDisplay('updateCategoryStatus', false);
    };

    render() {
        const listHeaders = [{
            dataField: 'icon',
            text: 'Icon',
            isCustom: true
        }, {
            dataField: 'name',
            text: 'Name',
            sort: true,
        },{
            dataField: 'maxAuctionExpireTime',
            text: 'Time-Extension',
            sort: true,
        }, {
            dataField: 'isSuspended',
            text: 'Status',
            sort: true,
            isCustom: true
        }, {
            dataField: '_id',
            text: 'Actions',
            isCustom: true
        }];

        const customBody = (text, index) => {
            const {categories, currentPage} = this.props;
            const currentRow = categories[currentPage][index];
            if (text === 'Status') {
                return (
                    <td key='isSuspended' className="text-center">
                        {
                            <span
                                className={`text-center badge ${!currentRow.isSuspended ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger'}`}>
                                {
                                    !currentRow.isSuspended ? 'ACTIVE' : 'INACTIVE'
                                }
                            </span>
                        }
                    </td>
                )
            }
            if (text === 'Icon') {
                return (
                    <td key='icon' className="text-center">
                        {
                            <LazyImage src={currentRow.icon}
                                       width={150}
                                       height={90}/>
                        }
                    </td>
                )
            }
            if (text === 'Actions') {
                return (
                    <td key={`isSuspended${index}`} className="text-center">
                        <Link className='actionButton'
                              title='View'
                              to={`/categories/edit/${currentRow._id}`}>
                            <i className='fa fa-pencil-alt text-dark'/>
                        </Link>
                        {currentRow.level <= 1 &&
                        <Link className='actionButton'
                              title='Sub category'
                              to={`/categories/sub-categories/${currentRow._id}`}>
                            <i className='fas fa-stream text-primary'/>
                        </Link>}
                        <Link to='#' className='actionButton'
                              title={!currentRow.isSuspended ? 'INACTIVE' : 'ACTIVE'}
                              onClick={() => this.setModalDisplay('updateCategoryStatus', true, currentRow._id, !currentRow.isSuspended)}>
                            <i className={!currentRow.isSuspended ? 'fe-slash text-warning' : 'fe-check text-success'}/>
                        </Link>
                        <Link to='#' className='actionButton'
                              title='DELETE'
                              onClick={() => this.setModalDisplay('deleteCategory', true, currentRow._id)}>
                            <i className='fe-trash-2 text-danger'/>
                        </Link>
                    </td>
                )
            }
        };
        const {categories, count, currentPage, sizePerPage, searchedTerm, sort, parent} = this.props;
        const {modalDisplay} = this.state;
        return (
            <Row>
                <Col lg={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                                <li className="breadcrumb-item"><Link
                                    to={parent ? '/categories' : '#'}>Categories</Link></li>
                                <li className="breadcrumb-item active">Category Listing</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Category Manager</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Header className='bg-white'>
                            <Row>
                                <Col className="header-title">Total: {count}</Col>
                                <Col className='text-right'>
                                    <Link to={parent ? `/categories/add-sub-category/${parent}` : '/categories/add-category'} className='btn btn-primary'>
                                        Add {parent ? 'sub category ' : 'Category '}
                                        <i className='fe-plus'/>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <CustomTable
                                listHeaders={listHeaders}
                                listData={categories[currentPage]}
                                customBody={customBody}
                                showSrNo={true}
                                count={count}
                                currentPage={currentPage}
                                sizePerPage={sizePerPage}
                                searchedTerm={searchedTerm}
                                fetchData={this.fetchData}
                                sort={sort}
                            />
                            <Alert isOpen={modalDisplay.deleteCategory}
                                   title='Warning!!'
                                   titleClassName='text-warning'
                                   body={<h5>Do you really want to delete this category.</h5>}
                                   onClose={() => this.setModalDisplay('deleteCategory', false)}
                                   showConfirmButton
                                   confirmText='Sure!'
                                   confirmColor='danger'
                                   onConfirm={this.onDeleteCategoryModalConfirm}
                            />
                            <Alert isOpen={modalDisplay.updateCategoryStatus}
                                   title='Warning!!'
                                   titleClassName='text-warning'
                                   body={<h5>Do you really want to update this category's activation status.</h5>}
                                   onClose={() => this.setModalDisplay('updateCategoryStatus', false, null, false)}
                                   showConfirmButton
                                   confirmText='Sure!'
                                   confirmColor='danger'
                                   onConfirm={this.onUpdateCategoryStatusModalConfirm}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default List;
