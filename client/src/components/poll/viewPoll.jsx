import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchSinglePoll, submitVote, deletePoll } from './../../actions/polling';
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

    handleClick(e) {
        const { match, deletePoll } = this.props;
        e.preventDefault();
        deletePoll(match.params.pollId);
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

    renderDeletePoll() {
        if (this.props.isAuthenticated) {
            return <button type="button" className="btn btn-danger" onClick={(e) => this.handleClick(e)}>Delete This Poll</button>;
        }
    }

    render() {
        const { isRedirected, location, isFetching, poll } = this.props;
        if (isRedirected) {
            return (
                <Redirect to={{
                    pathname: '/',
                    state: { from: location }
                }}/>
            );
        }
        if (isFetching) {
            return <Loading />;
        }
        return (
            <div>
                <h3>{poll.title}</h3>
                {this.renderDeletePoll()}
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
        isAuthenticated: state.auth.isAuthenticated,
        isRedirected: state.main.isRedirected
    };
}

export default connect(mapStateToProps, { fetchSinglePoll, submitVote, deletePoll })(ViewPoll);