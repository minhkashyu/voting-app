import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from './../../actions/auth';

class Logout extends Component {

    componentDidMount() {
        this.props.logoutUser();
    }

    render() {
        if (this.props.isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: this.props.location }
                }}/>
            );
        }
        return <p className="text-center">You are being logged out!</p>;
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, { logoutUser })(Logout);