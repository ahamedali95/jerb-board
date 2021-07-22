import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import JobPostingsPage from './pages/JobPostingsPage'

const routes = {
  home: '/',
}

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.home}>
        <JobPostingsPage />
      </Route>
    </Switch>
  </BrowserRouter>
)
