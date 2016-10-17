import React, { Component } from 'react';
import { AppBar, Tabs, Tab } from 'material-ui';

import RouteActions from '../actions/RouteActions';

class NavBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <AppBar
        title="MusicMusic"
        className="AppBar"
        showMenuIconButton={false}
      >
        <Tabs>
          <Tab className="Tab" label="Home" onClick={RouteActions.route.bind(null, '/')} />
          <Tab className="Tab" label="Search" onClick={RouteActions.route.bind(null, '/search')} />
        </Tabs>
      </AppBar>
    );
  }
}

export default NavBar;
