import { SIGN_IN, SIGN_OUT, FORGOT_PASSWORD, UPDATE_PROFILE } from '~actions/auth/types';

const INITIAL_STATE = {
    isLoggedIn: false,
    token: null,
    user: null,    
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
        case FORGOT_PASSWORD:
            return {
                ...state,
                ...action.payload,
            };
        case SIGN_OUT:
            return INITIAL_STATE;
        case UPDATE_PROFILE: {
            let user = state.user;
            user && (user = { ...user, ...action.payload.data });
            return {
                ...state,
                user,
            };
        }       
        default:
            return state;
    }
};

export default authReducer;
