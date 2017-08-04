import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { required, email, maxLength100, renderField } from './../template/formValidation.jsx';
import { getForgotPasswordToken } from './../../actions/auth';

const form = reduxForm({
    form: 'forgotPassword'
});

class ForgotPassword extends Component {

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
        const { isAuthenticated, location, message, handleSubmit, pristine, submitting, getForgotPasswordToken } = this.props;
        if (isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/my-polls',
                    state: { from: location }
                }}/>
            );
        }
        if (message.length > 0) {
            return <p className="text-center">{message}</p>
        }

        return (
            <form onSubmit={handleSubmit(getForgotPasswordToken)}>
                {this.renderAlert()}
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

export default connect(mapStateToProps, { getForgotPasswordToken })(form(ForgotPassword));