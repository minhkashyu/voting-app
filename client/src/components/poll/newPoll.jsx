import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { required, maxLength100, minLength2, renderField, renderOptions } from './../template/formValidation.jsx';
import { addPoll } from './../../actions/polling';
import Loading from './../template/loading.jsx';

const form = reduxForm({
    form: 'newPoll',
    //enableReinitialize: true,
    initialValues: { 'options': ['', ''] }
});

class NewPoll extends React.Component {

    render() {
        const { handleSubmit, pristine, reset, submitting, isRedirected, location, isFetching, message, addPoll, poll } = this.props;
        if (isRedirected) {
            return (
                <Redirect to={{
                    pathname: `/polls/${poll._id}`,
                    state: { from: location }
                }}/>
            );
        }
        if (isFetching) {
            return (
                <div>
                    <Loading />
                    {message && <h1 className="text-center">message</h1>}
                </div>
            );
        }
        return (
            <div>
                <h3>Create a New Poll</h3>
                <form onSubmit={handleSubmit(addPoll)}>
                    <Field
                    name="title"
                    type="text"
                    label="Title"
                    component={renderField}
                    validate={[required, maxLength100, minLength2]}
                    />
                    <FieldArray name="options" component={renderOptions} />
                    <button type="submit" disabled={submitting} className="btn btn-mt">Submit</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-mt">Clear Values</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.polling.message,
        poll: state.polling.poll,
        isRedirected: state.main.isRedirected,
        isFetching: state.main.isFetching
    };
}

export default connect(mapStateToProps, { addPoll })(form(NewPoll));