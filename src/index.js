import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

require('./stores/MusicStore');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './components/App';
import SplashPage from './components/SplashPage';
import SearchPage from './components/SearchPage';
import TrackPage from './components/TrackPage';


render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SplashPage} />
          <Route path='/search' component={SearchPage} />
          <Route path='/track/:id' component={TrackPage} />
        </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)
