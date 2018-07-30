import React, { Component } from "react";
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "../node_modules/@fortawesome/free-solid-svg-icons";

class Home extends Component {
  constructor(props) {
    super(props);
    // initialize state
    this.state = {
      gif: null,

    }
  }

  baseUrl = 'https://coding-love-random-gif.now.sh'

  // handle async operation in this lifecycle method to ensure
  // component has mounted properly
  componentDidMount() {
    this.getCodingLoveGif();
  }

  getCodingLoveGif() {
    this.setState({gif: null});

    axios.get(`${this.baseUrl}/gif`)
      .then((response) => {
        this.setState((prevState, props) => {
          return { gif: response.data };
        })
      });
  }

  render() {
    const { gif } = this.state;
    return (
      <div className="container-fluid home">
        <div className="col-12 card text-center">
          <div className="card-body">
            <h5 className="card-title">Welcome to Binary Monks!</h5>
            <p className="card-text">Binary Monks gives you programming news from sources you love.
            Click on "Feed" to see the news and "Channels" to select your sources</p>
            <a href="/feed" className="btn btn-primary">See awesome news. Go to feed!</a>
            <div className="row justify-content-md-center">
              {gif &&
                <div className="col-6 coding-love-gif">
                  <h5 className="card-title border-bottom-0">{gif.title}</h5>
                  <img src={gif.link}/>
                  <br/>
                  <span className="refresh-gif-btn" onClick={() => this.getCodingLoveGif()}>Refresh Gif</span>
                </div>
              }
              {!gif &&
                <div className="loading-spinner"><FontAwesomeIcon icon={faSpinner} size="2x" spin /></div>
              }
            </div>            
          </div>
        </div>
      </div>
    )
  }
}

export default Home;