import React, { Component } from "react";
import FeedItem from './FeedItem';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';


class Feed extends Component {
  constructor(props) {
    super(props);

    // initialize state
    this.state = {
      feed: null,
      total_feed_count: 100
    }
  }

  page = 0
  pageItems = 3
  hasMore = true

  baseUrl = 'https://api.mlab.com/api/1/databases/binarymonks/collections/feeds?apiKey=8MsekOtzEDmxaPSSnqqCNJ9KM1XKN2RL'

  // handle async operation in this lifecycle method to ensure
  // component has mounted properly
  componentDidMount() {
    axios.get(this.getUrl())
      .then((response) => {
        // once you have your data use setState to udpate state
        this.setState((prevState, props) => {
          return { feed: response.data };
        })
      });
  }

  getUrl() {
    const { page } = this.state;
    let skipCount = this.page * this.pageItems;
    console.log('Skip count : ', skipCount)
    let query = `l=${this.pageItems}&sk=${skipCount}`;
    return `${this.baseUrl}&${query}`;
  }

  fetchMoreData = () => {
    this.page ++;

    axios.get(this.getUrl())
      .then((response) => {
        // once you have your data use setState to udpate state
        this.setState((prevState, props) => {
          if (!response.data.length) this.hasMore = false
          return { 
            feed: this.state.feed.concat(response.data)
          };
        })
      });
  };

  shuffle(array) {
    return array.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
  }

  render() {
    const { feed } = this.state;

    let shuffledFeed = [];
    // if (feed) shuffledFeed = this.shuffle(feed)
    shuffledFeed = feed;

    return (
      <div>
        {feed &&
          <div className="container-fluid feed">
            <InfiniteScroll
              pageStart={0}
              loadMore={this.fetchMoreData}
              hasMore={this.hasMore}
              loader={<div className="loader" key={0}>Loading ...</div>}
            >
              <Masonry className={'feed-masonry'} >
                {shuffledFeed.map(function (feeditem, index) {
                  return (
                    <div key={index} className="col-4">
                      <FeedItem feeditem={feeditem} />
                    </div>
                  )
                })}
              </Masonry>
            </InfiniteScroll>
          </div>
        }
      </div>
    )
  }
}

export default Feed;