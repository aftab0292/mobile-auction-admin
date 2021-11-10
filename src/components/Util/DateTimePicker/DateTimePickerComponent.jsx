import React from 'react';
import Datetime, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import en_us from "date-fns/locale/en-US";
import * as PropTypes from 'prop-types';

registerLocale("en-US", en_us);

const DateTimePicker = ({input: {value, onChange, onCalendarOpen, onCalendarClose}, showYearDropdown, scrollableYearDropdown, yearDropdownItemNumber, showMonthDropdown, scrollableMonthDropdown, useShortMonthInDropdown, dropdownMode, showTimeSelect, showTimeSelectOnly, showMonthYearPicker, timeCaption, dateFormat, timeFormat, timeIntervals, dateFormatCalendar, minDate, maxDate, minTime, maxTime, locale, withPortal, inline, fixedHeight, placeholder, autoComplete, shouldCloseOnSelect, autoFocus, isClearable, clearButtonTitle, language, ...props}) => {
    showTimeSelect = showTimeSelect ? showTimeSelect : !!showTimeSelectOnly;
    timeCaption = timeCaption ? timeCaption : 'Time';
    dateFormat = dateFormat ? dateFormat : showTimeSelectOnly ? 'HH:mm' : showMonthYearPicker ? 'yyyy-MM' : showTimeSelect ? 'yyyy-MM-dd HH:mm aa' : 'yyyy-MM-dd';
    locale = locale ? locale : 'en-US';
    clearButtonTitle = clearButtonTitle ? clearButtonTitle : 'Clear';
    return (
        <Datetime
            value={!value ? undefined : new Date(value)}
            selected={!value ? undefined : new Date(value)}
            openToDate={!value ? minDate : new Date(value)}
            onChange={(date, targetName) => onChange(date, targetName)}
            onCalendarOpen={onCalendarOpen}
            onCalendarClose={onCalendarClose}
            showYearDropdown={showYearDropdown}
            scrollableYearDropdown={scrollableYearDropdown}
            yearDropdownItemNumber={yearDropdownItemNumber}
            showMonthDropdown={showMonthDropdown}
            scrollableMonthDropdown={scrollableMonthDropdown}
            useShortMonthInDropdown={useShortMonthInDropdown}
            dropdownMode={dropdownMode}
            showTimeSelect={showTimeSelect}
            showTimeSelectOnly={showTimeSelectOnly}
            showMonthYearPicker={showMonthYearPicker}
            timeCaption={timeCaption}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            dateFormatCalendar={dateFormatCalendar}
            minDate={minDate}
            maxDate={maxDate}
            minTime={minTime}
            maxTime={maxTime}
            locale={locale}
            withPortal={withPortal}
            inline={inline}
            fixedHeight={fixedHeight}
            placeholderText={placeholder}
            autoComplete={autoComplete}
            shouldCloseOnSelect={shouldCloseOnSelect}
            autoFocus={autoFocus}
            isClearable={isClearable}
            clearButtonTitle={clearButtonTitle}
            {...props}
        />
    );
};

DateTimePicker.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.string
        ]).isRequired,
        onChange: PropTypes.func.isRequired,
        onCalendarOpen: PropTypes.func,
        onCalendarClose: PropTypes.func,
    }),
    showYearDropdown: PropTypes.bool.isRequired,
    scrollableYearDropdown: PropTypes.bool.isRequired,
    yearDropdownItemNumber: PropTypes.number.isRequired,
    showMonthDropdown: PropTypes.bool.isRequired,
    scrollableMonthDropdown: PropTypes.bool.isRequired,
    useShortMonthInDropdown: PropTypes.bool.isRequired,
    dropdownMode: PropTypes.oneOf(['scroll', 'select']),
    showTimeSelect: PropTypes.bool,
    showTimeSelectOnly: PropTypes.bool.isRequired,
    showMonthYearPicker: PropTypes.bool.isRequired,
    timeCaption: PropTypes.string,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string.isRequired,
    timeIntervals: PropTypes.number.isRequired,
    dateFormatCalendar: PropTypes.string.isRequired,
    minDate: PropTypes.instanceOf(Date).isRequired,
    maxDate: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.oneOf([null])
    ]),
    minTime: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.oneOf([null])
    ]),
    maxTime: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.oneOf([null])
    ]),
    locale: PropTypes.string,
    withPortal: PropTypes.bool.isRequired,
    inline: PropTypes.bool.isRequired,
    fixedHeight: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    autoComplete: PropTypes.string.isRequired,
    shouldCloseOnSelect: PropTypes.bool.isRequired,
    autoFocus: PropTypes.bool.isRequired,
    isClearable: PropTypes.bool.isRequired,
    clearButtonTitle: PropTypes.string,
    language: PropTypes.string.isRequired,
};

DateTimePicker.defaultProps = {
    showYearDropdown: true,
    scrollableYearDropdown: true,
    yearDropdownItemNumber: 8,
    showMonthDropdown: true,
    scrollableMonthDropdown: true,
    useShortMonthInDropdown: true,
    dropdownMode: 'scroll',
    showTimeSelectOnly: false,
    showMonthYearPicker: false,
    timeFormat: 'HH:mm',
    timeIntervals: 30,
    dateFormatCalendar: 'LLLL yyyy',
    minDate: new Date(),
    maxDate: null,
    minTime: null,
    maxTime: null,
    withPortal: false,
    inline: false,
    fixedHeight: false,
    placeholder: '',
    autoComplete: 'off',
    shouldCloseOnSelect: true,
    autoFocus: false,
    isClearable: true,
    language: 'en'
};

export default DateTimePicker;