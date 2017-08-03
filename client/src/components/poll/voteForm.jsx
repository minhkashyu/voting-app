import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { PropTypes } from 'prop-types';

import { renderField, validate } from './../template/formValidation.jsx';

class VoteForm extends React.Component {

    render() {
        const { handleSubmit, pristine, submitting, onSubmitVote, options, optionValue } = this.props;
        return (
            <form onSubmit={handleSubmit(onSubmitVote)}>
                <Field name="options" component="select" className="form-control">
                    <option>Please select an option to vote for...</option>
                    {options.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
                    <option value="custom">I'd like my own option</option>
                </Field>
                {optionValue === 'custom' &&
                    <Field
                    name="customOption"
                    type="text"
                    label="My Own Option"
                    component={renderField}
                    />
                }
                <button type="submit" disabled={pristine || submitting} className="btn btn-mt">Vote</button>
            </form>
        );
    }
}

VoteForm.propTypes = {
    onSubmitVote: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

// Decorate with redux-form
const form = reduxForm({
    form: 'voting',
    validate
});

// Decorate with connect to read form values
const selector = formValueSelector('voting');
const connectValue = connect(state => {
    const optionValue = selector(state, 'options');
    return {
        optionValue
    };
});

export default connectValue(form(VoteForm));