import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem, Avatar} from 'material-ui';


import MusicActions from '../actions/MusicActions';
import TrackStore from '../stores/TrackStore';
import ResultsList from './ResultsList';


export default class ArtistPage extends Component {
  constructor(props){
    super(props);

     this.state = {
       info: TrackStore.getTrack(),
        type: TrackStore.getTrackType(),
        albums: TrackStore.getAlbums(),
         albumTracks: []
    //   features: TrackStore.getFeatures()
     }

     this._onChange = this._onChange.bind(this);
  }

   componentWillMount() {
     let type = this.props.route.path.split('/')[1];
    MusicActions.searchSpecific(type, this.props.params.id);
  //   MusicActions.getTrackFeatures(this.props.params.id);
     TrackStore.startListening(this._onChange);
     MusicActions.getAlbums(this.props.params.id);
      // MusicActions.getAlbumTracks(this.albums.items[0].id)
   }
  //
   componentWillUnmount() {
     TrackStore.stopListening(this._onChange);
   }
   componentDidUpdate () {
     let {albums, albumTracks } = this.state;
     if (albums !== undefined && albumTracks === undefined) {
       albums.items.map((current, i) => {
         MusicActions.getAlbumTracks(`${current.id ? current.id : ""}`)
       })
     }
   }

_onChange() {
     this.setState({
       info: TrackStore.getTrack(),
       type: TrackStore.getTrackType(),
       albums: TrackStore.getAlbums(),
        albumTracks: TrackStore.getAlbumTracks()

  //     features: TrackStore.getFeatures()
     });
   }

  render() {
    console.log('33333this.state:', this.state);
    const { info, type, albums } = this.state;
    const styles = {
      customWidth: {
        width: 200,
      },
    };
// let x = function(_onClick) {
//   let {albums, albumTracks} = this.state;
//
//   if (albums !== undefined && albumTracks === undefined) {
//     albums.items.map((current, i) => {
//     MusicActions.getAlbumTracks(`${current.id ? current.id : ""}`)
//     })
//   }
// }


  let Albums = [];
  let AlbumTracks = [];
  if (albums){
          Albums =albums.items.map((r, i) => {
            return (
              <div key = {r.id}>
                <ListItem
                  primaryText={<p>{r.name}</p>}
                  leftAvatar={<Avatar src={r.images[0].url}/>}
                  id = {r.id}
                >
                  <DropDownMenu

                    value= "Tracks"
                    // onChange={this.handleChange}
                    style={styles.customWidth}
                    autoWidth={false}
                  >
                    {

                      AlbumTracks = this.state.albumTracks.items.map((cur, i) => {

                        return (
                          <MenuItem



                              value= {cur.track_number} primaryText={cur.name} />
                          );

                        })

                      }
                      </DropDownMenu>
                      </ListItem>
                      <div id='theroot'></div>
                      </div>
                      );
                    })
                    }
                    return (
                    <div className=".col-mid-8">
                      <h1>{info.name}</h1>
                      <div   className=".col-md-8">
                        <List id='MainList'>
                          {Albums}
                        </List>
                      </div>
                    </div>

                    );

                    }
                    }
