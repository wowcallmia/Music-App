import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import MusicActions from '../actions/MusicActions';
import ResultsList from './ResultsList';

export default class SearchPage extends Component {
  constructor(){
    super();

    this.state = {
      searchType: 'track',
      search: ''

    }

    this.submitSearch = this.submitSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateSearchType = this.updateSearchType.bind(this);
  }

  submitSearch() {
    // make api call to spotify
    let { search, searchType } = this.state;
    MusicActions.searchMusic(search, searchType);
  }

  updateSearchType() {
    // let { search } = this.refs;
    this.setState({ search: this.refs.search.value });
  }

  handleChange(event, index, searchType){
    this.setState({searchType});
  }

  render() {
    const styles = {
      customWidth: {
        width: 200,
      },
    };

    return (
      <div className='container'>
      <DropDownMenu
        value={this.state.searchType}
        onChange={this.handleChange}
        style={styles.customWidth}
        autoWidth={false}
      >
        <MenuItem value='track' primaryText="Songs" />
        <MenuItem value='artist' primaryText="Artist" />
        <MenuItem value='album' primaryText="Albums" />
        <MenuItem value='playlist' primaryText="Playlists" />
      </DropDownMenu>
        <span>
          {/* <TextField
            hintText=""
            floatingLabelText="Search"
            ref="search"
            value={this.state.search}
            onChange={this.updateSearchType}
          /> */}

          <input
            type="text"
            ref="search"
            value={this.state.search}
            onChange={this.updateSearchType}
          />

          <button onClick={this.submitSearch}></button>
        </span>
        <ResultsList/>
      </div>
    )
  }
}
