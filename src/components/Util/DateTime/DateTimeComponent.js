import React from 'react';

const utcDate = (date) => new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
));

const monthMap = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
};

const DateTime = ({date, format = 'DD.MM.YYYY HH:mm:ss', utc = true}) => {
    if (!date) return null;

    const dateObject = new Date(date);
    const dateUtc = utcDate(dateObject);

    const year = dateUtc.getUTCFullYear().toString();
    const month = (dateUtc.getUTCMonth()+1).toString().padStart(2, '0');
    const day = dateUtc.getUTCDate().toString().padStart(2, '0');
    const hours = dateUtc.getUTCHours().toString().padStart(2, '0');
    const minutes = dateUtc.getUTCMinutes().toString().padStart(2, '0');
    const seconds = dateUtc.getUTCSeconds().toString().padStart(2, '0');
    const monthNameFull = monthMap[month];
    const monthNameShort = monthNameFull.substring(0,3);

    return format
        .replace('YYYY', year)
        .replace('MMM', monthNameShort)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
};

export default React.memo(DateTime);
