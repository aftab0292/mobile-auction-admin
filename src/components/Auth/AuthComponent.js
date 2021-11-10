import React, {Suspense} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Loader from "~components/Util/Loader";

const LogInComponent = React.lazy(() => import('./LogIn'));
const ForgotPasswordComponent = React.lazy(() => import('./ForgotPassword'));
const ResetPasswordComponent = React.lazy(() => import('./ResetPassword'));

const Auth = ({match, history}) => (
    <React.Fragment>
        <Suspense fallback={<Loader/>}>
            { match.path === history.location.pathname && <Redirect to={{ pathname: `${match.path}/log-in` }}/> }
            <Route path={match.path} exact component={LogInComponent}/>
            <Route path={`${match.path}/log-in`} component={LogInComponent}/>
            <Route path={`${match.path}/forgot-password`} component={ForgotPasswordComponent}/>
            <Route path={`${match.path}/reset-password`} component={ResetPasswordComponent}/>
        </Suspense>
    </React.Fragment>
);

export default Auth;
