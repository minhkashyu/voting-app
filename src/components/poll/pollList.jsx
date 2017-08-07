import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PollList extends Component {
    render() {
        return (
            <ul className="list-group">
                {this.props.polls.map(poll =>
                    <li className="list-group-item" key={poll._id}>
                        <Link className="btn btn-default" to={`/polls/${poll._id}`}>{poll.title}</Link>
                    </li>
                )}
            </ul>
        );
    }
}

export default PollList;