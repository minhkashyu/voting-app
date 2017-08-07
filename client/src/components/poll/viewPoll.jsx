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

    onSubmitVote(formprops) {
        let optionId = formprops.options,
            blAdd = false;
        if (formprops.options === 'custom') {
            optionId = formprops.customOption;
            blAdd = true;
        }
        this.props.submitVote(this.props.match.params.pollId, optionId, blAdd);
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error</strong>&nbsp;&nbsp;{this.props.errorMessage}
                </div>
            );
        }
    }

    renderMessage() {
        if (this.props.message) {
            return (
                <div className="alert alert-success">
                    <strong>Success!</strong>&nbsp;&nbsp;{ this.props.message }
                </div>
            );
        }
    }

    renderForm() {
        const { poll, isAuthenticated } = this.props;
        if(poll.options && poll.options.length > 0) {
            return (
                <VoteForm options={poll.options} onSubmitVote={this.onSubmitVote.bind(this)} isAuthenticated={isAuthenticated} />
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
                {this.renderError()}
                {this.renderMessage()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.polling.error,
        message: state.polling.message,
        poll: state.polling.poll,
        isFetching: state.main.isFetching,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, { fetchSinglePoll, submitVote })(ViewPoll);