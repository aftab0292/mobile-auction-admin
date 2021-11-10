import React, { Component } from 'react';
import * as PropTypes from "prop-types";
import PageView from './PageView';
import BreakView from './BreakView';

class Pagination extends Component {
    static propTypes = {
        pageCount: PropTypes.number.isRequired,
        pageRangeDisplayed: PropTypes.number.isRequired,
        marginPagesDisplayed: PropTypes.number.isRequired,
        previousLabel: PropTypes.node,
        nextLabel: PropTypes.node,
        breakLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        hrefBuilder: PropTypes.func,
        onPageChange: PropTypes.func,
        initialPage: PropTypes.number,
        forcePage: PropTypes.number,
        disableInitialCallback: PropTypes.bool,
        containerClassName: PropTypes.string,
        pageClassName: PropTypes.string,
        pageLinkClassName: PropTypes.string,
        activeClassName: PropTypes.string,
        activeLinkClassName: PropTypes.string,
        previousClassName: PropTypes.string,
        nextClassName: PropTypes.string,
        previousLinkClassName: PropTypes.string,
        nextLinkClassName: PropTypes.string,
        disabledClassName: PropTypes.string,
        breakClassName: PropTypes.string,
        breakLinkClassName: PropTypes.string,
        extraAriaContext: PropTypes.string,
        ariaLabelBuilder: PropTypes.func,
    };

