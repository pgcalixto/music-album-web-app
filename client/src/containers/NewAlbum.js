import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Panel
} from 'react-bootstrap';

export default class NewAlbum extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      year: ''
    };
    // TODO add validation state and FormControl.Feedback
    // TODO only enable button when title, artist and year are correct
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  titleCase = str => {
    return str.toLowerCase().split(' ').map(word => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.id === 'year'
        ? event.target.value.replace(/\D/g,'')
        : event.target.value
    });
  }

  async submitForm(event) {
    event.preventDefault();

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        artist: this.state.artist,
        year: parseInt(this.state.year, 10)
      })
    };

    await fetch("/albums/", request)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(JSON.stringify(data));
      });

    this.props.history.push('/');
  }

  render() {

    const fieldNames_ptbr = ['título', 'artista', 'ano'];
    const fields = ['title', 'artist', 'year'];

    return (
      <Panel>
        <Panel.Heading>ADICIONAR ÁLBUM</Panel.Heading>
        <Panel.Body>
          <form onSubmit={this.submitForm}>
            {fields.map((field, index) =>
              <FormGroup
                key={field}
                controlId={field}
                >
                <ControlLabel>
                  {this.titleCase(fieldNames_ptbr[index])}:
                </ControlLabel>
                <FormControl
                  type="text"
                  value={this.state[field]}
                  placeholder=""
                  onChange={this.handleChange}
                />
              </FormGroup>
            )}
            <Button bsStyle="primary" type="submit">Submeter</Button>
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}
