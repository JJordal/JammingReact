import './App.css';
import { render } from '@testing-library/react';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist1',
      playlistTracks: [{ name: 'name1', artist: 'artist1', album: 'album1', id: 1}, 
      { name: 'name2', artist: 'artist2', album: 'album2', id: 2}]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState({
      playlistTracks: this.state.playlistTracks.concat([track])
    });
  }

  removeTrack(track){
    let newArr = this.state.playlistTracks.filter(t => t.id != track.id);
    this.setState({
      playlistTracks: newArr
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
    //console.log(this.state.searchResults);
  }

  render(){
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onSave={this.savePlaylist} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
        </div>
      </div>
    </div>
    );
  }
}


