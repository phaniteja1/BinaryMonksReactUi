import React, { Component } from 'react';
import './App.css';
import Feed from './Feed';
import Navbar from './Navbar';


class App extends Component {
  render(){
      // return (<h1>Hi</h1>);
      return(
        <div className='root'>
          <Navbar/>
          <Feed/>
        </div>
      )

  }
}

export default App;
