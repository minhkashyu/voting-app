import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { required, email, maxLength100, renderField } from './../template/formValidation.jsx';
import { getForgotPasswordToken } from './../../actions/auth';

class ForgotPassword extends Component {

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
        const { isAuthenticated, location, message, handleSubmit, pristine, submitting, getForgotPasswordToken } = this.props;
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
            <form onSubmit={handleSubmit(getForgotPasswordToken)}>
                {this.renderError()}
                <Field
                name="email"
                type="email"
                label="Email"
                component={renderField}
                validate={[required, email, maxLength100]}
                />
                <button type="submit" disabled={pristine || submitting} className="btn btn-mt">Reset Password</button>
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
    form: 'forgotPassword'
});

export default connect(mapStateToProps, { getForgotPasswordToken })(form(ForgotPassword));