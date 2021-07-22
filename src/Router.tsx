import React, {ComponentType, lazy, LazyExoticComponent, Suspense} from 'react';
import { BrowserRouter, Route as BrowserRoute, Switch } from 'react-router-dom';
const JobPostingsPage = lazy(() => import('./pages/JobPostingsPage'));
const JobDetailsPage = lazy(() => import('./pages/JobDetailsPage'));

type Route = {
    path: string;
    Component: LazyExoticComponent<ComponentType<any>>;
};

const routes: Route[] = [
    { path: '/', Component: JobPostingsPage },
    { path: '/jobPostings/:id', Component: JobDetailsPage }
];

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
        {
            routes.map((route: Route, index: number) => {
                return (
                    <BrowserRoute
                        key={route.path + index}
                        exact
                        path={route.path}
                    >
                        <Suspense fallback={<div>Loading...</div>}>
                            <route.Component />
                        </Suspense>
                    </BrowserRoute>
                );
            })
        }
    </Switch>
  </BrowserRouter>
);
