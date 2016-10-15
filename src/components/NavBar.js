import React, { Component } from 'react';
import { AppBar, Tabs, Tab } from 'material-ui';

import RouteActions from '../actions/RouteActions';

class NavBar extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props);
    return (
      <AppBar
        title="Title"
        className="AppBar"
        showMenuIconButton={false}
      >
        <Tabs>
          <Tab className="Tab" label="Home" onClick={RouteActions.route.bind(null, '/')} />
        </Tabs>
      </AppBar>
    );
  }
}

export default NavBar;
