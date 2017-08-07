import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found">
                <h1>404</h1>
                <h2>Page not found!</h2>
                <p>The page you were looking for cannot be found!</p>
                <p>
                    <Link to="/">Go back to the main page</Link>
                </p>
            </div>
        );
    }
}

export default NotFound;