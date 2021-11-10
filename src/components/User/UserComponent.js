import React, {Suspense} from 'react';
import {Route} from 'react-router-dom';
import Loader from "~components/Util/Loader";

const ListComponent = React.lazy(() => import('./List'));
const ViewComponent = React.lazy(() => import('./View'));

const User = ({match}) => (
    <React.Fragment>
        <Suspense fallback={<Loader/>}>
            <Route path={match.path} exact component={ListComponent}/>
            <Route path={`${match.path}/:id`} component={ViewComponent}/>
        </Suspense>
    </React.Fragment>
);

export default User;