    static defaultProps = {
        pageCount: 10,
        pageRangeDisplayed: 2,
        marginPagesDisplayed: 3,
        activeClassName: 'selected',
        previousClassName: 'previous',
        nextClassName: 'next',
        previousLabel: 'Previous',
        nextLabel: 'Next',
        breakLabel: '...',
        disabledClassName: 'disabled',
        disableInitialCallback: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: props.initialPage || props.forcePage || 0,
        };
    }

    componentDidMount() {
        const {
            initialPage,
            disableInitialCallback,
        } = this.props;
        initialPage && !disableInitialCallback && this.callCallback(initialPage);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { forcePage } = this.props;
        nextProps.forcePage && forcePage !== nextProps.forcePage && this.setState({ selected: nextProps.forcePage });
    }

    handlePreviousPage = e => {
        const { selected } = this.state;
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        selected > 0 && this.handlePageSelected(selected - 1, e);
    };

    handleNextPage = e => {
        const { selected } = this.state;
        const { pageCount } = this.props;
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        selected < pageCount - 1 && this.handlePageSelected(selected + 1, e);
    };

    handlePageSelected = (selected, e) => {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        if (this.state.selected === selected) return;
        this.setState({ selected: selected });
        this.callCallback(selected);
    };

    getForwardJump = () => {
        const { selected } = this.state;
        const { pageCount, pageRangeDisplayed } = this.props;
        const forwardJump = selected + pageRangeDisplayed;
        return forwardJump >= pageCount ? pageCount - 1 : forwardJump;
    };

    getBackwardJump = () => {
        const { selected } = this.state;
        const { pageRangeDisplayed } = this.props;
        const backwardJump = selected - pageRangeDisplayed;
        return backwardJump < 0 ? 0 : backwardJump;
    };

    handleBreakClick = (index, e) => {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        const { selected } = this.state;
        this.handlePageSelected(selected < index ? this.getForwardJump() : this.getBackwardJump(), e);
    };

    hrefBuilder = pageIndex => {
        const { hrefBuilder, pageCount } = this.props;
        const { selected } = this.state;
        if (
            hrefBuilder &&
            pageIndex !== selected &&
            pageIndex >= 0 &&
            pageIndex < pageCount
        ) {
            return hrefBuilder(pageIndex + 1);
        }
    };

    ariaLabelBuilder(pageIndex) {
        const selected = pageIndex === this.state.selected;
        const {ariaLabelBuilder, extraAriaContext } = this.props;
        if (
            ariaLabelBuilder &&
            pageIndex >= 0 &&
            pageIndex < this.props.pageCount
        ) {
            return extraAriaContext && !selected ? `${ariaLabelBuilder(pageIndex + 1, selected)} ${extraAriaContext}` : ariaLabelBuilder(pageIndex + 1, selected);
        }
    }

    callCallback = selectedItem => {
        if (
            typeof this.props.onPageChange !== 'undefined' &&
            typeof this.props.onPageChange === 'function'
        ) {
            this.props.onPageChange({ selected: selectedItem });
        }
    };

    getPageElement(index) {
        const { selected } = this.state;
        const {
            pageClassName,
            pageLinkClassName,
            activeClassName,
            activeLinkClassName,
            extraAriaContext,
        } = this.props;

        return (
            <PageView
                key={index}
                onClick={this.handlePageSelected.bind(null, index)}
                selected={selected === index}
                pageClassName={pageClassName}
                pageLinkClassName={pageLinkClassName}
                activeClassName={activeClassName}
                activeLinkClassName={activeLinkClassName}
                extraAriaContext={extraAriaContext}
                href={this.hrefBuilder(index)}
                ariaLabel={this.ariaLabelBuilder(index)}
                page={index + 1}
            />
        );
    }

    pagination = () => {
        const items = [];
        const {
            pageRangeDisplayed,
            pageCount,
            marginPagesDisplayed,
            breakLabel,
            breakClassName,
            breakLinkClassName,
        } = this.props;
        const { selected } = this.state;

        if (pageCount <= pageRangeDisplayed) {
            for (let index = 0; index < pageCount; index++) {
                items.push(this.getPageElement(index));
            }
        } else {
            let leftSide = pageRangeDisplayed / 2;
            let rightSide = pageRangeDisplayed - leftSide;

            if (selected > pageCount - pageRangeDisplayed / 2) {
                rightSide = pageCount - selected;
                leftSide = pageRangeDisplayed - rightSide;
            } else if (selected < pageRangeDisplayed / 2) {
                leftSide = selected;
                rightSide = pageRangeDisplayed - leftSide;
            }

            let index;
            let page;
            let breakView;
            let createPageView = index => this.getPageElement(index);

            for (index = 0; index < pageCount; index++) {
                page = index + 1;

                if (page <= marginPagesDisplayed) {
                    items.push(createPageView(index));
                    continue;
                }

                if (page > pageCount - marginPagesDisplayed) {
                    items.push(createPageView(index));
                    continue;
                }

                if (index >= selected - leftSide && index <= selected + rightSide) {
                    items.push(createPageView(index));
                    continue;
                }

                if (breakLabel && items[items.length - 1] !== breakView) {
                    breakView = (
                        <BreakView
                            key={index}
                            breakLabel={breakLabel}
                            breakClassName={breakClassName}
                            breakLinkClassName={breakLinkClassName}
                            onClick={this.handleBreakClick.bind(null, index)}
                        />
                    );
                    items.push(breakView);
                }
            }
        }

        return items;
    };

    render() {
        const {
            disabledClassName,
            previousClassName,
            nextClassName,
            pageCount,
            containerClassName,
            previousLinkClassName,
            previousLabel,
            nextLinkClassName,
            nextLabel,
        } = this.props;

        const { selected } = this.state;
        const previousClasses = `${previousClassName} ${selected === 0 ? `${disabledClassName}` : ''}`;
        const nextClasses = `${nextClassName} ${selected === pageCount - 1 ? `${disabledClassName}` : ''}`;
        const previousAriaDisabled = selected === 0 ? 'true' : 'false';
        const nextAriaDisabled = selected === pageCount - 1 ? 'true' : 'false';

        return (
            <ul className={containerClassName}>
                <li className={previousClasses}>
                    <a onClick={this.handlePreviousPage}
                        className={previousLinkClassName}
                        href={this.hrefBuilder(selected - 1)}
                        tabIndex="0"
                        role="button"
                        onKeyPress={this.handlePreviousPage}
                        aria-disabled={previousAriaDisabled}>
                        {previousLabel}
                    </a>
                </li>
                {this.pagination()}
                <li className={nextClasses}>
                    <a onClick={this.handleNextPage}
                        className={nextLinkClassName}
                        href={this.hrefBuilder(selected + 1)}
                        tabIndex="0"
                        role="button"
                        onKeyPress={this.handleNextPage}
                        aria-disabled={nextAriaDisabled}>
                        {nextLabel}
                    </a>
                </li>
            </ul>
        );
    }
}
export default Pagination;