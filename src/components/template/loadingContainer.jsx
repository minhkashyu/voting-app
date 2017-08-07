import React from 'react';
import loading from './loading.gif';

class LoadingContainer extends React.Component {
    render() {
        return (
            <div className="container loading-container">
                <img className="img-responsive" src={loading} alt="loading..." />
            </div>
        );
    }
}

export default LoadingContainer;