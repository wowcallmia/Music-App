import React, { Component } from 'react';

import MusicStore from '../stores/MusicStore';
import MusicActions from '../actions/MusicActions';
import RouteActions from '../actions/RouteActions';
import { List, ListItem, Avatar } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';
import $ from 'jquery';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class ResultsList extends Component {
  constructor(){
    super();

    this.state = {
      results: MusicStore.getAllSearchResults(),
      type: MusicStore.getResultsType(),
      open: false,
      selectedIcon: undefined
    };
    this._onChange = this._onChange.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateSelectedIcon = this.updateSelectedIcon.bind(this);
  }

  componentWillMount() {
    MusicStore.startListening(this._onChange);
  }
  componentWillUnmount(){
    MusicStore.stopListening(this._onChange);
  }
  _onChange(){
    this.setState({
      results: MusicStore.getAllSearchResults(),
      type: MusicStore.getResultsType()
    });
  }

  playPreview(e) {
    let audios = document.getElementById('MainList').getElementsByTagName('audio');
    if (audios.length) {
      for (let i = 0; i < audios.length; i++) {
        audios[i].pause();
      }
    }
    let audio = new Audio(e.target.parentNode.id);
    $('#audioRoot').append(audio);
    audio.play();
  }

  handleOpen(imgUrl) {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  updateSelectedIcon(imgUrl) {
    this.setState({ selectedIcon: imgUrl })
  }


  render() {
    const {results, type} = this.state;
    //console.log('results(resultslist73):', results);
    const customContentStyle = {
      width: '300px'
    };

    let Results = [];
    if (results) {
      let imgUrl;
      Results = results.map((r, i) => {
        switch(type) {
          case 'track':
            imgUrl = r.album.images.length>1?r.album.images[1].url:r.album.images.url;
            return (
              <div key={r.id}>
                <ListItem
                  primaryText={<p onClick={RouteActions.route.bind(null, `/track/${r.id}`)}>{r.name}</p>}
                  secondaryText={<p onClick={RouteActions.route.bind(null, `/artist/${r.artists[0].id}`)}>{r.artists[0].name}</p>}
                  leftAvatar={ <Avatar src={imgUrl}
                    onTouchTap={this.handleOpen}
                    onMouseOver={this.updateSelectedIcon.bind(null, imgUrl)}
                  />}
                  rightIcon={<AvPlayArrow onClick={this.playPreview} id={r.preview_url}/>}
                />
                <div id="audioRoot"></div>
              </div>
            );
            break;
          case 'artist':
            imgUrl = r.images.length>1 ? r.images[1].url : r.images.url;
            return (
              <div key={r.id}>
                <ListItem
                  primaryText={<p onClick={RouteActions.route.bind(null, `/artist/${r.id}`)}>{r.name}</p>}
                  secondaryText={r.genres[0]}
                  leftAvatar={ <Avatar src={imgUrl}
                    onTouchTap={this.handleOpen}
                    onMouseOver={this.updateSelectedIcon.bind(null, imgUrl)}
                  />}
                />
              </div>
            );
            break;
        }
      })
    }
    return (
      <div>
        <List id='MainList'>
          {Results}
        </List>
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
        >
          <img src={this.state.selectedIcon} className='modalImg'/>
        </Dialog>
      </div>
    )
  }
}
