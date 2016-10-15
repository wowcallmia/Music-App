import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import MusicActions from '../actions/MusicActions';
import MusicStore from '../stores/MusicStore';
import ResultsList from './ResultsList';

export default class TrackPage extends Component {
  constructor(){
    super();

    this.state = {
      info: MusicStore.getSpecific()
    }

    this._onChange = this._onChange.bind(this);

  }

  componentWillMount() {
    let type = this.props.route.path.split('/')[1];
    MusicActions.searchSpecific(type, this.props.params.id);
    MusicStore.startListening(this._onChange);
  }
  componentWillUnmount() {
    MusicStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ info: MusicStore.getSpecific() });
  }

  render() {
    console.log('this.state:', this.state)
    return (
      <div>HeLLO</div>
    )
  }
}
