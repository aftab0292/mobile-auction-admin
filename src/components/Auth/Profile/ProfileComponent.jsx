import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as RouterPropTypes from 'react-router-prop-types';
import Joi from 'joi';
import { Row, Col, Button, Card, FormGroup } from 'react-bootstrap';
import { Form, Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import ValidationError from '~components/Util/ValidationError';
import { commonValidationRules, validate } from '~util';

class Profile extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        history: RouterPropTypes.history.isRequired,
        updateProfile: PropTypes.func.isRequired,
        profile: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            email: PropTypes.string,
        })
    };
    
    state = {
        errors: null,
    };

    componentDidMount(){
        const {initialize, user: {firstName, lastName, email}} = this.props;
        initialize({
            firstName,
            lastName,
            email
        });
    }

    onSubmit = async data => {
        const errors = validate(
            Joi.object().keys({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: commonValidationRules.email,
            }),
            data
        );
        
        this.setState({
            errors,
        });

        if (!errors) {
            const { history, updateProfile } = this.props;
            await updateProfile(data);
        }
    };

    render() {
        const { pristine, submitting, handleSubmit } = this.props;
        const { errors } = this.state;
        const isErrors = !!errors;       
        return (
            <Row>
                <Col lg={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <Link to="/">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Profile</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(this.onSubmit)}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup className="mb-3">
                                            <label>
                                                First Name <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                name="firstName"
                                                component="input"
                                                type="text"
                                                className="form-control"
                                                placeholder="First Name"
                                                autoComplete="off"
                                            />
                                            {isErrors && (
                                                <ValidationError fieldName="firstName" message={errors.firstName} />
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup className="mb-3">
                                            <label>
                                                Last Name<span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                name="lastName"
                                                component="input"
                                                type="text"
                                                className="form-control"
                                                placeholder="Last Name"
                                                autoComplete="off"
                                                readOnly
                                                onFocus={e => e.target.removeAttribute('readonly')}
                                            />
                                            {isErrors && (
                                                <ValidationError fieldName="lastName" message={errors.lastName} />
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup className="mb-3">
                                            <label>
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                name="email"
                                                component="input"
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                autoComplete="off"
                                                readOnly
                                                onFocus={e => e.target.removeAttribute('readonly')}
                                            />
                                            {isErrors && <ValidationError fieldName="email" message={errors.email} />}
                                        </FormGroup>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <FormGroup className="mb-0 text-right">
                                            <Button variant="primary" type="submit" disabled={pristine || submitting}>
                                                Submit
                                            </Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}
Profile = reduxForm({
    form: 'profileForm',
})(Profile);

export default Profile;
