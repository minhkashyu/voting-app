import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { required, maxLength100, minLength6, email, renderField } from './../template/formValidation.jsx';

const form = reduxForm({
    form: 'login'
});

class LoginForm extends Component {
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.props.onSubmitLogin)}>
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
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        );
    }
}

LoginForm.propTypes = {
    onSubmitLogin: PropTypes.func.isRequired
};

export default form(LoginForm);
