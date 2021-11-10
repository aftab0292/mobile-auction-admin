import React, {Component} from 'react'
import * as PropTypes from "prop-types";
import {Row, Col, Card, FormGroup} from 'react-bootstrap';
import {Link} from "react-router-dom";

class View extends Component {
    static propTypes = {
        view: PropTypes.object,
        viewUser: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const {viewUser, match: {params: {id}}} = this.props;
        viewUser(id);
    }

    renderView = (title, text) => {
        return (
            <Col lg={6} md={6} sm={12} xs={12}>
                <FormGroup>
                    <strong>{title} :</strong> {text}
                </FormGroup>
            </Col>
        )
    };

    render() {
        const {view} = this.props;
        return (
            <Row>
                <Col lg={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                                <li className="breadcrumb-item"><Link to='/users'>Users</Link></li>
                                <li className="breadcrumb-item active">User Details</li>
                            </ol>
                        </div>
                        <h4 className="page-title">User Manager</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Header className='bg-white'>
                            <h4 className="header-title">User Detail</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {view.fullName && this.renderView('Name', view.fullName)}
                                {view.email && this.renderView('Email', view.email)}
                                {view.formattedPhone && this.renderView('Mobile', view.formattedPhone)}
                                {this.renderView('Status', view.isSuspended ? 'INACTIVE' : 'ACTIVE')}
                            </Row>
                            <Row>
                                {view.address && this.renderView('Address', view.address)}                                
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default View;