import React from 'react';
import * as PropTypes from 'prop-types';
import LoaderStyle1 from './LoaderStyle1';
import LoaderStyle2 from './LoaderStyle2';
import './LoaderComponent.scss';

const Loader = React.memo(({ loaderStyle, ...loaderProps }) => {
  let LoaderComponent = LoaderStyle1;
  switch (loaderStyle) {
    case 1:
    default:
      LoaderComponent = LoaderStyle1;
      break;
    case 2:
      LoaderComponent = LoaderStyle2;
      break;
  }

  return (
    <div className="loader-parent">
      <LoaderComponent {...loaderProps} />
    </div>
  );
});

Loader.propTypes = {
  loaderStyle: PropTypes.number.isRequired
};

Loader.defaultProps = {
  loaderStyle: 1
};

export default Loader;
