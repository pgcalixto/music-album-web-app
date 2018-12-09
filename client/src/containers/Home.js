import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Albums from '../components/Albums';
import Collections from '../components/Collections';

import './Home.css';

export default class Home extends Component {

  state = {
    albums: null,
    collections: null
  };

  async renderAlbums() {
    // TODO check for fetch() and json() errors
    const response = await fetch('/albums');
    const albumList = await response.json();

    var albums = <Albums albums={albumList} />;
    this.setState({ albums: albums });
  }

  async renderCollections() {
    // TODO check for fetch() and json() errors
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
        <h1>
          {`COLETÂNEA MUSICAL`}
        </h1>
        <br />
        { this.state.collections }
        { this.state.albums }
        <Button
          href="/new-album"
          bsStyle="info"
        >
          Adicionar novo álbum
        </Button>
      </div>
    );
  }
}
