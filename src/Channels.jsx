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
    let skipCount = this.page * this.pageItems;
    let query = `l=${this.pageItems}&sk=${skipCount}`;
    return `${this.baseUrl}&${query}`;
  }

  render() {
    const { channels, userChannels } = this.state;
    let addChannel = this.addChannel;
    let removeChannel = this.removeChannel;
    return (
      <div>
        {channels &&
          <div className="container-fluid channels">
            <Masonry className={'channels-masonry'} >
              {channels.map(function (channel, index) {
                return (
                  <div key={index} className="col-4">
                    <Channel channel={channel} userChannels={userChannels} addChannel={addChannel} removeChannel={removeChannel}/>
                  </div>
                )
              })}
            </Masonry>
          </div>
        }
      </div>
    )
  }
}

export default Channels;