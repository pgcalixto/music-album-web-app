import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class Collection extends Component {
  constructor(props) {
    super(props);

    // `originalCollection` contains the original information about the
    // collection, while `collection` contains the forms input. they both exist
    // to enable the Submit button only when they differ.
    this.state = {
      collection: null,
      originalCollection: null
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
    var collection = this.state.collection;
    collection[event.target.id] = event.target.value;
    this.setState({
      collection: collection
    });
  }

  async submitForm(event) {
    event.preventDefault();

    var params = {}
    const fields = ['name'];
    for (var field of fields) {
      if (this.state.collection[field] !== this.state.originalCollection[field]) {
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
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(JSON.stringify(data));
      });

    window.location.reload();
  }

  renderInformation() {
    const fieldNames_ptbr = ['Nome'];
    const fields = ['name'];

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
                  this.state.collection == null
                  ? ''
                  : this.state.collection[field]}
                placeholder=""
                onChange={this.handleChange}
              />
            </FormGroup>
          )}
          <Button
            type="submit"
            disabled={
              this.isEquivalent(this.state.originalCollection,
                                this.state.collection)}
          >Salvar</Button>
        </form>
      </div>
    );
  }

  async fetchCollection() {
    const collection_id = this.props.match.params.collection_id;
    const response = await fetch('/collections/' + collection_id);
    const collection = await response.json();
    // JSON.parse(JSON.stringify) is used for deep copy of the objects, to make
    // sure collection and originalCollection are not the same object
    this.setState({
      collection: JSON.parse(JSON.stringify(collection)),
      originalCollection: JSON.parse(JSON.stringify(collection))
    });
  }

  async componentDidMount() {
    await this.fetchCollection();
  }

  render() {
    return (
      <div className="CollectionInfo">
        { this.renderInformation() }
      </div>
    );
  }
}
