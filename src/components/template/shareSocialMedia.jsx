import React from 'react';
import { connect } from 'react-redux';

import { shareFacebook, shareGoogle, shareLinkedin, shareTwitter } from './../../actions/index';

class ShareSocialMedia extends React.Component {
    render() {
        const { shareFacebook, shareGoogle, shareLinkedin, shareTwitter } = this.props;
        return (
            <div className="social-media-sharing-buttons">
                <button onClick={shareFacebook} className="btn btn-mt btn-facebook-share">
                    <i className="fa fa-facebook-f"></i> Facebook
                </button>
                <button onClick={shareGoogle} className="btn btn-mt btn-googleplus-share">
                    <i className="fa fa-google-plus"></i> Google+
                </button>
                <button onClick={shareLinkedin} className="btn btn-mt btn-linkedin-share">
                    <i className="fa fa-linkedin"></i> Linkedin
                </button>
                <button onClick={shareTwitter} className="btn btn-mt btn-twitter-share">
                    <i className="fa fa-twitter"></i> Twitter
                </button>
            </div>
        );
    }
}

export default connect(null, { shareFacebook, shareGoogle, shareLinkedin, shareTwitter })(ShareSocialMedia);