import React, { Component } from 'react';
import { Button, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import Albums from '../components/Albums';
import Collections from '../components/Collections';

import './Home.css';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      albums: null,
      collections: null,
      searchText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  submitSearch(event) {
    event.preventDefault();
    this.props.history.push('/search/' + this.state.searchText);
  }

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
        <form onSubmit={this.submitSearch}>
          <FormGroup controlId="searchText">
            <InputGroup>
              <FormControl
                type="text"
                value={this.state.searchText}
                placeholder="Busque por título do álbum e/ou nome do artista..."
                onChange={this.handleChange}
              />
              <InputGroup.Button>
                <Button
                  bsStyle="primary"
                  type="submit"
                  disabled={this.state.searchText === ''}
                >
                  Pesquisar
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
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
