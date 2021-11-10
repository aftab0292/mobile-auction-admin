import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomTable from '~components/Util/CustomTable';
import { showDate } from '~util';

class UsersList extends Component {
    static propTypes = {
        data: PropTypes.object,
        count: PropTypes.number.isRequired,
        fetchFeatureUsers: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired,
        sizePerPage: PropTypes.number.isRequired,
        searchedTerm: PropTypes.string,
        sort: PropTypes.object.isRequired,
    };

    state = {};

    componentDidMount() {
        const { currentPage, sizePerPage, searchedTerm, sort, fetchFeatureUsers } = this.props;
        fetchFeatureUsers({
            page: currentPage,
            sizePerPage,
            searchedTerm,
            sortKey: Object.keys(sort)[0],
            sortType: Object.values(sort)[0],
        });
    }

    fetchData = async ({ page, sizePerPage, searchedTerm, sortKey, sortType }) => {
        const { fetchFeatureUsers } = this.props;
        await fetchFeatureUsers({
            page,
            sizePerPage,
            searchedTerm,
            sortKey,
            sortType,
        });
    };

    render() {
        const listHeaders = [
            {
                dataField: 'auctionTitle',
                text: 'Auction Title',
                sort: true,
            },
            {
                dataField: 'userName',
                text: 'User Name',
                sort: true,
            },
            {
                dataField: 'plan',
                text: 'Plan',
                sort: true,
            },
            {
                dataField: 'validity',
                text: 'Validity',
                sort: true,
            },
            {
                dataField: 'purchaseDate',
                text: 'Purchase Date',
                sort: true,
                isCustom: true,
            },
            {
                dataField: 'startDateTime',
                text: 'Start Date',
                sort: true,
                isCustom: true,
            },
            {
                dataField: 'endDateTime',
                text: 'End Date',
                sort: true,
                isCustom: true,
            },
        ];
        const customBody = (text, index) => {
            const { data, currentPage } = this.props;
            const currentRow = data[currentPage][index];
            if (text === 'Purchase Date') {
                return (
                    <td key="startDateTime" className="text-center">
                        {showDate(currentRow.purchaseDate, 'LLL')}
                    </td>
                );
            }
            if (text === 'Start Date') {
                return (
                    <td key="startDateTime" className="text-center">
                        {showDate(currentRow.startDateTime, 'LLL')}
                    </td>
                );
            }
            if (text === 'End Date') {
                return (
                    <td key="endDateTime" className="text-center">
                        {showDate(currentRow.endDateTime, 'LLL')}
                    </td>
                );
            }
            if (text === 'Status') {
                return (
                    <td key="isSuspended" className="text-center">
                        {
                            <span
                                className={`text-center badge ${
                                    !currentRow.isSuspended
                                        ? 'bg-soft-success text-success'
                                        : 'bg-soft-danger text-danger'
                                }`}
                            >
                                {!currentRow.isSuspended ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                        }
                    </td>
                );
            }
        };
        const { data, count, currentPage, sizePerPage, searchedTerm, sort } = this.props;
        return (
            <Row>
                <Col lg={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <Link to="/">Admin</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={'/features'}>Feature</Link>
                                </li>
                                <li className="breadcrumb-item active">Feature User Listing</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Feature Manager</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Header className="bg-white"></Card.Header>
                        <Card.Body>
                            <CustomTable
                                listHeaders={listHeaders}
                                listData={data[currentPage]}
                                customBody={customBody}
                                showSrNo={true}
                                count={count}
                                currentPage={currentPage}
                                sizePerPage={sizePerPage}
                                searchedTerm={searchedTerm}
                                fetchData={this.fetchData}
                                sort={sort}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default UsersList;
