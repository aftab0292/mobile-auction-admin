import React from 'react';
import './LoaderStyle1Component.scss';

const Loader = React.memo(({ ...props }) => (
  <div className="lds-ring" {...props}>
    <div />
    <div />
    <div />
    <div />
  </div>
));

export default Loader;
