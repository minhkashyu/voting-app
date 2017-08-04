import React from 'react';
import loading from './loading.gif';

class Loading extends React.Component {
    render() {
        return (
            <div className="loading">
                <img className="img-responsive" src={loading} alt="loading..." />
            </div>
        );
    }
}

export default Loading;