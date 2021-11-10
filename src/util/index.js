import 'joi-i18n';
import Joi from 'joi';
import moment from "moment";
import {store} from '../store';
import {languages} from '~i18n';

Object.keys(languages).forEach(language => Joi.addLocaleData(language, languages[language].validation));

export const validate = (schema, data, options = {}, abortEarly = false) => {
    const {getState} = store;
    const {
        settings: {
            language
        }
    } = getState();
    const {error} = schema.validate(data, {
        locale: languages[language] ? language : 'en',
        abortEarly,
        ...options,
    });

    if (!error) {
        return null;
    }

    let errors = {};
    error.details.forEach(error => {
        errors = {
            ...errors,
            ...error.message
        };
    });
    return errors;
};

export const validationPatterns = {
    objectId: /^[0-9a-fA-F]{24}$/,
    password: /^(?=.*?[A-Z])(?=(.*[a-z])+)(?=(.*[\d])+)(?=(.*[\W])+)(?!.*\s).{8,}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    number: /^[\d]+$/,
    contactNumber: /^\+?[\d]{4,15}$/,
    timeIn24Hours: /^([01]\d|2[0-3]):([0-5]\d)$/,
    otp: /^[\d]+$/,
};

export const commonValidationRules = {
    password: Joi.string()
        .max(72)
        .regex(validationPatterns.password, 'passwordPattern')
        .required()
        .error(([error]) => {
            const {locale} = error.options;
            const language = languages[locale];
            let message = '';
            switch (error.type) {
                case 'any.required':
                case 'any.empty':
                    message = language.validation.any.required(error);
                    break;
                case 'string.regex.name':
                    message = language.validation.string.regex.name(error);
                    break;
                case 'string.max':
                    message = language.validation.string.max(error);
                    break;
            }
            return {message};
        }),
    email: Joi.string()
        .trim()
        .lowercase()
        .regex(validationPatterns.email, 'emailPattern')
        .required(),
    timeIn24Hours: Joi.string()
        .trim()
        .regex(validationPatterns.timeIn24Hours, 'timeIn24Hours')
        .optional(),
    otp: Joi.string()
        .length(4, 'utf8')
        .regex(validationPatterns.otp, 'otpPattern')
};

export const useStore = fn => {
    // eslint-disable-next-line no-param-reassign
    fn.store = store;
    return fn;
};

export const escapeRegex = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

export const excerpt = (text, length, terminator = '...') =>
    text.length < length ? text : text.substring(0, length).trim() + terminator;

export const utcDate = (date = new Date()) => {
    date = new Date(date);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
};

export const utcDateTime = (date = new Date()) => {
    date = new Date(date);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
};

export const formatCurrency = (amount) => {
    const locale = 'ja-jp';
    const options = {style: 'currency', currency: 'JPY'};
    return Intl.NumberFormat(locale, options).format(amount);
};

export const showDate = (date, format = 'MMM DD YYYY hh:mm A', toLocale = true) => {
    date = toLocale ? new Date(date).toLocaleString() : date;
    return utcDate(date).toString() !== 'Invalid Date' ? moment.utc(date).format(format) : 'N/A'
  };