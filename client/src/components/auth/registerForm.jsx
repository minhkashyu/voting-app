import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { required, maxLength100, minLength2, minLength6, email, renderField, alphaNumeric } from './../template/formValidation.jsx';

const form = reduxForm({
    form: 'register'
});

class RegisterForm extends Component {
    render() {
        const { handleSubmit, pristine, reset, submitting, onSubmitRegister } = this.props;
        return (
            <form onSubmit={handleSubmit(onSubmitRegister)}>
                <Field
                name="firstName"
                type="text"
                label="First Name"
                component={renderField}
                validate={[required, maxLength100, minLength2]}
                warn={alphaNumeric}
                />
                <Field
                name="lastName"
                type="text"
                label="Last Name"
                component={renderField}
                validate={[required, maxLength100, minLength2]}
                warn={alphaNumeric}
                />
                <Field
                name="email"
                type="email"
                label="Email"
                component={renderField}
                validate={[required, email, maxLength100]}
                />
                <Field
                name="password"
                type="password"
                label="Password"
                component={renderField}
                validate={[required, maxLength100, minLength6]}
                />
                <button type="submit" disabled={submitting} className="btn btn-mt">Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-mt">Clear Values</button>
            </form>
        );
    }
}

RegisterForm.propTypes = {
    onSubmitRegister: PropTypes.func.isRequired
};

export default form(RegisterForm);