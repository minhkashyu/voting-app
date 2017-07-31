import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { authenticatedTest, loginUser, loginFacebook, loginGoogle } from '../../actions/auth';
import LoginForm from './loginForm.jsx';
import LoginMedia from './loginMedia.jsx';

class Login extends Component {

    constructor(props) {
        super(props);
        this.props.authenticatedTest();
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render() {
        const { loginUser, loginFacebook, loginGoogle } = this.props;
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
        message: state.auth.message,
        authenticated: state.auth.authenticated
    };
}

export default withRouter(connect(mapStateToProps, { authenticatedTest, loginUser, loginFacebook, loginGoogle })(Login));