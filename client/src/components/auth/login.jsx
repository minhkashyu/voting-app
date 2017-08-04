import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser, loginFacebook, loginGoogle } from './../../actions/auth';
import LoginForm from './loginForm.jsx';
import LoginMedia from './loginMedia.jsx';
import Loading from './../template/loading.jsx';

class Login extends Component {

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render() {
        const { isAuthenticated, location, isFetching, loginUser, loginFacebook, loginGoogle } = this.props;
        if (isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/my-polls',
                    state: { from: location }
                }}/>
            );
        }
        if (isFetching) {
            return <Loading />;
        }
        return (
            <div>
                <LoginForm onSubmitLogin={loginUser} />
                {this.renderAlert()}
                <div className="mt-divider"></div>
                <LoginMedia onLoginFacebook={loginFacebook} onLoginGoogle ={loginGoogle} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
        isFetching: state.main.isFetching
    };
}

export default connect(mapStateToProps, { loginUser, loginFacebook, loginGoogle })(Login);