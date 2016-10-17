import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class YoutubeVideo extends Component {
  constructor() {
    super();
  }



  _onReady(event) {
    event.target.pauseVideo();
  }

  render() {
    const opts = {
      height: '234',
      width: '390',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }
}
