import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Albums from '../components/Albums';
import Collections from '../components/Collections';

export default class Home extends Component {

  state = {
    albums: null,
    collections: null
  };

  async renderAlbums() {
    const response = await fetch('/albums');
    const albumList = await response.json();

    var albums = <Albums albums={albumList} />;
    this.setState({ albums: albums });
  }

  async renderCollections() {
    const response = await fetch('/collections');
    const collectionList = await response.json();

    var collections = <Collections collections={collectionList} />;
    this.setState({ collections: collections });
  }


  componentDidMount() {
    this.renderCollections();
    this.renderAlbums();
  }

  render() {
    return (
      <div className="Home">
        Olá Mundo
        <br />
        <Link to="/add-album/">Adicionar novo álbum</Link>
        <br />
        { this.state.albums }
        { this.state.collections }
      </div>
    );
  }
}
