import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Neighborhood from './Neighborhood';

// function MasterPage () {
//   return (
//     <div className='master-page'>
//       <Routes />
//     </div>
//   )
// }

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
