import React, { Component } from "react";
import FeedItem from './FeedItem';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import ScrollUpButton from 'react-scroll-up-button';
import Moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "../node_modules/@fortawesome/free-solid-svg-icons";


class Feed extends Component {
  constructor(props) {
    super(props);

    // initialize state
    this.state = {
      feed: [],
      userFeed: []
    }
  }

  page = 0
  pageItems = 30
  hasMore = true

  initialDataIsSet = false

  baseUrl = 'https://api.mlab.com/api/1/databases/binarymonks/collections/feeds?apiKey=8MsekOtzEDmxaPSSnqqCNJ9KM1XKN2RL'

  // handle async operation in this lifecycle method to ensure
  // component has mounted properly
  componentDidMount() {
    // setting default channels if no channels exist in the local storage
    if (!this.getUserChannels()) {
      localStorage.setItem('user-channels', JSON.stringify(['hacker_news', 'reddit_programming']));
    }

    axios.get(this.getUrl())
      .then((response) => {
        // once you have your data use setState to udpate state
        this.initialDataIsSet = true;
        console.log('Setting the initial data');
        this.setState((prevState, props) => {
          return { feed: response.data, userFeed: this.filterFeed(response.data) };
        })
      });
  }

  getUrl() {
    let skipCount = this.page * this.pageItems;
    console.log('Type of user channels : ', JSON.stringify(this.getUserChannels()));
    let query = `l=${this.pageItems}&sk=${skipCount}&q={"channel": { $in: ${localStorage.getItem('user-channels')} }}`;
    return `${this.baseUrl}&${query}`;
  }

  fetchMoreData = () => {
    if (this.initialDataIsSet) this.page++;

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
  }

  getUserChannels() {
    return JSON.parse(localStorage.getItem('user-channels'));
  }

  filterFeed = (feed) => {
    const { userFeed } = this.state;
    let sortedFeed = [];

    if (feed) {
      feed.forEach((feeditem) => {
        feeditem['published'] = Moment(feeditem['published'])
        sortedFeed.push(feeditem)
      });
    }

    return sortedFeed;
  }

  render() {
    const { userFeed } = this.state;
    const loadingSpinner = <div className="row loading-spinner"><FontAwesomeIcon icon={faSpinner} size="4x" spin /></div>;
    return (
      <div className="container-fluid feed">
        <ScrollUpButton ContainerClassName="goto-top-btn"/>
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