import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Neighborhood from './Neighborhood';

class App extends Component {
  render() {
    return (
      <Route exact path='/' render={() => (
        <Neighborhood />
      )}/>
    )
  }
}

export default App;
