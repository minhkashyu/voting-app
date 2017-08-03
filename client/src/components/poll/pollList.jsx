import React, { Component } from 'react';

class PollList extends Component {
    render() {
        return (
            <ul className="list-group">
                {this.props.polls.map(poll =>
                    <li className="list-group-item" key={poll._id}>
                        <a className="btn btn-default" href={`/polls/${poll._id}`}>{poll.title}</a>
                    </li>
                )}
            </ul>
        );
    }
}

export default PollList;