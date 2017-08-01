import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { registerUser, loginFacebook, loginGoogle } from './../../actions/auth';
import RegisterForm from './registerForm.jsx';
import LoginMedia from './loginMedia.jsx';

class Register extends Component {

    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        if (this.props.authenticated) {
            this.props.history.push('/my-polls');
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.authenticated) {
            this.props.history.push('/my-polls');
        }
    }

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
        const { registerUser, loginFacebook, loginGoogle } = this.props;
        return (
            <div>
                <RegisterForm onSubmitRegister={registerUser} />
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

export default connect(mapStateToProps, { registerUser, loginFacebook, loginGoogle })(Register);