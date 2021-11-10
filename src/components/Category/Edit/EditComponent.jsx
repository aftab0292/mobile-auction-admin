import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import * as RouterPropTypes from 'react-router-prop-types';
import {Row, Col, Button, Card, FormGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Form, Field, reduxForm} from 'redux-form';
import DropZone from '~components/Util/DropZone';
import Loader from '~components/Util/Loader';
import ValidationError from '~components/Util/ValidationError';
import Joi from 'joi';
import {validate} from '~util';
import {uploadFileApi} from "~apis/utils";
import {CATEGORY_ICON} from '~enums/uploadConfig';

class Edit extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        history: RouterPropTypes.history.isRequired,
        id: PropTypes.string.isRequired,
        editCategory: PropTypes.func.isRequired,
        updateCategory: PropTypes.func.isRequired,
        edit: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            icon: PropTypes.string,
            parent: PropTypes.string,
            maxAuctionExpireTime: PropTypes.number,
        })
    };

    state = {
        errors: null,
        icon: '',
        isEditFormInitialized: false
    };

    componentWillMount() {
        const {id, editCategory} = this.props;
        id && editCategory(id);
    }

    componentWillUnmount() {
        const {editCategory} = this.props;
        editCategory(null);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {id, initialize, edit: {_id, name, description, maxAuctionExpireTime, icon}} = nextProps;
        const {isEditFormInitialized} = this.state;
        if (_id === id && !isEditFormInitialized) {
            initialize({
                name,
                description,
                maxAuctionExpireTime
            });
            this.setState({
                isEditFormInitialized: true,
                icon
            });
        }
    }

    onIconDrop = async files => {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const formData = new FormData();
            formData.append('file', file);
            const {success, data} = await uploadFileApi('CATEGORY_ICON', formData);
            this.setState({
                icon: success ? data : ''
            });
        }
    };

    onSubmit = async data => {
        const formData = {
            ...data,
            icon: this.state.icon
        };
        for (let i in formData) {
            !(formData[i]) && delete formData[i]
        }
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
        };

        !this.props.edit.parent && (validationRules.maxAuctionExpireTime = Joi.number()
            .integer()
            .min(1)
            .required());
        const errors = validate(Joi.object().keys(validationRules), formData);
        this.setState({
            errors,
        });

        if (!errors) {
            const {id, history, updateCategory} = this.props;
            await updateCategory(id, formData, history.push);
        }
    };

    render() {
        const {submitting, handleSubmit, edit} = this.props;
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
                                    to={edit.parent ? `/categories/sub-categories/${edit.parent}` : '/categories'}>Categories</Link>
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
                                    <Col lg={!edit.parent ? 6 : 12} md={!edit.parent ? 6 : 12} sm={!edit.parent ? 6 : 12} xs={12}>
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
                                    {!edit.parent && <Col lg={!edit.parent ? 6 : 12} md={!edit.parent ? 6 : 12} sm={!edit.parent ? 6 : 12} xs={12}>
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
                                            <label>Icon</label>
                                            <DropZone
                                                accept='image/*'
                                                onDrop={this.onIconDrop}
                                                maxFiles={1}
                                                maxFileSize={CATEGORY_ICON.MAX_SIZE}
                                                thumbs={[{
                                                    url: edit.icon,
                                                    aws: true,
                                                    success: true
                                                }]}
                                            />
                                            {isErrors && <ValidationError fieldName='icon' message={errors.icon}/>}
                                        </FormGroup>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <FormGroup className="mb-0 text-right">
                                            <Button variant='primary' type="submit" disabled={submitting}>
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

Edit = reduxForm({
    form: 'editCategoryForm'
})(Edit);

export default Edit;