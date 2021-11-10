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

class Login extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        history: RouterPropTypes.history.isRequired,
        signIn: PropTypes.func.isRequired
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
            email: commonValidationRules.email,
            password: Joi.string()
                .required()
        }), data);

        this.setState({
            errors,
        });

        if (!errors) {
            const {history, signIn} = this.props;
            await signIn(data, history.push);
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
                                        <FormGroup className="mb-3">
                                            <label>Password</label>
                                            <InputGroup>
                                                <Field name="password" component="input"
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
                                            <ValidationError fieldName='password' message={errors.password}/>}
                                        </FormGroup>
                                        <FormGroup className="mb-0 text-center">
                                            <Button style={{height: '45px'}} className="btn-primary btn-block"
                                                    type="submit" disabled={pristine || submitting}>
                                                {
                                                    !submitting ? 'Login' : <Loader loaderStyle={2}/>
                                                }
                                            </Button>
                                        </FormGroup>
                                        <FormGroup className="mt-3 text-center">
                                            <p>
                                                <Link className="text-primary ml-1" to="/auth/forgot-password">Forgot
                                                    your password?</Link>
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

Login = reduxForm({
    form: 'login'
})(Login);

export default Login;
