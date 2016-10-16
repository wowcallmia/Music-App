import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import MusicActions from '../actions/MusicActions';
import TrackStore from '../stores/TrackStore';
import ResultsList from './ResultsList';

export default class TrackPage extends Component {
  constructor(){
    super();

    this.state = {
      info: TrackStore.getTrack(),
      type: TrackStore.getTrackType(),
      features: TrackStore.getFeatures()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    let type = this.props.route.path.split('/')[1];
    MusicActions.searchSpecific(type, this.props.params.id);
    MusicActions.getTrackFeatures(this.props.params.id);
    TrackStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    TrackStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      info: TrackStore.getTrack(),
      type: TrackStore.getTrackType(),
      features: TrackStore.getFeatures()
    });
  }

  render() {
    console.log('this.state:', this.state);
    return (
      <div>
        {/* <div className="progress">
          <div className="progress-bar progress-bar-info" style={{width: '50%'}}></div>
        </div> */}
      </div>
    )
  }
}
