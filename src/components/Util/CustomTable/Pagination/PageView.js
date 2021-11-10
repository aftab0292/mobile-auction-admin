import React from 'react';
import * as PropTypes from "prop-types";

const PageView = ({
                      pageClassName,
                      pageLinkClassName,
                      onClick,
                      href,
                      ariaLabel,
                      page,
                      extraAriaContext,
                      selected,
                      activeClassName,
                      activeLinkClassName,
                  }) => {
    let ariaCurrent = null;
    ariaLabel = ariaLabel || `Page ${page} ${extraAriaContext ? `${extraAriaContext}` : ''}`;

    if (selected) {
        ariaCurrent = 'page';
        ariaLabel = ariaLabel || `Page ${page} is your current page`;
        pageClassName = pageClassName ? `${pageClassName} ${activeClassName}` : activeClassName;
        pageLinkClassName = pageLinkClassName ? `${pageLinkClassName} ${`activeLinkClassName` || ''}` : activeLinkClassName || '';
    }

    return (
        <li className={pageClassName}>
            <a onClick={onClick}
               role="button"
               className={pageLinkClassName}
               href={href}
               tabIndex="0"
               aria-label={ariaLabel}
               aria-current={ariaCurrent}
               onKeyPress={onClick}>
                {page}
            </a>
        </li>
    );
};

PageView.propTypes = {
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    pageClassName: PropTypes.string,
    pageLinkClassName: PropTypes.string,
    activeClassName: PropTypes.string,
    activeLinkClassName: PropTypes.string,
    extraAriaContext: PropTypes.string,
    href: PropTypes.string,
    ariaLabel: PropTypes.string,
    page: PropTypes.number.isRequired,
};

export default PageView;
