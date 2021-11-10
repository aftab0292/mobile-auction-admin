import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Row, Col, Card, FormGroup, Table, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { showDate } from '~util';
import CustomTable from '~components/Util/CustomTable';

class View extends Component {
    static propTypes = {
        upcomingView: PropTypes.object,
        viewUpcomingAuction: PropTypes.func.isRequired,
        fetchParticipants: PropTypes.func.isRequired,
        data: PropTypes.object,
    };

    componentDidMount() {
        const {
            viewUpcomingAuction,
            currentPage,
            sizePerPage,
            fetchParticipants,
            match: {
                params: { id },
            },
        } = this.props;
        viewUpcomingAuction(id);
        fetchParticipants({
            id,
            page: currentPage,
            sizePerPage,
        });
    }

    fetchData = async ({ page, sizePerPage }) => {
        const { fetchParticipants } = this.props;
        await fetchParticipants({
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
                dataField: 'fullName',
                text: 'Name',
            },
            {
                dataField: 'email',
                text: 'Email',
            },
        ];
        const customBody = (text, index) => {
            const { data, currentPage } = this.props;
            const currentRow = data[currentPage][index];
        };
        const { data, count, currentPage, sizePerPage, upcomingView } = this.props;
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
                                    <Link to="/auction/upcoming">Upcoming Auction</Link>
                                </li>
                                <li className="breadcrumb-item active">Upcoming Auction Details</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Auction Manager</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Header className="bg-white">
                            <h4 className="header-title">Upcoming Auction Details</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {upcomingView && this.renderView('Auction Title', upcomingView.auctionTitle)}
                                {upcomingView &&
                                    upcomingView.postedBy &&
                                    this.renderView(
                                        'Posted By',
                                        upcomingView.postedBy.firstName + ' ' + upcomingView.postedBy.firstName
                                    )}
                                {upcomingView && this.renderView('Start Price', upcomingView.startPrice)}
                                {upcomingView && this.renderView('Min Incremental ', upcomingView.minimumIncremental)}
                                {upcomingView &&
                                    this.renderView('Start Date&Time', showDate(upcomingView.startDateTime, 'LLL'))}
                                {upcomingView &&
                                    this.renderView('End Date&Time ', showDate(upcomingView.endDateTime, 'LLL'))}
                                {upcomingView &&
                                    this.renderView('Posted date & time ', showDate(upcomingView.created, 'LLL'))}
                            </Row>
                            <Row>{upcomingView && this.renderView('Address', upcomingView.address)}</Row>
                            <Row>{upcomingView && this.renderView('Return policy ', upcomingView.returnPolicy)}</Row>
                            <Row>
                                {upcomingView && upcomingView.images && (
                                    <Col md={6}>
                                        <Carousel>
                                            {upcomingView &&
                                                upcomingView.images.map((item, key) => {
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
                                {upcomingView && upcomingView.videos && upcomingView.videos.length !== 0 && (
                                    <Col md={6}>
                                        <iframe
                                            // src={
                                            //     upcomingView &&
                                            //     'https://mobileauction-demo.s3.us-west-2.amazonaws.com/' +
                                            //         upcomingView.videos[0]
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
                                Participants List (Total Participants :{' '}
                                {upcomingView &&
                                    upcomingView.total_number_of_participants &&
                                    upcomingView.total_number_of_participants}
                                )
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
