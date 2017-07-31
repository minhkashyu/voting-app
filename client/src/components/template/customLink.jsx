import React from 'react';
import { NavLink } from 'react-router-dom';

class CustomLink extends React.Component {
    render() {
        return (
            <li>
                <NavLink exact to={this.props.navItem.link}>
                    <span className={this.props.navItem.icon}></span>
                    &nbsp;&nbsp;{this.props.navItem.name}
                </NavLink>
            </li>
        );
    }
}

export default CustomLink;