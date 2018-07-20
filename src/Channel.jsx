import React, { Component } from 'react';

class Channel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { channel, userChannels } = this.props

    let channelIsUserChannel = userChannels.indexOf(this.props.channel.channel) === -1 ? false : true;

    return (
      <div>
      {channel &&
        <div className="card">
          <div className="card-body">
            <p className="card-text">{channel.title}</p>
            { channelIsUserChannel ?
              <a onClick={() => this.props.removeChannel(channel)} href="#" className="card-link btn btn-sm btn-danger">Remove Channel</a> :
              <a onClick={() => this.props.addChannel(channel)} href="#" className="card-link btn btn-sm btn-primary">Add Channel</a>
            }
            
          </div>
        </div>
      }
      </div>
    );
  }
}

export default Channel;