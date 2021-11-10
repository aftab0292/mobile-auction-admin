import React, { Component } from 'react';
import * as PropTypes from "prop-types";
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomTable from '~components/Util/CustomTable';
import Alert from "~components/Util/Alert";

class List extends Component {
    static propTypes = {
        features: PropTypes.object,
        count: PropTypes.number.isRequired,
        fetchFeatures: PropTypes.func.isRequired,
        updateFeatureStatus: PropTypes.func.isRequired,
        deleteFeature: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired,
        sizePerPage: PropTypes.number.isRequired,
        searchedTerm: PropTypes.string,
        sort: PropTypes.object.isRequired,
    };

    state = {
        targetFeatureId: null,
        isTargetFeatureSuspended: false,
        modalDisplay: {
            deleteFeature: false,
            updateFeatureStatus: false,
        }
    };

    componentDidMount() {
        const { currentPage, sizePerPage, searchedTerm, sort, fetchFeatures } = this.props;
        fetchFeatures({
            page: currentPage,
            sizePerPage,
            searchedTerm,
            sortKey: Object.keys(sort)[0],
            sortType: Object.values(sort)[0],
        });
    }

    fetchData = async ({ page, sizePerPage, searchedTerm, sortKey, sortType }) => {
        const { fetchFeatures } = this.props;
        await fetchFeatures({
            page,
            sizePerPage,
            searchedTerm,
            sortKey,
            sortType,
        });
    };

    setModalDisplay = (modal, display, targetFeatureId = null, isTargetFeatureSuspended = false) => this.setState(state => ({
        targetFeatureId,
        isTargetFeatureSuspended,
        modalDisplay: {
            ...state.modalDisplay,
            [modal]: display
        }
    }));

    onDeleteFeatureModalConfirm = async () => {
        const { deleteFeature } = this.props;
        const { targetFeatureId } = this.state;
        targetFeatureId && await deleteFeature(targetFeatureId);
        this.setModalDisplay('deleteFeature', false);
    };

    onUpdateFeatureStatusModalConfirm = async () => {
        const { updateFeatureStatus } = this.props;
        const { targetFeatureId, isTargetFeatureSuspended } = this.state;
        targetFeatureId && await updateFeatureStatus(targetFeatureId, isTargetFeatureSuspended);
        this.setModalDisplay('updateFeatureStatus', false);
    };

    render() {
        const listHeaders = [{
            dataField: 'plan',
            text: 'Plan Price',                        
        }, {
            dataField: 'validity',
            text: 'Validity',                      
        }, {
            dataField: 'isSuspended',
            text: 'Status',            
            isCustom: true
        }, {
            dataField: '_id',
            text: 'Actions',
            isCustom: true
        }];
        const customBody = (text, index) => {
            const { features, currentPage } = this.props;
            const currentRow = features[currentPage][index];
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
            if (text === 'Actions') {
                return (
                    <td key={`isSuspended${index}`} className="text-center">
                        <Link className='actionButton'
                              title='View'
                              to={`/features/edit/${currentRow._id}`}>
                            <i className='fa fa-pencil-alt text-dark'/>
                        </Link>                   
                        <Link to='#' className='actionButton'
                            title={!currentRow.isSuspended ? 'INACTIVE' : 'ACTIVE'}
                            onClick={() => this.setModalDisplay('updateFeatureStatus', true, currentRow._id, !currentRow.isSuspended)}>
                            <i className={!currentRow.isSuspended ? 'fe-slash text-warning' : 'fe-check text-success'} />
                        </Link>
                        <Link to='#' className='actionButton'
                            title='DELETE'
                            onClick={() => this.setModalDisplay('deleteFeature', true, currentRow._id)}>
                            <i className='fe-trash-2 text-danger' />
                        </Link>
                    </td>
                )
            }
        };
        const { features, count, currentPage, sizePerPage, searchedTerm, sort } = this.props;
        const { modalDisplay } = this.state;
        return (
            <Row>
                <Col lg={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                                <li className="breadcrumb-item"><Link
                                    to={'/features'}>Feature</Link></li>
                                <li className="breadcrumb-item active">Feature Listing</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Feature Manager</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Header className='bg-white'>
                            <Row>
                                <Col className="header-title">Total: {count}</Col>
                                <Col className='text-right'>
                                    <Link to={'/features/add'} className='btn btn-primary'>
                                        Add Feature <i className='fe-plus' />
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <CustomTable
                                listHeaders={listHeaders}
                                listData={features[currentPage]}
                                customBody={customBody}
                                showSrNo={true}
                                count={count}
                                currentPage={currentPage}
                                sizePerPage={sizePerPage}
                                searchedTerm={searchedTerm}
                                fetchData={this.fetchData}
                                sort={sort}
                            />
                            <Alert isOpen={modalDisplay.deleteFeature}
                                title='Warning!!'
                                titleClassName='text-warning'
                                body={<h5>Do you really want to delete this feature.</h5>}
                                onClose={() => this.setModalDisplay('deleteFeature', false)}
                                showConfirmButton
                                confirmText='Sure!'
                                confirmColor='danger'
                                onConfirm={this.onDeleteFeatureModalConfirm}
                            />
                            <Alert isOpen={modalDisplay.updateFeatureStatus}
                                title='Warning!!'
                                titleClassName='text-warning'
                                body={<h5>Do you really want to update this feature's activation status.</h5>}
                                onClose={() => this.setModalDisplay('updateFeatureStatus', false, null, false)}
                                showConfirmButton
                                confirmText='Sure!'
                                confirmColor='danger'
                                onConfirm={this.onUpdateFeatureStatusModalConfirm}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default List;
