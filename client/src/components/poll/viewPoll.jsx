import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePoll } from './../../actions/polling';

class ViewPoll extends Component {
    constructor(props) {
        super(props);

        const { params, fetchSinglePoll } = this.props;
        fetchSinglePoll(params.pollId);
    }

    render() {
        const { poll } = this.props;
        return (
            <div className="row poll">
                { poll }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        poll: state.poll.poll
    };
}

export default connect(mapStateToProps, { fetchSinglePoll })(ViewPoll);