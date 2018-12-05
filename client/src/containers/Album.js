import React, { Component } from 'react';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: null
    };
  }

  renderInformation() {
    const fieldNames_ptbr = ['Título', 'Artista', 'Ano'];
    const fields = ['title', 'artist', 'year'];

    return (
      <div>
        {`INFORMAÇÕES DO ÁLBUM`}
        {this.state.album === undefined || this.state.album === null
        ? null
        : fields.map((field, index) =>
            <div key={field}>
              <b>{fieldNames_ptbr[index]}:</b> {this.state.album[field]}
              <br/>
            </div>
        )}
      </div>
    );
  }

  async fetchAlbum() {
    const album_id = this.props.match.params.album_id;
    const response = await fetch('/albums/' + album_id);
    const album = await response.json();
    this.setState({
      album: album
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
