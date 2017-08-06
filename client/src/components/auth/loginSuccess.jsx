import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginSuccess } from './../../actions/auth';
import Loading from './../template/loading.jsx';

class LoginSuccess extends Component {

    componentDidMount() {
        const { match, loginSuccess } = this.props;
        loginSuccess(match.params.media, match.params.jwt);
    }

    render() {
        const { isAuthenticated, location, errorMessage, isFetching } = this.props;
        if (isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/my-polls',
                    state: { from: location }
                }}/>
            );
        }
        if (errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error</strong>&nbsp;&nbsp;{this.props.errorMessage}
                </div>
            );
        }
        if (isFetching) {
            return <Loading />;
        }
        return <p className="text-center">You are being redirected to your main page!</p>;
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
        isFetching: state.main.isFetching
    };
}

export default connect(mapStateToProps, { loginSuccess })(LoginSuccess);