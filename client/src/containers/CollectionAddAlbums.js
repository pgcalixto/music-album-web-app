import React, { Component } from 'react';
import {
  Button,
  Table
} from 'react-bootstrap';

export default class CollectionAddAlbums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
    };
    this.submitAddAlbum = this.submitAddAlbum.bind(this);
  }

  async submitAddAlbum(event) {
    event.preventDefault();

    const collection_id = this.props.match.params.collection_id;
    const album_id = event.target.id;
    const url = '/collections/' + collection_id + '/albums';

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: album_id})
    };

    await fetch(url, request)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(JSON.stringify(data));
      })

    window.location.reload();
  }

  renderInformation() {
    return (
      <div>
        Adicionar álbums à coleção:
        {this.state.albums.length === 0
        ? 'Não há álbuns fora desta coleção.'
        : <Table striped bordered condensed hover>
            <caption>Álbuns da coleção</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Artista</th>
                <th>Ano</th>
              </tr>
            </thead>
            <tbody>
              { this.state.albums.map(value =>
                <tr key={value.id}>
                  <td> {value.id} </td>
                  <td> {value.title} </td>
                  <td> {value.artist} </td>
                  <td> {value.year} </td>
                  <td>
                    <form id={value.id} onSubmit={this.submitAddAlbum}>
                      <Button type="submit">Adicionar</Button>
                    </form>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        }
      </div>
    );
  }

  async fetchAlbums() {
    const collection_id = this.props.match.params.collection_id;
    const response = await fetch('/collections/' + collection_id +
                                 '/remaining-albums');
    const albums = await response.json();

    this.setState({
      albums: albums,
    });
  }

  async componentDidMount() {
    await this.fetchAlbums();
  }

  render() {
    return (
      <div className="CollectionInfo">
        { this.renderInformation() }
      </div>
    );
  }
}
