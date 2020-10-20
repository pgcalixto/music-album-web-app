import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import NewAlbum from "./NewAlbum";
import Album from "./Album";
import Collection from "./Collection";
import CollectionAddAlbums from "./CollectionAddAlbums";
import SearchResults from "./SearchResults";

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/new-album" component={NewAlbum} />
          <Route path="/albums/:album_id" component={Album} />
          <Route
            exact
            path="/collections/:collection_id"
            component={Collection}
          />
          <Route
            path="/collections/:collection_id/add-albums"
            component={CollectionAddAlbums}
          />
          <Route path="/search/:searchText" component={SearchResults} />
        </Switch>
      </main>
    );
  }
}
