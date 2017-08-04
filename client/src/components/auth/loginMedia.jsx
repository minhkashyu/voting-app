import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class LoginMedia extends Component {

    handleClickFacebook(e) {
        e.preventDefault();
        this.props.onLoginFacebook();
    }

    handleClickGoogle(e) {
        e.preventDefault();
        this.props.onLoginGoogle();
    }

    render() {
        return (
            <div>
                <Link onClick={(e) => this.handleClickFacebook(e)} to="#" className="btn btn-mt" id="btn-facebook">
                    <i className="fa fa-facebook-official"></i>&nbsp;&nbsp;&nbsp;LOGIN WITH FACEBOOK
                </Link>
                <Link onClick={(e) => this.handleClickGoogle(e)} to="#" className="btn btn-mt" id="btn-google">
                    <i className="fa fa-google"></i>&nbsp;&nbsp;&nbsp;LOGIN WITH GOOGLE
                </Link>
            </div>
        );
    }
}

LoginMedia.propTypes = {
    onLoginFacebook: PropTypes.func.isRequired,
    onLoginGoogle: PropTypes.func.isRequired
};

export default LoginMedia;
