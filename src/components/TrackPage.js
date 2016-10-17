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

    if (track && videoId === undefined) {
      MusicActions.getVideoId(`${track.name ? track.name : ""} ${track.artists[0].name}`)
      MusicActions.getGeniusInfo(`${track.name ? track.name : ""} ${track.artists[0].name}`);
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
          <div className="col-xs-5 col-md-2 progressLabels">
            <h4 className='progressLabel'>Popularity</h4>
            <h4 className='progressLabel'>Danceability</h4>
            <h4 className='progressLabel'>Energy</h4>
            <h4 className='progressLabel'>Happiness</h4>
            <h4 className='progressLabel'>Speechiness</h4>
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
              <div className="progress-bar progress-bar-info" style={this.style(features?features.energy:0)}>
                {features?`${Math.floor(features.energy*100)}%`:''}
              </div>
            </div>
            <div className="progress">
              <div className="progress-bar progress-bar-warning" style={this.style(features?features.valence:0)}>
                {features?`${Math.floor(features.valence*100)}%`:''}
              </div>
            </div>
            <div className="progress">
              <div className="progress-bar progress-bar-success" style={this.style(features?features.speechiness:0)}>
                {features?`${Math.floor(features.speechiness*100)}%`:''}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-4">
            <table className="table">
              <thead>
                <tr className='text-center'>
                  <th>More Info</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tempo</td>
                  <td>{features?features.tempo:''}</td>
                </tr>
                <tr>
                  <td>Mode</td>
                  <td>{features?(features.mode?'Major':'Minor'):''}</td>
                </tr>
                <tr>
                  <td>Acoustic</td>
                  <td>{features?(+features.acousticness>=.6?'True':'False'):''}</td>
                </tr>
                <tr>
                  <td>Instrumental</td>
                  <td>{features?(+features.instrumentalness>=.5?'True':'False'):''}</td>
                </tr>
                <tr>
                  <td>Live</td>
                  <td>{features?(+features.liveness>=.8?'True':'False'):''}</td>
                </tr>
              </tbody>
            </table>
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
