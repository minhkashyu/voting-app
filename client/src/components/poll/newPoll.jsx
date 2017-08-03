import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { PropTypes } from 'prop-types';

import { required, maxLength100, minLength2, renderField, renderOptions } from './../template/formValidation.jsx';
import { addPoll } from './../../actions/polling';
import Loading from './../template/loading.jsx';

const form = reduxForm({
    form: 'newPoll',
    //enableReinitialize: true,
    initialValues: { 'options': ['', ''] }
});

class NewPoll extends React.Component {

    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillUpdate(nextProps) {
        if (Object.keys(nextProps.poll).length > 0 && nextProps.poll.constructor === Object) {
            this.props.history.push(`/polls/${nextProps.poll._id}`);
        }
    }

    renderFetching() {
        if (!this.props.isFetching) {
            const { handleSubmit, pristine, reset, submitting, addPoll } = this.props;
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
        return (
            <Loading />
        );
    }

    render() {
        return (
            <div>{this.renderFetching()}</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.polling.message,
        poll: state.polling.poll,
        isFetching: state.polling.isFetching
    };
}

export default connect(mapStateToProps, { addPoll })(form(NewPoll));