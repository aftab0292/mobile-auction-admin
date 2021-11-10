import React, {Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Loader from '~components/Util/Loader';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as PropTypes from 'prop-types';

const LayoutComponent = React.lazy(() => import('~components/Layout'));
const AuthComponent = React.lazy(() => import('~components/Auth'));
const DashboardComponent = React.lazy(() => import('~components/Dashboard'));
const UserComponent = React.lazy(() => import('~components/User'));
const CategoryComponent = React.lazy(() => import('~components/Category'));
const FeatureComponent = React.lazy(() => import('~components/Feature'));
const ChangePasswordComponent = React.lazy(() => import('~components/Auth/ChangePassword'));
const Profile = React.lazy(() => import('~components/Auth/Profile'));
const Setting = React.lazy(() => import('~components/Auth/Setting'));
const Auction = React.lazy(() => import('~components/Auction'));

const LoggedOutRoutes = () => (
    <Switch>
        <Route path='/auth' component={AuthComponent}/>
        <Redirect to='/auth/log-in'/>
    </Switch>
);

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path='/' component={DashboardComponent}/>
        <Route path='/users' component={UserComponent}/>
        <Route path='/categories' component={CategoryComponent}/>
        <Route path='/features' component={FeatureComponent}/>
        <Route path='/change-password' component={ChangePasswordComponent}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/setting' component={Setting}/>
        <Route path='/auction' component={Auction}/>
        <Redirect to='/'/>
    </Switch>
);

const AutoSizeLoader = () => (
    <div style={{height: '100vh', width: '100vw'}}>
        <Loader/>
    </div>
);

const App = ({isLoggedIn}) => (
    <Router>
        <div id='wrapper'>
            <Suspense fallback={<AutoSizeLoader/>}>
                {!isLoggedIn && <LoggedOutRoutes/>}
                {isLoggedIn && (
                    <LayoutComponent>
                        <LoggedInRoutes/>
                    </LayoutComponent>
                )}
            </Suspense>
            <ToastContainer transition={Flip}/>
        </div>
    </Router>
);

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default App;
