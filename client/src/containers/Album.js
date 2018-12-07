import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

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
    this.isEquivalent = this.isEquivalent.bind(this);
  }

  /**
   * Checks if two Objects have equal field values.
   *
   * @param {Object} a - First object to be compared to.
   * @param {Object} b - Second object to be compared to.
   * @returns {Boolean} True if all Object's values are equal to each other,
   *                    false otherwise.
   */
  isEquivalent(a, b) {
    if (a == null || b == null) {
      if (a == null && b == null) { return true; }
      return false;
    }

    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) { return false; }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) { return false; }
    }
    return true;
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
      <div>
        Editar informações
        <form onSubmit={this.submitForm}>
          {fields.map((field, index) =>
            <FormGroup
              key={field}
              controlId={field}
            >
              <ControlLabel>
                {fieldNames_ptbr[index]}:
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
            type="submit"
            disabled={
              this.isEquivalent(this.state.originalAlbum, this.state.album)}
          >Salvar</Button>
        </form>
      </div>
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
