import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </main>
    )
  }
}
