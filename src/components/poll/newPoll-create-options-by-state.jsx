import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { required, maxLength100, minLength2, renderField } from './../template/formValidation.jsx';
import { addPoll } from './../../actions/polling';

const form = reduxForm({
    form: 'newPoll'
});

const CustomOptions = (props) => {
    let value = props.value;
    return (
        <Field
        name="options[]"
        type="text"
        label={"Option " + value}
        component={renderField}
        validate={[required, maxLength100, minLength2]}
        />
    );
};

class NewPoll extends React.Component {

    constructor(props) {
        super(props);
        this.state = { moreOptions: [1, 2] };
        this.addMoreOptions = this.addMoreOptions.bind(this);
    }

    addMoreOptions() {
        this.setState(prevState => ({
            moreOptions: prevState.moreOptions.concat([prevState.moreOptions.length + 1])
        }));
    }

    render() {
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
                    {this.state.moreOptions.map(option => <CustomOptions key={option.toString()} value={option} />)}
                    <button type="button" disabled={submitting} className="btn btn-mt" onClick={this.addMoreOptions}>More Options</button>
                    <button type="submit" disabled={submitting} className="btn btn-mt">Submit</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-mt">Clear Values</button>
                </form>
                <VoteForm options={poll['options']} onSubmitVote={submitVote} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.poll.message
    };
}

export default connect(mapStateToProps, { addPoll })(form(NewPoll));