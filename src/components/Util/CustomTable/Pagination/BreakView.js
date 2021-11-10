import React from 'react';
import * as PropTypes from "prop-types";

const BreakView = ({ breakLabel, breakClassName = 'break', breakLinkClassName, onClick }) => {

    return (
        <li className={breakClassName}>
            <a className={breakLinkClassName}
                onClick={onClick}
                role="button"
                tabIndex="0"
                onKeyPress={onClick}>
                <i className={breakLabel}/>
            </a>
        </li>
    );
};

BreakView.propTypes = {
    breakLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    breakClassName: PropTypes.string,
    breakLinkClassName: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default BreakView;
