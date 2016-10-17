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

    this.state = {
      track: undefined,
      type: undefined,
      features: undefined,
      videoId: undefined
    }
    this._onChange = this._onChange.bind(this);
    this.style = this.style.bind(this);
  }

  componentWillMount() {
    let type = this.props.route.path.split('/')[1];
    MusicActions.searchSpecific(type, this.props.params.id);
    MusicActions.getTrackFeatures(this.props.params.id);
    TrackStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    TrackStore.stopListening(this._onChange);
    MusicActions.clearStore();
  }

  componentDidUpdate () {
    let {track, videoId} = this.state;

    if (track !== undefined && videoId === undefined) {
      MusicActions.getVideoId(`${track.name ? track.name : ""} ${track.artists[0].name}`)
    }
  }

  style(num) {
    let style = { width: `${+num * 100}%` }
    return style;
  }

  _onChange() {
    this.setState({
      track: TrackStore.getTrack(),
      type: TrackStore.getTrackType(),
      features: TrackStore.getFeatures(),
       videoId: TrackStore.getVideoId()
    });
  }

  render() {
    let { track, type, features, videoId } = this.state;

    console.log('track:', track)

    if (track) {
      return (
        <div className='container'>
          <h1>{track.name} ({track.artists[0].name})</h1>
          <div className="col-xs-12 col-md-5">
            {videoId ? <YoutubeVideo videoId={videoId.items[0].id.videoId}/> : null}
          </div>
          <div className="col-xs-5 col-md-2 progressLabel">
            <h4>Popularity</h4>
            <br/>
            <h4>Danceability</h4>
            <br/>
            <h4>Energy</h4>
            <br/>
            <h4>Loudness</h4>
            <br/>
            <h4>Speechiness</h4>
          </div>
          <div className="col-xs-7 col-md-5 progressBars">
            <div className="progress">
              <div className="progress-bar progress-bar-warning" style={this.style(track?(+track.popularity/100):0)}>
                {track?`${track.popularity}%`:''}
              </div>
            </div>
            <div className="progress">
              <div className="progress-bar progress-bar-danger" style={this.style(features?features.danceability:0)}>
                {features?`${Math.floor(features.danceability*100)}%`:''}
              </div>
            </div>
            <div className="progress">
              <div className="progress-bar progress-bar-energy" style={this.style(features?features.energy:0)}>
                {features?`${Math.floor(features.energy*100)}%`:''}
              </div>
            </div>
            <div className="progress">
              <div className="progress-bar progress-bar-info" style={this.style(features?features.loudness:0)}>
                {features?`${Math.floor(features.loudness*100)}%`:''}
              </div>
            </div>
            <div className="progress">
              <div className="progress-bar progress-bar-success" style={this.style(features?features.speechiness:0)}>
                {features?`${Math.floor(features.speechiness*100)}%`:''}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='container text-center'>
          <CircularProgress className='text-center' size={80} thickness={5} />
        </div>
      );
    }
  }
}
