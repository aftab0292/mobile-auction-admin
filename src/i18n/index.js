import { store } from '../store';
import { locale as en } from './locales/en';

export const languages = {
    en,
};

export const __ = function(key, ...params) {
    const {getState} = store;
    const {
        settings: {
            language
        }
    } = getState();
    const l10n = languages[language] || languages['en'];
    let message = l10n[key] || key;
    let position = 0;
    params.forEach(param => {
        message = message.replace(new RegExp('\\{' + position + '}'), param);
        position++;
    });
    return message;
};
