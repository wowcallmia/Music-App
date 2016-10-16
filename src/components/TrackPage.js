import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

import MusicActions from '../actions/MusicActions';
import TrackStore from '../stores/TrackStore';
import ResultsList from './ResultsList';
import YoutubeVideo from './YoutubeVideo';

export default class TrackPage extends Component {
  constructor(props){
    super(props);

console.log('Trackststtee', TrackStore.getTrack())
    this.state = {
      track: undefined
      // type: undefined
      // features: undefined,
      // videoId: undefined
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    console.log('this.props: ', this.props)
    let type = this.props.route.path.split('/')[1];
    MusicActions.searchSpecific(type, this.props.params.id);
    MusicActions.getTrackFeatures(this.props.params.id);
    TrackStore.startListening(this._onChange);
    // console.log('11111this.state:', this.state);
     //window.setTimeout(
    //   function() {
  //    }, 5000);
  }

  componentWillUnmount() {
    TrackStore.stopListening(this._onChange);
    MusicActions.clearStore();
    console.log('UNMOUNTED');

  }

  componentDidUpdate () {
    let {track, videoId} = this.state;

    if (track !== undefined && videoId === undefined) {
      MusicActions.getVideoId(`${track.name ? track.name : ""} ${track.artists[0].name}`)
    }
  }

  _onChange() {
    this.setState({
      track: TrackStore.getTrack(),
      type: TrackStore.getTrackType(),
      features: TrackStore.getFeatures(),
       videoId: TrackStore.getVideoId()


    });
    console.log('videoId ALFJF', this.state.videoId);
  }
  render() {
    console.log('33333this.state:', this.state);
    let { track, type, features, videoId } = this.state;
    if (track) {
      return (
        <div className='container'>
          <h1>{track.name} ({track.artists[0].name})</h1>


          {videoId ? <YoutubeVideo videoId={videoId.items[0].id.videoId}/> : null}

          {/* <div className="progress">
            <div className="progress-bar progress-bar-info" style={{width: '50%'}}></div>
        </div> */}
        </div>
      );
    } else {
      return (
        <div className='container'>
          <CircularProgress className='text-center' size={80} thickness={5} />
        </div>
      );
    }
  }
}
