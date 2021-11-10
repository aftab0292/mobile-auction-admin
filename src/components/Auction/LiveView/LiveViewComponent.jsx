import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Row, Col, Card, FormGroup, Table, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { showDate } from '~util';
import CustomTable from '~components/Util/CustomTable';

class View extends Component {
    static propTypes = {
        liveView: PropTypes.object,
        viewLiveAuction: PropTypes.func.isRequired,
        fetchBids: PropTypes.func.isRequired,
        data: PropTypes.object,
    };

    componentDidMount() {
        const {
            viewLiveAuction,
            currentPage,
            sizePerPage,
            fetchBids,
            match: {
                params: { id },
            },
        } = this.props;
        viewLiveAuction(id);
        fetchBids({
            id,
            page: currentPage,
            sizePerPage,
        });
    }

    fetchData = async ({ page, sizePerPage }) => {
        const { fetchBids } = this.props;
        await fetchBids({
            id: this.props.match.params.id,
            page,
            sizePerPage,
        });
    };

    renderView = (title, text) => {
        return (
            <Col lg={6} md={6} sm={12} xs={12}>
                <FormGroup>
                    <strong>{title} :</strong> {text}
                </FormGroup>
            </Col>
        );
    };

    render() {
        const listHeaders = [
            {
                dataField: '',
                text: 'Name',
                isCustom: true,
            },
            {
                dataField: 'amount',
                text: 'Bids Amount',
            },
            {
                dataField: '',
                text: 'Bids Date',
                isCustom: true,
            },
        ];
        const customBody = (text, index) => {
            const { data, currentPage } = this.props;
            const currentRow = data[currentPage][index];
            if (text === 'Name') {
                return (
                    <td key="bidsUser" className="text-center">
                        {currentRow.bidsUser && currentRow.bidsUser.fullName}
                    </td>
                );
            }
            if (text === 'Bids Date') {
                return (
                    <td key="created" className="text-center">
                        {showDate(currentRow.created, 'LLL')}
                    </td>
                );
            }
        };
        const { data, count, currentPage, sizePerPage, liveView } = this.props;
        return (
            <Row>
                <Col lg={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <Link to="/">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/auction/live">Live Auction</Link>
                                </li>
                                <li className="breadcrumb-item active">Live Auction Details</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Auction Manager</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Header className="bg-white">
                            <h4 className="header-title">Live Auction Details</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {liveView && this.renderView('Auction Title', liveView.auctionTitle)}
                                {liveView &&
                                    liveView.postedBy &&
                                    this.renderView(
                                        'Posted By',
                                        liveView.postedBy.firstName + ' ' + liveView.postedBy.firstName
                                    )}
                                {liveView && this.renderView('Start Price', liveView.startPrice)}
                                {liveView && this.renderView('Min Incremental ', liveView.minimumIncremental)}
                                {liveView &&
                                    this.renderView('Start Date&Time', showDate(liveView.startDateTime, 'LLL'))}
                                {liveView && this.renderView('End Date&Time ', showDate(liveView.endDateTime, 'LLL'))}
                                {liveView && this.renderView('Posted date & time ', showDate(liveView.created, 'LLL'))}
                            </Row>
                            <Row>{liveView && this.renderView('Address', liveView.address)}</Row>
                            <Row>{liveView && this.renderView('Return policy ', liveView.returnPolicy)}</Row>
                            <Row>
                                {liveView && liveView.images && (
                                    <Col md={6}>
                                        <Carousel>
                                            {liveView &&
                                                liveView.images &&
                                                liveView.images.length !== 0 &&
                                                liveView.images.map((item, key) => {
                                                    return (
                                                        <Carousel.Item>
                                                            <img
                                                                className="d-block w-100"
                                                                src={
                                                                    'https://mobileauction-demo.s3.us-west-2.amazonaws.com/' +
                                                                    item
                                                                }
                                                                alt=""
                                                                height="250"
                                                            />
                                                        </Carousel.Item>
                                                    );
                                                })}
                                        </Carousel>
                                    </Col>
                                )}
                                {liveView && liveView.videos && liveView.videos.length !== 0 && (
                                    <Col md={6}>
                                        <iframe
                                            // src={
                                            //     liveView &&
                                            //     'https://mobileauction-demo.s3.us-west-2.amazonaws.com/' +
                                            //         liveView.videos[0]
                                            // }
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" }}
                                            width="100%"
                                            height="250"
                                        />
                                    </Col>
                                )}
                            </Row>
                        </Card.Body>
                    </Card>
                    {data && data.length !== 0 && (
                        <Card>
                            <Card.Header className="bg-white">
                                Bids List (Total Bids :{' '}
                                {liveView && liveView.total_number_of_bids && liveView.total_number_of_bids})
                            </Card.Header>
                            <Card.Body>
                                <CustomTable
                                    listHeaders={listHeaders}
                                    listData={data[currentPage]}
                                    customBody={customBody}
                                    showSrNo={true}
                                    count={count}
                                    currentPage={currentPage}
                                    sizePerPage={sizePerPage}
                                    fetchData={this.viewLiveAuction}
                                    isSearchable={false}
                                />
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        );
    }
}

export default View;
