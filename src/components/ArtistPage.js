import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


export default class ArtistPage extends Component {
  constructor(){
    super();

    // this.state = {
    //   info: TrackStore.getTrack(),
    //   type: TrackStore.getTrackType(),
    //   features: TrackStore.getFeatures()
    // }

    // this._onChange = this._onChange.bind(this);
  }

  // componentWillMount() {
  //   let type = this.props.route.path.split('/')[1];
  //   MusicActions.searchSpecific(type, this.props.params.id);
  //   MusicActions.getTrackFeatures(this.props.params.id);
  //   TrackStore.startListening(this._onChange);
  // }
  //
  // componentWillUnmount() {
  //   TrackStore.stopListening(this._onChange);
  // }
  //
  // _onChange() {
  //   this.setState({
  //     info: TrackStore.getTrack(),
  //     type: TrackStore.getTrackType(),
  //     features: TrackStore.getFeatures()
  //   });
  // }

  render() {
    return (
      <div>
        <h1>ARTIST</h1>
      </div>
    )
  }
}
