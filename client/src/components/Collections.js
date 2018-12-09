import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from "react-bootstrap";

export default class Collections extends Component {

  renderTable = () => {
    return (
      <Table striped bordered condensed hover>
        <caption>Coleções de álbuns</caption>
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          { this.props.collections.map(value =>
            <tr key={value.id}>
              <td> <Link to={"/collections/" + value.id}>
                {value.name}
              </Link> </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }


  render() {
    return (
      <div className="Collections">
        { this.renderTable() }
      </div>
    );

    // return (
    //   <Table striped bordered condensed hover>
    //     <thead>
    //       <tr>
    //         <th>#</th>
    //         <th>First Name</th>
    //         <th>Last Name</th>
    //         <th>Username</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>1</td>
    //         <td>Mark</td>
    //         <td>Otto</td>
    //         <td>@mdo</td>
    //       </tr>
    //       <tr>
    //         <td>2</td>
    //         <td>Jacob</td>
    //         <td>Thornton</td>
    //         <td>@fat</td>
    //       </tr>
    //       <tr>
    //         <td>3</td>
    //         <td colSpan="2">Larry the Bird</td>
    //         <td>@twitter</td>
    //       </tr>
    //     </tbody>
    //   </Table>
    // );
  }
}
