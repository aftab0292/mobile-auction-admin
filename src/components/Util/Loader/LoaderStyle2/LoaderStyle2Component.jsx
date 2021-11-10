import React from 'react';
import './LoaderStyle2Component.scss';

const Loader = React.memo(({ style = {}, size = 4 }) => (
  <div className="loader" style={{ ...style, fontSize: `${size}px` }} />
));

export default Loader;
