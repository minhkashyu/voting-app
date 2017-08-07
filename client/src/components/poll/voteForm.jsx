import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { PropTypes } from 'prop-types';

import { renderField, renderSelect, validateVoteForm } from './../template/formValidation.jsx';
const validate = validateVoteForm;

class VoteForm extends React.Component {

    static propTypes = {
        onSubmitVote: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool.isRequired
    };

    render() {
        const { handleSubmit, pristine, submitting, onSubmitVote, options, optionValue, isAuthenticated } = this.props;
        return (
            <form onSubmit={handleSubmit(onSubmitVote)}>
                <Field name="options" options={options} component={renderSelect} isAuthenticated={isAuthenticated} />
                {optionValue === 'custom' && isAuthenticated &&
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