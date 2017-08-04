import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSinglePoll, submitVote } from './../../actions/polling';
import VoteForm from './voteForm.jsx';
import Loading from './../template/loading.jsx';

class ViewPoll extends Component {

    componentDidMount() {
        const { match, fetchSinglePoll } = this.props;
        fetchSinglePoll(match.params.pollId);
    }

    renderForm() {
        const { poll, submitVote } = this.props;
        if(poll.options && poll.options.length > 0) {
            return (
                <VoteForm options={poll.options} onSubmitVote={submitVote} />
            );
        }
    }

    render() {
        if (this.props.isFetching) {
            return <Loading />;
        }
        return (
            <div>
                <h3>{this.props.poll.title}</h3>
                <h4>I'd like to vote for</h4>
                {this.renderForm()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        poll: state.polling.poll,
        isFetching: state.main.isFetching
    };
}

export default connect(mapStateToProps, { fetchSinglePoll, submitVote })(ViewPoll);