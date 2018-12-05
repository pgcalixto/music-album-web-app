import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import NewAlbum from './NewAlbum';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/add-album' component={NewAlbum}/>
        </Switch>
      </main>
    )
  }
}
