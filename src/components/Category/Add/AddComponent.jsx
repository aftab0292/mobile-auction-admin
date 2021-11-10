import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import * as RouterPropTypes from 'react-router-prop-types';
import Joi from 'joi';
import {Row, Col, Button, Card, FormGroup} from 'react-bootstrap';
import {Form, Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import DropZone from '~components/Util/DropZone';
import Loader from '~components/Util/Loader';
import ValidationError from '~components/Util/ValidationError';
import {CATEGORY_ICON} from '~enums/uploadConfig';
import {validate} from '~util';
import {uploadFileApi} from "~apis/utils";

class Add extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        history: RouterPropTypes.history.isRequired,
        addCategory: PropTypes.func.isRequired,
        parent: PropTypes.oneOfType([
            PropTypes.oneOf([null]),
            PropTypes.string,
        ]),
    };

    state = {
        errors: null,
        icon: '',
    };

    onIconDrop = async file => {
        const formData = new FormData();
        formData.append('file', file);
        const {success, data} = await uploadFileApi('CATEGORY_ICON', formData);
        this.setState({
            icon: success ? data : '',
        });
    };

    onSubmit = async data => {
        const formData = {
            ...data,
            icon: this.state.icon
        };
        const validationRules = {
            name: Joi.string()
                .trim()
                .min(3)
                .max(30)
                .required(),
            description: Joi.string()
                .trim()
                .min(3)
                .max(100)
                .required(),
            icon: Joi.string()
                .trim()
                .max(200)
                .required(),
            parent: Joi.string()
                .trim()
                .optional()
        };
        !this.props.parent && (validationRules.maxAuctionExpireTime = Joi.number()
            .integer()
            .min(1)
            .required());
        !!this.props.parent && (formData.parent = this.props.parent);
        const errors = validate(Joi.object().keys(validationRules), formData);
        this.setState({
            errors,
        });

        if (!errors) {
            const {history, addCategory} = this.props;
            await addCategory(formData, history.push);
        }
    };

    render() {
        const {pristine, submitting, handleSubmit, parent} = this.props;
        const {errors} = this.state;
        const isErrors = !!errors;
        return (
            <Row>
                <Col lg={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                                <li className="breadcrumb-item"><Link
                                    to={parent ? `/categories/sub-categories/${parent}` : '/categories'}>Categories</Link>
                                </li>
                                <li className="breadcrumb-item active">Add Category</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Add Category</h4>
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(this.onSubmit)}>
                                <Row>
                                    <Col lg={!parent ? 6 : 12} md={!parent ? 6 : 12} sm={!parent ? 6 : 12} xs={12}>
                                        <FormGroup className="mb-3">
                                            <label>Name <span className="text-danger">*</span></label>
                                            <Field
                                                name="name"
                                                component="input"
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                autoComplete="off"
                                            />
                                            {isErrors && <ValidationError fieldName='name' message={errors.name}/>}
                                        </FormGroup>
                                    </Col>
                                    {!parent && <Col lg={!parent ? 6 : 12} md={!parent ? 6 : 12} sm={!parent ? 6 : 12} xs={12}>
                                        <FormGroup className="mb-3">
                                            <label>Max Auction Expire Time (in days) <span className="text-danger">*</span></label>
                                            <Field
                                                name="maxAuctionExpireTime"
                                                component="input"
                                                type="text"
                                                className="form-control"
                                                placeholder="Max Auction Expire Time"
                                                autoComplete="off"
                                            />
                                            {isErrors && <ValidationError fieldName='maxAuctionExpireTime' message={errors.maxAuctionExpireTime}/>}
                                        </FormGroup>
                                    </Col>}
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <FormGroup className="mb-3">
                                            <label>Description <span className="text-danger">*</span></label>
                                            <Field
                                                name="description"
                                                component="textarea"
                                                className='form-control'
                                                placeholder='Description'
                                                autoComplete="off"
                                            />
                                            {isErrors && <ValidationError fieldName='description' message={errors.description}/>}
                                        </FormGroup>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <FormGroup className="mb-3">
                                            <label>Icon <span className="text-danger">*</span></label>
                                            <DropZone
                                                accept='image/*'
                                                onDrop={this.onIconDrop}
                                                maxFiles={1}
                                                maxFileSize={CATEGORY_ICON.MAX_SIZE}
                                            />
                                            {isErrors && <ValidationError fieldName='icon' message={errors.icon}/>}
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
    form: 'addCategoryForm'
})(Add);

export default Add;