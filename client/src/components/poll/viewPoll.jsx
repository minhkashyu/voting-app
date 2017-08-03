import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSinglePoll, submitVote } from './../../actions/polling';
import Loading from './../template/loading.jsx';
import VoteForm from './voteForm.jsx';

class ViewPoll extends Component {

    constructor(props) {
        super(props);

        const { match, fetchSinglePoll } = this.props;
        fetchSinglePoll(match.params.pollId);
    }

    renderForm() {
        if(this.props.poll.options && this.props.poll.options.length > 0) {
            return (
                <VoteForm options={this.props.poll.options} onSubmitVote={this.props.submitVote} />
            );
        }
    }

    renderFetching() {
        if (!this.props.isFetching) {
            return (
                <div>
                    <h3>{this.props.poll.title}</h3>
                    <h4>I'd like to vote for</h4>
                    {this.renderForm()}
                </div>
            );
        }
        return (
            <Loading />
        );
    }

    render() {
        return (
            <div>{this.renderFetching()}</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        poll: state.polling.poll,
        isFetching: state.polling.isFetching
    };
}

export default connect(mapStateToProps, { fetchSinglePoll, submitVote })(ViewPoll);