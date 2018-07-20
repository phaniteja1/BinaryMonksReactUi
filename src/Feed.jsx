import React, { Component } from "react";
import FeedItem from './FeedItem';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "../node_modules/@fortawesome/free-solid-svg-icons";


class Feed extends Component {
  constructor(props) {
    super(props);

    // initialize state
    this.state = {
      feed: null,
      userFeed: null
    }
  }

  page = 0
  pageItems = 100
  hasMore = true

  baseUrl = 'https://api.mlab.com/api/1/databases/binarymonks/collections/feeds?apiKey=8MsekOtzEDmxaPSSnqqCNJ9KM1XKN2RL'

  // handle async operation in this lifecycle method to ensure
  // component has mounted properly
  componentDidMount() {
    // setting default channels if no channels exist in the local storage
    if (!this.getUserChannels().length) {
      localStorage.setItem('user-channels', JSON.stringify(['coding_horror']))
    }

    axios.get(this.getUrl())
      .then((response) => {
        // once you have your data use setState to udpate state
        this.setState((prevState, props) => {
          return { feed: response.data, userFeed: this.filterFeed(response.data) };
        })
      });
  }

  getUrl() {
    const { page } = this.state;
    let skipCount = this.page * this.pageItems;
    let query = `l=${this.pageItems}&sk=${skipCount}`;
    return `${this.baseUrl}&${query}`;
  }

  fetchMoreData = () => {
    this.page++;

    axios.get(this.getUrl())
      .then((response) => {
        if (!response.data.length) this.hasMore = false
        // once you have your data use setState to udpate state
        this.setState((prevState, props) => {
          return {
            // feed: this.state.feed.concat(response.data)
            feed: this.state.feed.concat(response.data),
            userFeed: this.state.userFeed.concat(this.filterFeed(response.data))

          };
        })
      });
  };

  shuffle(array) {
    return array.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
  }

  getUserChannels() {
    return JSON.parse(localStorage.getItem('user-channels'));
  }

  filterFeed = (feed) => {
    let userChannels = this.getUserChannels();
    let filteredFeed = feed.filter(function (feeditem) {
      return userChannels.indexOf(feeditem.channel) !== -1;
    });
    return filteredFeed;
  }

  render() {
    const { userFeed } = this.state;
    const loadingSpinner = <div className="row loading-spinner"><FontAwesomeIcon icon={faSpinner} size="4x" spin/></div>;
    return (
      <div className="container-fluid feed">
        {userFeed &&
          <InfiniteScroll
            pageStart={0}
            loadMore={this.fetchMoreData}
            hasMore={this.hasMore}
            loader={<div className="loader" key={0}>{loadingSpinner}</div>}
          >
            <Masonry className={'feed-masonry'} >
              {userFeed.map(function (feeditem, index) {
                return (
                  <div key={index} className="col-4">
                    <FeedItem feeditem={feeditem} />
                  </div>
                )
              })}
            </Masonry>
          </InfiniteScroll>
        }
      </div>
    )
  }
}

export default Feed;