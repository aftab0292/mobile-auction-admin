import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import * as RouterPropTypes from 'react-router-prop-types';
import Joi from 'joi';
import {Container, Row, Col, Button, Card, FormGroup, InputGroup} from 'react-bootstrap';
import {Form, Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import Loader from '~components/Util/Loader';
import StaticImage from '~components/Util/StaticImage';
import ValidationError from '~components/Util/ValidationError';
import {commonValidationRules, validate} from '~util';

class ForgotPassword extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        history: RouterPropTypes.history.isRequired,
        forgotPassword: PropTypes.func.isRequired
    };

    state = {
        plainText: false,
        errors: null
    };

    onSubmit = async data => {
        const errors = validate(Joi.object().keys({
            email: commonValidationRules.email,
        }), data);

        this.setState({
            errors,
        });

        if (!errors) {
            const {history, forgotPassword} = this.props;
            await forgotPassword(data, history.push);
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
                                            <p className="text-muted mb-4 mt-3">Enter your email address and we'll send you
                                                an email with instructions to reset your password.</p>
                                        </div>
                                        <FormGroup className="mb-3">
                                            <label>Email</label>
                                            <InputGroup>
                                                <Field name="email" component="input" type="email"
                                                       className="form-control" placeholder="Email"/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        <i className='fa fa-envelope'/>
                                                    </span>
                                                </div>
                                            </InputGroup>
                                            {isErrors &&
                                            <ValidationError fieldName='email' message={errors.email}/>}
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

ForgotPassword = reduxForm({
    form: 'forgotPassword'
})(ForgotPassword);

export default ForgotPassword;
