import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMyPolls } from './../../actions/polling';
import Loading from './../template/loading.jsx';
import PollList from './../poll/pollList.jsx';

class MyPolls extends React.Component {

    constructor(props) {
        super(props);
        this.props.fetchMyPolls();
    }

    renderPolls() {
        if (this.props.polls && this.props.polls.length > 0) {
            return (
                <PollList polls={this.props.polls} />
            );
        }

        return <div>There are no polls.</div>;
    }

    renderFetching() {
        if (!this.props.isFetching) {
            return (
                <div className="panel panel-default panel-changed">
                    <div className="panel-heading">
                        <h3>My Polls</h3>
                        <p>You can create a new poll <Link to="/poll/new">here</Link></p>
                    </div>
                    <div className="panel-body">
                    {this.renderPolls()}
                    </div>
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
        polls: state.polling.polls,
        isFetching: state.polling.isFetching
    };
}

export default connect(mapStateToProps, { fetchMyPolls })(MyPolls);