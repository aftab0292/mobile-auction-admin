import React, { Component } from 'react';
import * as PropTypes from "prop-types";

class LoadScript extends Component {
    componentDidMount() {
        setTimeout(()=>{
            this.props.scripts.map(script => {
                if (!!document.querySelector('script[src="' + script + '"]')) {
                    document.querySelector('script[src="' + script + '"]').remove();
                }
                const scriptTag = document.createElement('script');
                scriptTag.type = 'text/javascript';
                scriptTag.src = script;
                document.head.appendChild(scriptTag);
                scriptTag.onload = function() {};
            })
        }, 100)
    }

    render() {
        return(
            null
        )
    }
}

LoadScript.propTypes = {
    scripts: PropTypes.array.isRequired
};

LoadScript.defaultProps = {
    scripts: []
};

export default LoadScript;