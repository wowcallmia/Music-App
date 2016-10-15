import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

require('./stores/TranslatedStore');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './components/App';
import UploadPage from './components/UploadPage';
import SplashPage from './components/SplashPage';


render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SplashPage} />
          <Route path='/upload' component={UploadPage} />
        </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)
