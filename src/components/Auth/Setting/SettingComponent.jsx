import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as RouterPropTypes from 'react-router-prop-types';
import { Row, Col, Button, Card, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, Field, reduxForm } from 'redux-form';
import Loader from '~components/Util/Loader';
import ValidationError from '~components/Util/ValidationError';
import Joi from 'joi';
import { validate } from '~util';

class Setting extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        history: RouterPropTypes.history.isRequired,
        getSetting: PropTypes.func.isRequired,
        updateSetting: PropTypes.func.isRequired,
        adminSetting: PropTypes.shape({
            androidAppVersion: PropTypes.string,
            androidForceUpdate: PropTypes.bool,
            iosAppVersion: PropTypes.string,
            iosForceUpdate: PropTypes.bool,
            maintenance: PropTypes.bool,
        }),
    };

    state = {
        errors: null,
        isEditFormInitialized: false,
    };

    componentWillMount() {
        const { getSetting } = this.props;
        getSetting();
    }

    componentWillUnmount() {
        const { getSetting } = this.props;
        getSetting(null);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {
            initialize,
            adminSetting: { androidAppVersion, androidForceUpdate, iosAppVersion, iosForceUpdate, maintenance },
        } = nextProps;
        const { isEditFormInitialized } = this.state;
        if (!isEditFormInitialized) {
            initialize(
                {
                    androidAppVersion,
                    androidForceUpdate,
                    iosAppVersion,
                    iosForceUpdate,
                    maintenance,
                });
            this.setState({
                isEditFormInitialized: true,
            });
        }
    }

    onSubmit = async data => {
        const errors = validate(
            Joi.object().keys({
                androidAppVersion: Joi.string()
                    .regex(/^[\d]+\.[\d]+\.[\d]+$/, 'Semantic Version')
                    .required(),
                androidForceUpdate: Joi.boolean().required(),
                iosAppVersion: Joi.string()
                    .regex(/^[\d]+\.[\d]+\.[\d]+$/, 'Semantic Version')
                    .required(),
                iosForceUpdate: Joi.boolean().required(),
                maintenance: Joi.boolean().required(),
            }),
            data
        );
        this.setState({
            errors,
        });

        if (!errors) {
            const { updateSetting, history } = this.props;
            await updateSetting(data);
        }
    };

    render() {
        const { submitting, handleSubmit } = this.props;
        const { errors } = this.state;
        const isErrors = !!errors;
        console.log('userData', this.props.adminSetting);
        return (
            <Row>
                <Col lg={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <Link to="/">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Setting</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Setting</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(this.onSubmit)}>
                                <Row>
                                    <Col lg={6} md={6}>
                                        <FormGroup className="mb-3">
                                            <label>
                                                Android App Version <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                name="androidAppVersion"
                                                component="input"
                                                type="text"
                                                className="form-control"
                                                placeholder="Android App Version"
                                                autoComplete="off"
                                            />
                                            {isErrors && (
                                                <ValidationError
                                                    fieldName="androidAppVersion"
                                                    message={errors.androidAppVersion}
                                                />
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <FormGroup className="mb-3">
                                            <label>
                                                Android Force Update <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                name="androidForceUpdate"
                                                component="select"
                                                type="select"
                                                className="form-control"
                                                autoComplete="off"
                                            >
                                                <option value={true}>Enable</option>
                                                <option value={false}>Disable</option>
                                            </Field>
                                            {isErrors && (
                                                <ValidationError
                                                    fieldName="androidForceUpdate"
                                                    message={errors.androidForceUpdate}
                                                />
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <FormGroup className="mb-3">
                                            <label>
                                                Ios App Version <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                name="iosAppVersion"
                                                component="input"
                                                type="text"
                                                className="form-control"
                                                placeholder="Ios App Version"
                                                autoComplete="off"
                                            />
                                            {isErrors && (
                                                <ValidationError
                                                    fieldName="iosAppVersion"
                                                    message={errors.iosAppVersion}
                                                />
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <FormGroup className="mb-3">
                                            <label>
                                                Ios Force Update <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                name="iosForceUpdate"
                                                component="select"
                                                type="select"
                                                className="form-control"
                                                autoComplete="off"
                                            >
                                                <option value={true}>Enable</option>
                                                <option value={false}>Disable</option>
                                            </Field>
                                            {isErrors && (
                                                <ValidationError
                                                    fieldName="iosForceUpdate"
                                                    message={errors.iosForceUpdate}
                                                />
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <FormGroup className="mb-3">
                                            <label>
                                                Maintenance<span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                name="maintenance"
                                                component="select"
                                                type="select"
                                                className="form-control"
                                                autoComplete="off"
                                            >
                                                <option value={true}>Enable</option>
                                                <option value={false}>Disable</option>
                                            </Field>
                                            {isErrors && (
                                                <ValidationError fieldName="maintenance" message={errors.maintenance} />
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <FormGroup className="mb-0 text-right">
                                            <Button variant="primary" type="submit" disabled={submitting}>
                                                {!submitting ? 'Submit' : <Loader loaderStyle={2} />}
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

Setting = reduxForm({
    form: 'settingForm',
})(Setting);

export default Setting;
