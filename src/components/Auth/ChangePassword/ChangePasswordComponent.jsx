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

class ChangePassword extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        history: RouterPropTypes.history.isRequired,
        changePassword: PropTypes.func.isRequired,
       
    };
    state = {       
        errors: null
    };

    
    onSubmit = async data => {
        const formData = {...data};
        const errors = validate(Joi.object().keys({
            currentPassword: Joi.string().required(),
            newPassword: commonValidationRules.password,
            confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
        }), formData);
        this.setState({
            errors,
        });
        if (!errors) {
            const {history, changePassword} = this.props;
            await changePassword({currentPassword: formData.currentPassword, newPassword: formData.newPassword},history.push);
        }
    };

    render() {
        const {pristine, submitting, handleSubmit} = this.props;
        const {errors} = this.state;
        const isErrors = !!errors;
        return (
            <Row>
            <Col lg={12}>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>                          
                            <li className="breadcrumb-item active">Change Password</li>
                        </ol>
                    </div>
                    <h4 className="page-title">Change Password</h4>
                </div>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit(this.onSubmit)}>
                            <Row>
                                <Col md={12}>
                                    <FormGroup className="mb-3">
                                        <label>Current Password <span className="text-danger">*</span></label>
                                        <Field
                                            name="currentPassword"
                                            component="input"
                                            type="text"
                                            className="form-control"
                                            placeholder="Current Password"
                                            autoComplete="off"
                                        />
                                        {isErrors && <ValidationError fieldName='currentPassword' message={errors.currentPassword}/>}
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup className="mb-3">
                                        <label>New Password<span className="text-danger">*</span></label>
                                        <Field
                                            name="newPassword"
                                            component="input"
                                            type="password"
                                            className="form-control"
                                            placeholder="New Password"
                                            autoComplete="off"
                                            readOnly
                                            onFocus={e => e.target.removeAttribute('readonly')}
                                        />
                                        {isErrors && <ValidationError fieldName='newPassword' message={errors.newPassword}/>}
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup className="mb-3">
                                        <label>Confirm Password <span className="text-danger">*</span></label>
                                        <Field
                                            name="confirmPassword"
                                            component="input"
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm Password"
                                            autoComplete="off"
                                            readOnly
                                            onFocus={e => e.target.removeAttribute('readonly')}
                                        />
                                        {isErrors && <ValidationError fieldName='confirmPassword' message={errors.confirmPassword}/>}
                                    </FormGroup>
                                </Col>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <FormGroup className="mb-0 text-right">
                                        <Button variant='primary' type="submit" disabled={pristine || submitting}>Submit</Button>
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
ChangePassword = reduxForm({
    form: 'changePassword'
})(ChangePassword);

export default ChangePassword;