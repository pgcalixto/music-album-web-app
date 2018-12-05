import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from "react-bootstrap";

export default class Albums extends Component {
  renderTable = () => {
    return (
      <Table striped bordered condensed hover>
        <caption>Álbuns</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Artista</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          { this.props.albums.map(value =>
            <tr key={value.id}>
              <td> {value.id} </td>
              <td> <Link to={"/albums/" + value.id}>{value.title}</Link> </td>
              <td> {value.artist} </td>
              <td> {value.year} </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div>
        { this.renderTable() }
      </div>
    );
  }
}
