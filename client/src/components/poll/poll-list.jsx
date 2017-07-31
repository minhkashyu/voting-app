import React, { Component } from 'react';

import PollItem from './poll-item.jsx';

class PollList extends Component {

    render() {
        return (
            <div className="polls">
                {this.props.polls.map(poll => <PollItem
                key={poll.id}
                title={poll.title}
                />)}
            </div>
        );
    }
}

export default PollList;