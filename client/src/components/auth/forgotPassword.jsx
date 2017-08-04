import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getForgotPasswordToken } from '../../actions/auth';

const form = reduxForm({
    form: 'forgotPassword'
});

class ForgotPassword extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/my-polls');
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isAuthenticated) {
            this.props.history.push('/my-polls');
        }
    }

    handleFormSubmit(formProps) {
        this.props.getForgotPasswordToken(formProps);
    }

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
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div>
                    {this.renderAlert()}
                    <label>Email</label>
                    <Field name="email" className="form-control" component="input" type="text" />
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
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

export default withRouter(connect(mapStateToProps, { getForgotPasswordToken })(form(ForgotPassword)));