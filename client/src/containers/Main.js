import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import NewAlbum from './NewAlbum';
import Album from './Album';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/add-album' component={NewAlbum}/>
          <Route path='/albums/:album_id' component={Album}/>
        </Switch>
      </main>
    )
  }
}
