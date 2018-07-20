import React, { Component } from "react";
import Channel from './Channel';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

class Channels extends Component {
  constructor(props) {
    super(props);

    // initialize state
    this.state = {
      channels: [],
      userChannels: []
    }

    // This binding is necessary to make `this` work in the callback
    this.addChannel = this.addChannel.bind(this);
    this.removeChannel = this.removeChannel.bind(this);
  }

  page = 0
  pageItems = 20
  hasMore = true

  baseUrl = 'https://api.mlab.com/api/1/databases/binarymonks/collections/channels?apiKey=8MsekOtzEDmxaPSSnqqCNJ9KM1XKN2RL'

  // handle async operation in this lifecycle method to ensure
  // component has mounted properly
  componentDidMount() {
    axios.get(this.getUrl())
      .then((response) => {
        // once you have your data use setState to udpate state
        this.setState((prevState, props) => {
          return { 
            channels: response.data,
            userChannels: JSON.parse(localStorage.getItem('user-channels'))
          };
        })
      });
  }

  updateUserChannels() {
    console.log('Updating state')
    this.setState({ userChannels: JSON.parse(localStorage.getItem('user-channels')) });
  }

  addChannel(channel) {
    let userChannels = JSON.parse(localStorage.getItem('user-channels'));
    if (userChannels.indexOf(channel.channel) === -1) userChannels.push(channel.channel)
    localStorage.setItem('user-channels', JSON.stringify(userChannels));
    this.updateUserChannels();
  }

  removeChannel(channel) {
    let userChannels = JSON.parse(localStorage.getItem('user-channels'));
    userChannels = userChannels.filter((userChannel)=>userChannel!=channel.channel);
    localStorage.setItem('user-channels', JSON.stringify(userChannels));
    this.updateUserChannels();
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
            channels: this.state.channels.concat(response.data),
            userChannels: JSON.parse(localStorage.getItem('user-channels'))
          };
        })
      });
  };

  render() {
    const { channels, userChannels } = this.state;
    let addChannel = this.addChannel;
    let removeChannel = this.removeChannel;
    return (
      <div>
        {channels &&
          <div className="container-fluid channels">
            <InfiniteScroll
              pageStart={0}
              loadMore={this.fetchMoreData}
              hasMore={this.hasMore}
              loader={<div className="loader" key={0}>Loading ...</div>}
            >
              <Masonry className={'channels-masonry'} >
                {channels.map(function (channel, index) {
                  return (
                    <div key={index} className="col-4">
                      <Channel channel={channel} userChannels={userChannels} addChannel={addChannel} removeChannel={removeChannel}/>
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

export default Channels;