import reducers from '../reducers';
import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore} from "redux";

import {persistReducer, persistStore} from 'redux-persist'
import localForage from 'localforage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: localForage,
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)),
);
export const persistor = persistStore(store);
