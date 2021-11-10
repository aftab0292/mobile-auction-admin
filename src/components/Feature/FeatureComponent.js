import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Loader from '~components/Util/Loader';
const ListComponent = React.lazy(() => import('./List'));
const AddComponent = React.lazy(() => import('./Add'));
const EditComponent = React.lazy(() => import('./Edit'));
const UsersListComponent = React.lazy(() => import('./UserList'));

const Feature = ({ match }) => (
    <React.Fragment>
        <Suspense fallback={<Loader />}>
            <Route path={match.path} exact component={ListComponent} />
            <Route path={`${match.path}/add`} exact component={AddComponent} />
            <Route path={`${match.path}/edit/:id`} component={EditComponent} />
            <Route path={`${match.path}/users`} exact component={UsersListComponent} />
        </Suspense>
    </React.Fragment>
);

export default Feature;
