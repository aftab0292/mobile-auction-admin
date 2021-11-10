import {
    UPDATE_LANGUAGE,
} from "./types";

export const updateLanguage = (language) => ({
    type: UPDATE_LANGUAGE,
    payload: {
        language
    }
});