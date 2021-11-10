import React from 'react';
import {imagesPath} from '~constants';

export default React.memo(({src, alt = '', ...props}) => <img src={`${imagesPath}${src}`} alt={alt} {...props} />)