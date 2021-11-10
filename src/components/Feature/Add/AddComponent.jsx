import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import * as RouterPropTypes from 'react-router-prop-types';
import {Row, Col, Button, Card, FormGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Form, Field, reduxForm} from 'redux-form';
import ValidationError from '~components/Util/ValidationError';
import Loader from '~components/Util/Loader';
import Joi from 'joi';
import {validate} from '~util';

class Add extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        history: RouterPropTypes.history.isRequired,
        addFeature: PropTypes.func.isRequired,
    };

    state = {
        errors: null,
    };

    onSubmit = async data => {
        const errors = validate(Joi.object().keys({
            plan: Joi.number()
                .min(1)
                .required(),
            validity: Joi.number()
                .integer()
                .min(1)
                .required(),
        }), data);

        this.setState({
            errors,
        });

        if (!errors) {
            const {history, addFeature} = this.props;
            await addFeature(data, history.push);
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
                                <li className="breadcrumb-item"><Link to={'/features'}>Features</Link></li>
                                <li className="breadcrumb-item active">Add Feature</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Add Feature</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(this.onSubmit)}>
                                <Row>
                                    <Col lg={6} md={6}>
                                        <FormGroup className="mb-3">
                                            <label>Plan Price <span className="text-danger">*</span></label>
                                            <Field
                                                name="plan"
                                                component="input"
                                                type="text"
                                                className="form-control"
                                                placeholder="Plan"
                                                autoComplete="off"
                                            />
                                            {isErrors && <ValidationError fieldName='plan' message={errors.plan}/>}
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <FormGroup className="mb-3">
                                            <label>Validity Days <span className="text-danger">*</span></label>
                                            <Field
                                                name="validity"
                                                component="input"
                                                type="text"
                                                className="form-control"
                                                placeholder="Validity Days"
                                                autoComplete="off"
                                            />
                                            {isErrors && <ValidationError fieldName='validity' message={errors.validity}/>}
                                        </FormGroup>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <FormGroup className="mb-0 text-right">
                                            <Button variant='primary' type="submit" disabled={pristine || submitting}>
                                                {
                                                    !submitting ? 'Submit' : <Loader loaderStyle={2}/>
                                                }
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

Add = reduxForm({
    form: 'addFeatureForm'
})(Add);

export default Add;