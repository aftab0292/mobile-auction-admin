import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from "./store";
import Loader from "./components/Util/Loader";

const initialComponent = (
    <Provider store={store}>
        <PersistGate loading={<Loader/>} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
);

ReactDOM.render(initialComponent, document.getElementById('root'));
