import React, { Component } from 'react';
import Albums from '../components/Albums';

export default class Home extends Component {

  state = {
    albums: null
  };

  async renderAlbums() {
    const response = await fetch('/albums');
    const albumList = await response.json();

    var albums = <Albums albums={albumList} />;
    this.setState({ albums: albums });
  }

  componentDidMount() {
    this.renderAlbums();
  }

  render() {
    return (
      <div className="Home">
        Olá Mundo
        { this.state.albums }
      </div>
    );
  }
}
