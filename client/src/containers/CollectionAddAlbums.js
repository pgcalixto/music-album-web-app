import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";

import "./CollectionAddAlbums.css";

export default class CollectionAddAlbums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
    this.submitAddAlbum = this.submitAddAlbum.bind(this);
  }

  async submitAddAlbum(event) {
    event.preventDefault();

    const collection_id = this.props.match.params.collection_id;
    const album_id = event.target.id;
    const url = "/collections/" + collection_id + "/albums";

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: album_id })
    };

    await fetch(url, request)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(JSON.stringify(data));
      });

    window.location.reload();
  }

  renderInformation() {
    return (
      <div className="CollecionAddAlbumsInfos">
        <h3>{`Adicionar álbums à coleção:`}</h3>
        {this.state.albums.length === 0 ? (
          <div> {`Não há álbuns fora desta coleção.`} </div>
        ) : (
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Título</th>
                <th>Artista</th>
                <th>Ano</th>
              </tr>
            </thead>
            <tbody>
              {this.state.albums.map(value => (
                <tr key={value.id}>
                  <td> {value.title} </td>
                  <td> {value.artist} </td>
                  <td> {value.year} </td>
                  <td>
                    <form id={value.id} onSubmit={this.submitAddAlbum}>
                      <Button bsStyle="info" type="submit">
                        Adicionar
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }

  async fetchAlbums() {
    const collection_id = this.props.match.params.collection_id;
    const response = await fetch(
      "/collections/" + collection_id + "/remaining-albums"
    );
    const albums = await response.json();

    this.setState({
      albums: albums
    });
  }

  async componentDidMount() {
    await this.fetchAlbums();
  }

  render() {
    return (
      <div className="CollectionAddAlbums">{this.renderInformation()}</div>
    );
  }
}
