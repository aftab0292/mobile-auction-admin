import React, { Component, Fragment } from 'react';
import * as PropTypes from 'prop-types';
import Pagination from './Pagination';
import TopBar from './TopBar';

class CustomTable extends Component {
    static propTypes = {
        showSrNo: PropTypes.bool,
        listId: PropTypes.string,
        listHeaders: PropTypes.array.isRequired,
        listData: PropTypes.array.isRequired,
        customBody: PropTypes.func,
        fetchData: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        sizePerPage: PropTypes.number.isRequired,
        searchedTerm: PropTypes.string,
        sort: PropTypes.object.isRequired,
        isSearchable: PropTypes.bool,
    };

    static defaultProps = {
        isSearchable: true
    };

    onPageChange = async ({ selected }) => {
        const { sizePerPage, searchedTerm, sort, fetchData } = this.props;
        await fetchData({
            page: selected + 1,
            sizePerPage,
            searchedTerm,
            sortKey: Object.keys(sort)[0],
            sortType: Object.values(sort)[0],
        });
    };

    onSortChange = async e => {
        const { sizePerPage, searchedTerm, sort, fetchData } = this.props;
        const sortKey = e.target.getAttribute('data-field');
        const sortType = Object.values(sort)[0] === 'desc' ? 'asc' : 'desc';
        await fetchData({
            page: 1,
            sizePerPage,
            searchedTerm,
            sortKey,
            sortType,
        });
    };

    setActivePage = page => {
        const pageLinks = document.querySelectorAll('.paginationLinks');
        for (let i = 0; i < pageLinks.length; i++) {
            pageLinks[i].classList.remove('active');
            if (pageLinks[i].firstChild.innerHTML === page.toString()) {
                pageLinks[i].classList.add('active');
            }
        }
    };

    render() {
        const {
            showSrNo = true,
            listId = '_id',
            listHeaders,
            listData,
            customBody,
            count,
            currentPage,
            sizePerPage,
            searchedTerm,
            sort,
            fetchData,
            isSearchable,
        } = this.props;
        return (
            <Fragment>
                <TopBar
                    sizePerPage={sizePerPage}
                    searchedTerm={searchedTerm}
                    fetchData={fetchData}
                    isSearchable={isSearchable}
                    sort={sort}
                />
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            {showSrNo && <th key="sr-no"> Sr. No.</th>}
                            {listHeaders.map(th => (
                                <th
                                    key={th.dataField}
                                    data-field={th.dataField}
                                    onClick={e => {
                                        th.sort && this.onSortChange(e);
                                    }}
                                >
                                    {th.text}
                                    {th.sort && (
                                        <Fragment>
                                            <i
                                                style={{
                                                    color:
                                                        Object.keys(sort)[0] === th.dataField &&
                                                        Object.values(sort)[0] === 'asc'
                                                            ? '#2faccc'
                                                            : '#baa0c2',
                                                }}
                                                className="fe-arrow-up"
                                            />
                                            <i
                                                style={{
                                                    color:
                                                        Object.keys(sort)[0] === th.dataField &&
                                                        Object.values(sort)[0] === 'desc'
                                                            ? '#2faccc'
                                                            : '#baa0c2',
                                                }}
                                                className="fe-arrow-down"
                                            />
                                        </Fragment>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {listData &&
                            listData.map((data, index) => (
                                <tr key={data[listId]}>
                                    {showSrNo && <th key="sr-no">{index + 1}</th>}
                                    {listHeaders.map(th => {
                                        if (th.isCustom) {
                                            return customBody(th.text, index);
                                        } else {
                                            return (
                                                <td className="text-center" key={th.text}>
                                                    {data[th.dataField]}
                                                </td>
                                            );
                                        }
                                    })}
                                </tr>
                            ))}
                    </tbody>
                </table>
                <Pagination
                    pageCount={Math.ceil(count / sizePerPage)}
                    initialPage={currentPage - 1}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={3}
                    onPageChange={this.onPageChange}
                    containerClassName="pagination"
                    pageClassName="page-item paginationLinks"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    previousLabel="Previous"
                    nextLabel="Next"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    activeClassName="activePage"
                    breakLabel="fe-more-horizontal"
                />
                {this.setActivePage(currentPage)}
            </Fragment>
        );
    }
}

export default CustomTable;
