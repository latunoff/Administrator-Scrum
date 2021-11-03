import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavLinkLi extends Component {
    constructor(props){
        super(props);
        
    }

    render() {
        const clickEvent = this.props.onClick ? 'onClick=' : '';
        const icon = this.props.icon ? <i className={"fa fa-" + this.props.icon + " fa-3x"} aria-hidden="true"></i> : '';
        return(
            <li><Link to={this.props.to} className="nav-link" onClick={this.props.onClick}>{icon}<br />{this.props.title}</Link></li>
        );
    }
}

export default NavLinkLi;