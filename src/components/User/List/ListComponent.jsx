import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CustomTable from '~components/Util/CustomTable';
import Alert from "~components/Util/Alert";

class List extends Component {
    static propTypes = {
        users: PropTypes.object,
        count: PropTypes.number.isRequired,
        fetchUsers: PropTypes.func.isRequired,
        updateUserStatus: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired,
        sizePerPage: PropTypes.number.isRequired,
        searchedTerm: PropTypes.string,
        sort: PropTypes.object.isRequired,
    };

    state = {
        targetUserId: null,
        isTargetUserSuspended: false,
        modalDisplay: {
            deleteUser: false,
            updateUserStatus: false,
        }
    };

    componentDidMount() {
        const {currentPage, sizePerPage, searchedTerm, sort, fetchUsers } = this.props;
        fetchUsers({
            page: currentPage,
            sizePerPage,
            searchedTerm,
            sortKey: Object.keys(sort)[0],
            sortType: Object.values(sort)[0],
        });
    }

    fetchData = async ({page, sizePerPage, searchedTerm, sortKey, sortType}) => {
        const { fetchUsers } = this.props;
        await fetchUsers({
            page,
            sizePerPage,
            searchedTerm,
            sortKey,
            sortType,
        });
    };

    setModalDisplay = (modal, display, targetUserId = null, isTargetUserSuspended = false) => this.setState( state => ({
        targetUserId,
        isTargetUserSuspended,
        modalDisplay: {
            ...state.modalDisplay,
            [modal]: display
        }
    }));

    onDeleteUserModalConfirm = async () => {
        const { deleteUser } = this.props;
        const { targetUserId } = this.state;
        targetUserId && await deleteUser(targetUserId);
        this.setModalDisplay('deleteUser', false);
    };


    onUpdateUserStatusModalConfirm = async () => {
        const { updateUserStatus } = this.props;
        const { targetUserId, isTargetUserSuspended } = this.state;
        targetUserId && await updateUserStatus(targetUserId, isTargetUserSuspended);
        this.setModalDisplay('updateUserStatus', false);
    };

    render() {
        const listHeaders = [{
            dataField: 'fullName',
            text: 'Name',
            sort: true,
        }, {
            dataField: 'email',
            text: 'Email',
        }, {
            dataField: 'formattedPhone',
            text: 'Mobile'
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
            const { users, currentPage } = this.props;
            const currentRow = users[currentPage][index];
            if (text === 'Status') {
                return(
                    <td key='isSuspended' className="text-center">
                        {
                            <span className={`text-center badge ${!currentRow.isSuspended ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger'}`}>
                                {
                                    !currentRow.isSuspended ? 'ACTIVE' : 'INACTIVE'
                                }
                            </span>
                        }
                    </td>
                )
            }
            if (text === 'Actions') {
                return(
                    <td key={`isSuspended${index}`} className="text-center">
                        <Link className='actionButton'
                           title='View'
                           to={`/users/${currentRow._id}`}>
                            <i className='fe-eye text-dark'/>
                        </Link>
                        <Link to='#' className='actionButton'
                           title={!currentRow.isSuspended ? 'INACTIVE' : 'ACTIVE'}
                           onClick={() => this.setModalDisplay('updateUserStatus', true, currentRow._id, !currentRow.isSuspended)}>
                            <i className={!currentRow.isSuspended ? 'fe-slash text-warning' : 'fe-check text-success'}/>
                        </Link>
                        <Link to='#' className='actionButton'
                           title='DELETE' onClick={() => this.setModalDisplay('deleteUser', true, currentRow._id)} >
                            <i className='fe-trash-2 text-danger'/>
                        </Link>
                    </td>
                )
            }
        };
        const { users, count, currentPage, sizePerPage, searchedTerm, sort } = this.props;
        const { modalDisplay } = this.state;
        return (
            <Row>
                <Col lg={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                                <li className="breadcrumb-item"><Link to='#'>Users</Link></li>
                                <li className="breadcrumb-item active">User Listing</li>
                            </ol>
                        </div>
                        <h4 className="page-title">User Manager</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Header className='bg-white'>
                            <Row>
                                <Col className="header-title">Total: { count }</Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <CustomTable
                                showSrNo
                                listHeaders={listHeaders}
                                listData={users[currentPage]}
                                customBody={customBody}
                                fetchData={this.fetchData}
                                count={count}
                                currentPage={currentPage}
                                sizePerPage={sizePerPage}
                                searchedTerm={searchedTerm}
                                sort={sort}
                            />
                            <Alert isOpen={modalDisplay.deleteUser}
                                   title='Warning!!'
                                   titleClassName='text-warning'
                                   body={<h5>Do you really want to delete this user.</h5>}
                                   onClose={() => this.setModalDisplay('deleteUser', false)}
                                   showConfirmButton
                                   confirmText='Sure!'
                                   confirmColor='danger'
                                   onConfirm={this.onDeleteUserModalConfirm}
                            />
                            <Alert isOpen={modalDisplay.updateUserStatus}
                                   title='Warning!!'
                                   titleClassName='text-warning'
                                   body={<h5>Do you really want to update this user's activation status.</h5>}
                                   onClose={() => this.setModalDisplay('updateUserStatus', false, null, false)}
                                   showConfirmButton
                                   confirmText='Sure!'
                                   confirmColor='danger'
                                   onConfirm={this.onUpdateUserStatusModalConfirm}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default List;
