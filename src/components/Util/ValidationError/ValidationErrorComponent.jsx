import React, {memo} from 'react';

export default memo(({fieldName, message, ...props}) => <div className={`text-danger font-weight-bold ${fieldName}`} {...props}>{message ? message.toLowerCase() : ''}</div>);