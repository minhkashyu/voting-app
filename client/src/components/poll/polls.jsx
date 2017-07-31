import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPolls } from '../../actions/polling';

import PollList from './poll-list.jsx';

class Polls extends Component {
    componentWillMount() {
        // Fetch polls (polls involving current user)
        this.props.fetchPolls();
    }

    renderPolls() {
        if (this.props.polls && this.props.polls.length > 0) {
            return (
                <PollList polls={this.props.polls} />
            );
        }

        return <div>You do not have any active polls.</div>;
    }

    render() {
        return (
            <div>
                <Link className="btn btn-primary" to="/poll/new">Create a New Poll</Link>
                <div className="panel panel-default">
                    <div className="panel-body">
                        {this.renderPolls()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        polls: state.poll.polls
    };
}

export default connect(mapStateToProps, { fetchPolls })(Polls);