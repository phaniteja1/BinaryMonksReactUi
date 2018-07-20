import React, { Component } from 'react';
import './App.css';
import Feed from './Feed';
import Channels from './Channels';
import Navbar from './Navbar';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render(){
      return(
        <Router >
          <div className='root'>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Feed} />
              <Route path="/channels" component={Channels} />
            </Switch>
          </div>
        </Router>
      )
  }
}

export default App;
