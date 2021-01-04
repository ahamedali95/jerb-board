import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { JobListingsPage } from './pages/JobListingsPage'

const routes = {
  home: '/',
}

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.home}>
        <JobListingsPage />
      </Route>
    </Switch>
  </BrowserRouter>
)
