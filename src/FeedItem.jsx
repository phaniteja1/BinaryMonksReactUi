import React, { Component } from 'react';
import Moment from 'moment';

class FeedItem extends Component {
  render() {
    const {feeditem} = this.props
    return (
      <div>
      {feeditem &&
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{feeditem.title}</h5>
            <h6 className="card-subtitle mt-0 mb-4">
              {feeditem.channel}
              <span className="float-right">{Moment(feeditem.published).fromNow()}</span>
            </h6>
            <p className="card-text" dangerouslySetInnerHTML={{__html: feeditem.summary}} />
            <a href={feeditem.link} target="new" className="card-link float-right">Read More</a>
          </div>
        </div>
      }
      </div>
    );
  }
}

export default FeedItem;