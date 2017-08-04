import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
    class Authentication extends Component {

        render() {
            if (!this.props.isAuthenticated) {
                return (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: this.props.location }
                    }}/>
                );
            }
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps)(Authentication);
}