import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomTable from '~components/Util/CustomTable';
import { showDate } from '~util';

class UpcomingList extends Component {
    static propTypes = {
        data: PropTypes.object,
        count: PropTypes.number.isRequired,
        fetchUpcomingAuction: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired,
        sizePerPage: PropTypes.number.isRequired,
    };

    state = {
        targetFeatureId: null,
        isTargetFeatureSuspended: false,
    };

    componentDidMount() {
        const { currentPage, sizePerPage, fetchUpcomingAuction } = this.props;
        fetchUpcomingAuction({
            page: currentPage,
            sizePerPage,
        });
    }

    fetchData = async ({ page, sizePerPage }) => {
        const { fetchUpcomingAuction } = this.props;
        await fetchUpcomingAuction({
            page,
            sizePerPage,
        });
    };
    render() {
        const listHeaders = [
            {
                dataField: 'auctionTitle',
                text: 'Title',
            },
            {
                dataField: '',
                text: 'Posted by',
                isCustom: true,
            },
            {
                dataField: 'startPrice',
                text: 'Start Price',
            },
            {
                dataField: 'startDateTime',
                text: 'Start Date&Time',
                isCustom: true,
            },
            {
                dataField: 'endDateTime',
                text: 'End Date&Time',
                isCustom: true,
            },
            {
                dataField: 'created',
                text: 'Posted date & time',
                isCustom: true,
            },
            {
                dataField: '_id',
                text: 'Actions',
                isCustom: true,
            },
        ];
        const customBody = (text, index) => {
            const { upcomingProducts, currentPage } = this.props;
            const currentRow = data[currentPage][index];
            if (text === 'Start Date&Time') {
                return (
                    <td key="startDateTime" className="text-center">
                        {showDate(currentRow.startDateTime, 'LLL')}
                    </td>
                );
            }
            if (text === 'End Date&Time') {
                return (
                    <td key="endDate" className="text-center">
                        {showDate(currentRow.endDate, 'LLL')}
                    </td>
                );
            }
            if (text === 'Posted date & time') {
                return (
                    <td key="created" className="text-center">
                        {showDate(currentRow.created, 'LLL')}
                    </td>
                );
            }
            if (text === 'Posted by') {
                return (
                    <td key="postedBy" className="text-center">
                        {currentRow.postedBy && currentRow.postedBy.firstName + ' ' + currentRow.postedBy.lastName}
                    </td>
                );
            }
            if (text === 'Actions') {
                return (
                    <td key={'_id'} className="text-center">
                        <Link className="actionButton" title="View" to={`/auction/upcoming/${currentRow._id}`}>
                            <i className="fe-eye text-dark" />
                        </Link>
                    </td>
                );
            }
        };
        const { data, count, currentPage, sizePerPage } = this.props;
        return (
            <Row>
                <Col lg={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <Link to="/">Dashboard</Link>
                                </li>
                            </ol>
                        </div>
                        <h4 className="page-title">Upcoming Auction Listing</h4>
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
                                fetchData={this.fetchData}
                                isSearchable={false}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default UpcomingList;
