import React, {Suspense} from 'react';
import {Route} from 'react-router-dom';
import Loader from "~components/Util/Loader";

const ListComponent = React.lazy(() => import('./List'));
const AddComponent = React.lazy(() => import('./Add'));
const EditComponent = React.lazy(() => import('./Edit'));

const Category = ({match}) => (
    <React.Fragment>
        <Suspense fallback={<Loader/>}>
            <Route path={match.path} exact component={ListComponent}/>
            <Route path={`${match.path}/add-category`} exact component={AddComponent}/>
            <Route path={`${match.path}/add-sub-category/:id`} exact component={AddComponent}/>
            <Route path={`${match.path}/sub-categories/:id`} component={ListComponent}/>
            <Route path={`${match.path}/edit/:id`} component={EditComponent}/>
        </Suspense>
    </React.Fragment>
);

export default Category;
