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

  playPreview() {
    console.log('play');
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
    console.log('this.state.selectedIcon:', this.state.selectedIcon)
    const {results, type} = this.state;

    const customContentStyle = {
      width: '300px',
    };

    let Results = [];
    if (results) {
      Results = results.map((r, i) => {
        switch(type) {
          case 'track':
            return (
              <div key={i}>
                <ListItem
                  key={i}
                  primaryText={r.name}
                  secondaryText={r.artists[0].name}
                  leftAvatar={ <Avatar src={r.album.images[1].url}
                    onTouchTap={this.handleOpen}
                    onMouseOver={this.updateSelectedIcon.bind(null, r.album.images[1].url)}
                  />}
                  rightIcon={<AvPlayArrow onClick={this.playPreview}/>}
                />
              </div>
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
          contentStyle={customContentStyle}
        >
          <img src={this.state.selectedIcon} className='modalImg'/>
        </Dialog>
      </div>
    )
  }
}
