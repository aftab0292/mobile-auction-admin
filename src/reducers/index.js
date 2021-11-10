import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import settingsReducer from './settingsReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import categoriesReducer from './categoriesReducer';
import featuresReducer from './featuresReducer';
import auctionReducer from './auctionReducer';

export default combineReducers({
    form: formReducer,
    settings: settingsReducer,
    auth: authReducer,
    users: usersReducer,
    categories: categoriesReducer,
    features: featuresReducer,
    auctions: auctionReducer,
});
