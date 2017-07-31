import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authenticatedTest } from '../../actions/auth';

export default function (ComposedComponent) {
    class Authentication extends Component {

        constructor(props) {
            super(props);
            this.props.authenticatedTest();
        }

        static propTypes = {
            history: PropTypes.shape({
                push: PropTypes.func.isRequired
            }).isRequired
        };

        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/login');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: state.auth.authenticated
        };
    }

    return connect(mapStateToProps, { authenticatedTest })(Authentication);
}