import { UPDATE_LANGUAGE} from '~actions/settings/types';
import {SETTING } from '~actions/auth/types';

const INITIAL_STATE = {
    language: 'en',
    adminSetting: {},
};

const settingsReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_LANGUAGE:
            return {
                ...state,
                language: payload.language,
            };
        case SETTING:
            return {
                ...state,
                adminSetting: action.payload.setting,
            };
        default:
            return state;
    }
};

export default settingsReducer;
