import React, { Component } from "react";
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  Panel,
  Table
} from "react-bootstrap";
import { isEquivalent } from "../utils";

import "./Collection.css";

export default class Collection extends Component {
  constructor(props) {
    super(props);

    // `originalCollection` contains the original information about the
    // collection, while `collection` contains the forms input. they both exist
    // to enable the Submit button only when they differ.
    this.state = {
      albums: [],
      collection: null,
      originalCollection: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.submitDeleteAlbum = this.submitDeleteAlbum.bind(this);
  }

  handleChange(event) {
    var collection = this.state.collection;
    collection[event.target.id] = event.target.value;
    this.setState({
      collection: collection
    });
  }

  async submitForm(event) {
    event.preventDefault();

    var params = {};
    const fields = ["name"];
    for (var field of fields) {
      if (
        this.state.collection[field] !== this.state.originalCollection[field]
      ) {
        params[field] = this.state.collection[field];
      }
    }

    const request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    };

    const collection_id = this.props.match.params.collection_id;
    await fetch("/collections/" + collection_id, request)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(JSON.stringify(data));
      });

    window.location.reload();
  }

  async submitDeleteAlbum(event) {
    event.preventDefault();

    const request = {
      method: "DELETE"
    };

    const collection_id = this.props.match.params.collection_id;
    const album_id = event.target.id;
    const url = "/collections/" + collection_id + "/albums/" + album_id;

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
    const collection_id = this.props.match.params.collection_id;
    const fieldNames_ptbr = ["Nome"];
    const fields = ["name"];

    return (
      <div>
        <Grid className="CollectionInfo">
          <h3>Editar informações</h3>
          <form onSubmit={this.submitForm}>
            {fields.map((field, index) => (
              <FormGroup key={field} controlId={field}>
                <ControlLabel>{fieldNames_ptbr[index]}</ControlLabel>
                <FormControl
                  type="text"
                  value={
                    this.state.collection == null
                      ? ""
                      : this.state.collection[field]
                  }
                  placeholder=""
                  onChange={this.handleChange}
                />
              </FormGroup>
            ))}
            <Button
              bsStyle="primary"
              type="submit"
              disabled={isEquivalent(
                this.state.originalCollection,
                this.state.collection
              )}
            >
              Salvar
            </Button>
          </form>
        </Grid>
        <Panel className="AlbumPanel">
          <Panel.Heading>Álbuns</Panel.Heading>
          <Panel.Body>
            {this.state.albums.length === 0 ? null : (
              <Table
                className="AlbumTable"
                striped
                bordered
                condensed
                hover
                responsive
              >
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
                        <form id={value.id} onSubmit={this.submitDeleteAlbum}>
                          <Button bsStyle="danger" type="submit">
                            Remover
                          </Button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Button
              href={"/collections/" + collection_id + "/add-albums/"}
              bsStyle="info"
            >
              Adicionar novo álbum
            </Button>
          </Panel.Body>
        </Panel>
      </div>
    );
  }

  async fetchCollection() {
    const collection_id = this.props.match.params.collection_id;
    var response = await fetch("/collections/" + collection_id);
    const collection = await response.json();

    response = await fetch("/collections/" + collection_id + "/albums");
    const albums = await response.json();

    // JSON.parse(JSON.stringify) is used for deep copy of the objects, to make
    // sure collection and originalCollection are not the same object
    this.setState({
      albums: albums,
      collection: JSON.parse(JSON.stringify(collection)),
      originalCollection: JSON.parse(JSON.stringify(collection))
    });
  }

  async componentDidMount() {
    await this.fetchCollection();
  }

  render() {
    return <div className="Collection">{this.renderInformation()}</div>;
  }
}
