import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';

import CustomLink from './customLink.jsx';
import logo from './../../logo.svg';

const authenticatedItems = [
    {
        link: '/',
        name: 'Home',
        icon: 'glyphicon glyphicon-home'
    },
    {
        link: '/my-polls',
        name: 'My Polls',
        icon: 'glyphicon glyphicon-star'
    },
    {
        link: '/poll/new',
        name: 'New Poll',
        icon: 'glyphicon glyphicon-plus'
    }
];

const logout = {
    link: '/logout',
    name: 'Logout',
    icon: 'glyphicon glyphicon-log-out'
};

const unauthenticatedItems = [
    {
        link: '/',
        name: 'Home',
        icon: 'glyphicon glyphicon-home'
    },
    {
        link: '/login',
        name: 'Login',
        icon: 'glyphicon glyphicon-log-in'
    },
    {
        link: '/register',
        name: 'Register',
        icon: 'glyphicon glyphicon-user'
    }
];

class NavBar extends React.Component {

    static propTypes = {
        cookies: PropTypes.instanceOf(Cookies).isRequired
    };

    renderLinks() {
        // Authenticated navigation
        if (this.props.authenticated) {
            const userName = this.props.cookies.get('user').name;
            return (
                <ul className="nav navbar-nav navbar-right">
                    {authenticatedItems.map((item, i) => <CustomLink key={i} navItem={item} />)}
                    <li className="dropdown">
                        <button className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="glyphicon glyphicon-user"></span>
                            &nbsp;&nbsp;{userName}
                            &nbsp;&nbsp;<span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <CustomLink navItem={logout} />
                        </ul>
                    </li>
                </ul>
            );
        }
        // Unauthenticated navigation
        else {
            return (
                <ul className="nav navbar-nav navbar-right">
                    {unauthenticatedItems.map((item, i) => <CustomLink key={i} navItem={item} />)}
                </ul>
            );
        }
    }

    render() {
        return (
            <nav id="top" className="navbar navbar-changed navbar-default hidden-container">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-minhta" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="http://minhta.com.au/" className="navbar-brand img-responsive"><img src={logo} className="App-logo" alt="logo" /></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="nav-minhta">
                        {this.renderLinks()}
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default withCookies(withRouter(connect(mapStateToProps)(NavBar)));