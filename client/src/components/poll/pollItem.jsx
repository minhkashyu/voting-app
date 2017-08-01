import React, { Component } from 'react';

class PollItem extends Component {
    render() {
        return (
            <div className='poll'>
                <a href={`/polls/${this.props.id}`}>
                    <span className="poll-body">{this.props.title}</span>
                </a>
            </div>
        );
    }
}

export default PollItem;