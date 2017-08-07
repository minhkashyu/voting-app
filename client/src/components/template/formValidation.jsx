import React from 'react';
import { Field } from 'redux-form';

export const required = value => (value ? undefined : 'Required');

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength100 = maxLength(100);

const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
export const minLength6 = minLength(6);

export const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9']/i.test(value)
        ? 'Only alphanumeric, single quote characters'
        : undefined;

export const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, must be 10 digits'
        : undefined;

export const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
    }) =>
    <div className="form-group">
        <label>{label}</label>
        <input {...input} className="form-control" placeholder={label} type={type} />
        {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span className="help-block">{warning}</span>))}
    </div>;

export const renderField2 = ({
    input,
    label,
    type,
    fields,
    index,
    meta: { touched, error, warning }
    }) =>
    <div className="form-group">
        { index > 1
            ?
            <div className="input-group">
                <input {...input} className="form-control" placeholder={label} type={type} />
                <span className="input-group-btn">
                    <button
                    className="btn btn-default"
                    type="button"
                    onClick={() => fields.remove(index)}
                    >Remove</button>
                </span>
            </div>
            :
            <input {...input} className="form-control" placeholder={label} type={type} />
            }
        {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span className="help-block">{warning}</span>))}
    </div>;

export const renderOptions = ({ fields, meta: { touched, error, warning } }) => (
    <div>
        <label>Options</label><br />
        {fields.map((option, index) =>
            <Field
            key={index}
            name={option}
            type="text"
            label={`Option #${index + 1}`}
            fields={fields}
            index={index}
            component={renderField2}
            validate={[required, maxLength100, minLength2]}
            />
        )}
        <button type="button" className="btn btn-mt" onClick={() => fields.push()}>More Options</button>
    </div>
);

export const renderSelect = ({ options, isAuthenticated, meta: { touched, error, warning } }) => (
    <div className="form-group">
        <Field name="options" component="select" className="form-control">
            <option value="">Please select an option to vote for...</option>
            {options.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
            {isAuthenticated && <option value="custom">I'd like my own option</option>}
        </Field>
        {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span className="help-block">{warning}</span>))}
    </div>
);

export const validateVoteForm = values => {
    const errors = {};
    let min = 2;
    let max = 100;

    if(!values.options) {
        errors.options = "Please select an option to vote for..."
    }
    if (values.options === 'custom') {
        if (!values.customOption) {
            errors.customOption = 'Required';
        }
        else if (values.customOption.length < min) {
            errors.customOption =  `Must be ${min} characters or more`;
        }
        else if (values.customOption.length > max) {
            errors.customOption =  `Must be ${max} characters or less`;
        }
        else {
            errors.customOption = undefined;
        }
    }
    return errors;
};


export const validateResetPassword = (formProps) => {
    const errors = {};
    let min = 6;
    let max = 100;

    if (!formProps.password) {
        errors.password = 'Please enter a new password';
    }
    else {
        if (formProps.password.length < min) {
            errors.password = `Must be ${min} characters or more`;
        }
        else if (formProps.password.length > max) {
            errors.password = `Must be ${max} characters or less`;
        }
        else {
            errors.password = undefined;
        }
    }
    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please confirm new password';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match';
    }

    return errors;
};
