import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { resetPassword } from './../../actions/auth';

import { renderField, validateResetPassword } from './../template/formValidation.jsx';
const validate = validateResetPassword;

class ResetPassword extends Component {

    handleFormSubmit({ password }) {
        const { match, resetPassword } = this.props;
        const resetToken = match.params.resetToken;
        resetPassword(resetToken, { password });
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

    render() {
        const { isAuthenticated, location, message, handleSubmit, pristine, submitting } = this.props;
        if (isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/my-polls',
                    state: { from: location }
                }}/>
            );
        }
        if (message) {
            return <p className="text-center">{message}</p>
        }

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                {this.renderError()}
                <Field
                name="password"
                type="password"
                label="New Password"
                component={renderField}
                />
                <Field
                name="passwordConfirm"
                type="password"
                label="Confirm New Password"
                component={renderField}
                />
                <button type="submit" disabled={pristine || submitting} className="btn btn-mt">Change Password</button>
            </form>
        );
    }
}
function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const form = reduxForm({
    form: 'resetPassword',
    validate
});

export default connect(mapStateToProps, { resetPassword })(form(ResetPassword));