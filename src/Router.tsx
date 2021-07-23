import React, {ComponentType, lazy, LazyExoticComponent, Suspense} from 'react';
import { BrowserRouter, Route as BrowserRoute, Switch } from 'react-router-dom';

// React framework level optimization using lazy-loading. Refer to my blog here: https://ahamedblogs.wordpress.com/2020/04/24/react-framework-level-optimization-using-lazy-loading-and-suspense/
const JobPostingsPage = lazy(() => import('./pages/JobPostingsPage'));
const JobDetailsViewPage = lazy(() => import('./pages/JobDetailsViewPage'));
const JobDetailsEntryPage = lazy(() => import('./pages/JobDetailsEntryPage'));

type Route = {
    path: string;
    Component: LazyExoticComponent<ComponentType<any>>;
};

const routes: Route[] = [
    { path: '/', Component: JobPostingsPage },
    { path: '/job_postings/new', Component: JobDetailsEntryPage },
    { path: '/job_postings/:id', Component: JobDetailsViewPage }
];

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
        {
            routes.map((route: Route, index: number): JSX.Element => {
                return (
                    <BrowserRoute
                        key={route.path + index}
                        exact
                        path={route.path}
                    >
                        <Suspense fallback={<div>component loading</div>}>
                            <route.Component />
                        </Suspense>
                    </BrowserRoute>
                );
            })
        }
    </Switch>
  </BrowserRouter>
);
