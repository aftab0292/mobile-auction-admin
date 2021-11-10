import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import * as RouterPropTypes from 'react-router-prop-types';
import Joi from 'joi';
import classNames from 'classnames';
import {Container, Row, Col, Button, Card, FormGroup, InputGroup} from 'react-bootstrap';
import {Form, Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import Loader from '~components/Util/Loader';
import StaticImage from '~components/Util/StaticImage';
import ValidationError from '~components/Util/ValidationError';
import {commonValidationRules, validate} from '~util';

class ResetPassword extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        history: RouterPropTypes.history.isRequired,
        resetPassword: PropTypes.func.isRequired,
        user: PropTypes.shape({
            email: PropTypes.string.isRequired
        }).isRequired
    };

    state = {
        plainText: false,
        errors: null
    };

    togglePlaintext = () => this.setState({
        plainText: !this.state.plainText
    });

    onSubmit = async data => {
        const errors = validate(Joi.object().keys({
            otp: commonValidationRules.otp,
            newPassword: commonValidationRules.password
        }), data);

        this.setState({
            errors,
        });

        if (!errors) {
            const {history, user, resetPassword} = this.props;
            await resetPassword({
                ...data,
                email: user.email
            }, history.push);
        }
    };

    render() {
        const {pristine, submitting, handleSubmit} = this.props;
        const {errors} = this.state;
        const isErrors = !!errors;
        return (
            <div className="account-pages mt-5 mb-5">
                <Container>
                    <Form onSubmit={handleSubmit(this.onSubmit)}>
                        <Row className="justify-content-center">
                            <Col className="col-md-8 col-lg-6 col-xl-5">
                                <Card>
                                    <Card.Body className="p-4">
                                        <div className="text-center w-75 m-auto">
                                            <span>
                                                <StaticImage src="logo.png" alt={process.env.REACT_APP_SITE_TITLE}/>
                                            </span>
                                        </div>
                                        <FormGroup className="mb-3">
                                            <label>Email</label>
                                            <InputGroup>
                                                <Field name="otp" component="input" type="password"
                                                       className="form-control" placeholder="OTP"/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        <i className='fas fa-key'/>
                                                    </span>
                                                </div>
                                            </InputGroup>
                                            {isErrors &&
                                            <ValidationError fieldName='otp' message={errors.otp}/>}
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <label>Password</label>
                                            <InputGroup>
                                                <Field name="newPassword" component="input"
                                                       type={this.state.plainText ? 'text' : 'password'}
                                                       className="form-control" placeholder="Password"/>
                                                <div className="input-group-append">
                                                <span className="input-group-text" onClick={this.togglePlaintext}>
                                                    <i className={classNames({
                                                        'fa': true,
                                                        'fa-eye': !this.state.plainText,
                                                        'fa-eye-slash': this.state.plainText
                                                    })}/>
                                                </span>
                                                </div>
                                            </InputGroup>
                                            {isErrors &&
                                            <ValidationError fieldName='newPassword' message={errors.newPassword}/>}
                                        </FormGroup>
                                        <FormGroup className="mb-0 text-center">
                                            <Button style={{height: '45px'}} className="btn-primary btn-block"
                                                    type="submit" disabled={pristine || submitting}>
                                                {
                                                    !submitting ? 'Submit' : <Loader loaderStyle={2}/>
                                                }
                                            </Button>
                                        </FormGroup>
                                        <FormGroup className="mt-3 text-center">
                                            <p>
                                                <Link className="text-primary ml-1" to="/auth/log-in">Back to Login</Link>
                                            </p>
                                        </FormGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}

ResetPassword = reduxForm({
    form: 'login'
})(ResetPassword);

export default ResetPassword;