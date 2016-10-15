import React, { Component } from 'react';

import MusicStore from '../stores/MusicStore'
import MusicActions from '../actions/MusicActions'
import { List, ListItem, Avatar } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class ResultsList extends Component {
  constructor(){
    super();

    this.state = {
      results: MusicStore.getAllSearchResults(),
      type: MusicStore.getResultsType(),
      open: false
    };
    this._onChange = this._onChange.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  playPreview() {
    console.log('play');
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const {results, type} = this.state;
    console.log('results, type:', results, type);
    let Results = [];
    if (results) {
      Results = results.map((r, i) => {
        switch(type) {
          case 'track':
            return (
              <ListItem
              key={i}
              primaryText={r.name}
              secondaryText={r.artists[0].name}
              leftAvatar={ <Avatar src={r.album.images[1].url}
                onTouchTap={this.handleOpen}
              />}
              rightIcon={<AvPlayArrow onClick={this.playPreview}/>}
              />
            );
            break;

        }
      })
    }
    return (
      <div>
        <List>
          {Results}
        </List>
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={results ? results[0].album.images[1].url : ''}/>
        </Dialog>
      </div>
    )
  }
}
