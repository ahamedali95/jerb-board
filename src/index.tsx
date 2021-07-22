import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from '@material-ui/core';
import theme from './layout/theme';
import store from './store';


ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Provider store={store}>
            <App />
          </Provider>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
