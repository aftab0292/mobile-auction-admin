import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Loader from '~components/Util/Loader';
const LiveListComponent = React.lazy(() => import('./LiveList'));
const UpcomingListComponent = React.lazy(() => import('./UpcomingList'));
const LiveView = React.lazy(() => import('./LiveView'));
const UpcomingView = React.lazy(() => import('./UpcomingView'));
const Auction = ({ match }) => (
    <React.Fragment>
        <Suspense fallback={<Loader />}>
            <Route path={`${match.path}/live`} exact component={LiveListComponent} />
            <Route path={`${match.path}/live/:id`} component={LiveView} />
            <Route path={`${match.path}/upcoming`} exact component={UpcomingListComponent} />
            <Route path={`${match.path}/upcoming/:id`} component={UpcomingView} />
        </Suspense>
    </React.Fragment>
);

export default Auction;
