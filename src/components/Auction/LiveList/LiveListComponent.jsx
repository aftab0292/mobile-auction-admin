import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomTable from '~components/Util/CustomTable';
import { showDate } from '~util';

class LiveList extends Component {
    static propTypes = {
        products: PropTypes.object,
        count: PropTypes.number.isRequired,
        fetchLiveAuction: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired,
        sizePerPage: PropTypes.number.isRequired,
    };

    state = {};

    componentDidMount() {
        const { currentPage, sizePerPage, fetchLiveAuction } = this.props;
        fetchLiveAuction({
            page: currentPage,
            sizePerPage,
        });
    }

    fetchData = async ({ page, sizePerPage }) => {
        const { fetchLiveAuction } = this.props;
        await fetchLiveAuction({
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
            const { products, currentPage } = this.props;
            const currentRow = products[currentPage][index];
            if (text === 'Start Date&Time') {
                return (
                    <td key="startDateTime" className="text-center">
                        {showDate(currentRow.startDateTime, 'LLL')}
                    </td>
                );
            }
            if (text === 'End Date&Time') {
                return (
                    <td key="endDateTime" className="text-center">
                        {showDate(currentRow.endDateTime, 'LLL')}
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
                        <Link className="actionButton" title="View" to={`/auction/live/${currentRow._id}`}>
                            <i className="fe-eye text-dark" />
                        </Link>
                    </td>
                );
            }
        };
        const { products, count, currentPage, sizePerPage } = this.props;
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
                        <h4 className="page-title">Live Auction Listing</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Header className="bg-white"></Card.Header>
                        <Card.Body>
                            <CustomTable
                                listHeaders={listHeaders}
                                listData={products[currentPage]}
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

export default LiveList;
