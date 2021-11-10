import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Row, Col, Dropdown, FormGroup, InputGroup } from 'react-bootstrap';

class TopBar extends Component {
    static propTypes = {
        fetchData: PropTypes.func.isRequired,
        sizePerPage: PropTypes.number.isRequired,
        searchedTerm: PropTypes.string,
        sort: PropTypes.object.isRequired,
        isSearchable: PropTypes.bool.isRequired,
    };

    onPageSizeChange = async e => {
        const { searchedTerm, sort, fetchData } = this.props;
        await fetchData({
            page: 1,
            sizePerPage: parseInt(e.target.innerHTML || 10),
            searchedTerm,
            sortKey: Object.keys(sort)[0],
            sortType: Object.values(sort)[0],
        });
    };

    onSearch = async e => {
        const { sort, sizePerPage, fetchData } = this.props;
        await fetchData({
            page: 1,
            sizePerPage,
            searchedTerm: e.target.value || '',
            sortKey: Object.keys(sort)[0],
            sortType: Object.values(sort)[0],
        });
    };

    render() {
        const { sizePerPage, searchedTerm, isSearchable } = this.props;
        return (
            <Row>
                <Col>
                    <label className="text-center">
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {sizePerPage} <i className="mdi mdi-chevron-down" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={e => this.onPageSizeChange(e)}>10</Dropdown.Item>
                                <Dropdown.Item onClick={e => this.onPageSizeChange(e)}>25</Dropdown.Item>
                                <Dropdown.Item onClick={e => this.onPageSizeChange(e)}>50</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </label>
                </Col>
                {isSearchable && (
                    <Col lg="auto" md="auto" sm="auto">
                        <FormGroup className="mb-3">
                            <InputGroup>
                                <input
                                    name="table-search"
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    value={searchedTerm}
                                    onChange={e => this.onSearch(e)}
                                />
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="fa fa-search" />
                                    </span>
                                </div>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                )}
            </Row>
        );
    }
}

export default TopBar;
