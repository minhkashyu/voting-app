import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMyPolls } from './../../actions/polling';
import PollList from './../poll/pollList.jsx';
import Loading from './../template/loading.jsx';

class MyPolls extends React.Component {

    componentDidMount() {
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

    render() {
        if (this.props.isFetching) {
            return <Loading />;
        }
        return (
            <div className="panel panel-default panel-changed">
                <div className="panel-heading">
                    <h3>My Polls</h3>
                    <p>You can create a new poll <Link to="/polls/new">here</Link></p>
                </div>
                <div className="panel-body">
                    {this.renderPolls()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        polls: state.polling.polls,
        isFetching: state.main.isFetching
    };
}

export default connect(mapStateToProps, { fetchMyPolls })(MyPolls);