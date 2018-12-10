import React, { Component } from 'react';
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid
} from 'react-bootstrap';
import { isEquivalent } from '../utils';

import './Album.css';

export default class Album extends Component {
  constructor(props) {
    super(props);

    // `originalAlbum` contains the original information about the album, while
    // `album` contains the forms input. they both exist to enable the Submit
    // button only when they differ.
    this.state = {
      album: null,
      originalAlbum: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(event) {
    var album = this.state.album;
    album[event.target.id] = event.target.id === 'year'
      ? parseInt(event.target.value.replace(/\D/g,''), 10)
      : event.target.value;
    this.setState({
      album: album
    });
  }

  async submitForm(event) {
    event.preventDefault();

    var params = {}
    const fields = ['title', 'artist', 'year'];
    for (var field of fields) {
      if (this.state.album[field] !== this.state.originalAlbum[field]) {
        params[field] = this.state.album[field];
      }
    }

    const request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    };

    const album_id = this.props.match.params.album_id;
    await fetch("/albums/" + album_id, request)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(JSON.stringify(data));
      });

    window.location.reload();
  }

  renderInformation() {
    const fieldNames_ptbr = ['Título', 'Artista', 'Ano'];
    const fields = ['title', 'artist', 'year'];

    return (
      <Grid className="AlbumGrid">
        <h3>
          Editar informações
        </h3>
        <form onSubmit={this.submitForm}>
          {fields.map((field, index) =>
            <FormGroup
              key={field}
              controlId={field}
            >
              <ControlLabel>
                {fieldNames_ptbr[index]}
              </ControlLabel>
              <FormControl
                type="text"
                value={
                  this.state.album == null
                  ? ''
                  : this.state.album[field]}
                placeholder=""
                onChange={this.handleChange}
              />
            </FormGroup>
          )}
          <Button
            bsStyle="primary"
            type="submit"
            disabled={
              isEquivalent(this.state.originalAlbum, this.state.album)}
          >Salvar</Button>
        </form>
      </Grid>
    );
  }

  async fetchAlbum() {
    const album_id = this.props.match.params.album_id;
    const response = await fetch('/albums/' + album_id);
    const album = await response.json();
    // JSON.parse(JSON.stringify) is used for deep copy of the objects, to make
    // sure album and originalAlbum are not the same object
    this.setState({
      album: JSON.parse(JSON.stringify(album)),
      originalAlbum: JSON.parse(JSON.stringify(album))
    });
  }

  async componentDidMount() {
    await this.fetchAlbum();
  }

  render() {
    return (
      <div className="AlbumInfo">
        { this.renderInformation() }
      </div>
    );
  }
}
