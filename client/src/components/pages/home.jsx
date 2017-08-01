import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPolls } from './../../actions/polling';
import PollList from './../poll/pollList.jsx';

class Home extends React.Component {

    renderPolls() {
        if (this.props.polls && this.props.polls.length > 0) {
            return (
                <PollList polls={this.props.polls} />
            );
        }

        return <div>There are no polls.</div>;
    }

    render() {
        return (
            <div>
                <h1 className="heading1">Voting App</h1>
                <h4 className="heading2">A Freecodecamp Full-Statck Project using React/Redux, Express and Passport</h4>
                <div className="panel panel-default panel-changed">
                    <div className="panel-heading">
                        <h3>All Polls</h3>
                        { this.props.authenticated ? <p>You can create a new poll <Link to="/poll/new">here</Link></p> : <p>Please <Link to="/login">log in</Link> to create a new poll</p>}
                    </div>
                    <div className="panel-body">
                        { this.renderPolls() }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        polls: state.poll.polls,
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, { fetchPolls })(Home);