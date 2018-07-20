import React, { Component } from 'react';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class FeedItem extends Component {

  formatChannelName(str) {
    var frags = str.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  render() {
    const { feeditem } = this.props
    const element = <FontAwesomeIcon icon={faArrowRight} size="xs"/>

    return (
      <div>
        {feeditem &&
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{feeditem.title}</h5>
              <h6 className="card-subtitle feed-date text-sm mt-0 mb-4">
                <span className="float-right">{Moment(feeditem.published).fromNow()}</span>
              </h6>
              <p className="card-text" dangerouslySetInnerHTML={{ __html: feeditem.summary }} />
            
              <h6 className="card-subtitle mt-0 mb-4">
                <span className="badge badge-primary">{this.formatChannelName(feeditem.channel)}</span>
                <a href={feeditem.link} target="new" className="card-link float-right">Read More {element}</a>
              </h6>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default FeedItem;