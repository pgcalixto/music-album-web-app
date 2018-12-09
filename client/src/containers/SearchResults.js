import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Albums from '../components/Albums';

import './SearchResults.css';

export default class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      albums: null,
    };
  }

  async renderAlbums() {
    // TODO check for fetch() and json() errors
    const searchText = this.props.match.params.searchText;
    const response = await fetch('/albumsByName/' + searchText);
    const albums = await response.json();
    this.setState({ albums: albums });
  }

  componentDidMount() {
    this.renderAlbums();
  }

  render() {
    return (
      <Grid className="SearchResultsGrid">
        <h3>
          {`Resultados da busca`}
        </h3>
        {this.state.albums == null || this.state.albums.length === 0
        ? 'Não há álbums contendo o texto pesquisado.'
        : <Albums albums={this.state.albums} />
        }
      </Grid>
    );
  }
}
