import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../../actions/auth.actions'; 
import classnames from 'classnames'; 
import NavLinkLi from './navlink.component'; 

class NavBarComponent extends Component {
    logout(e){
        e.preventDefault();
        this.props.logout(); 
    }

    render(){
        const { isAuthenticated, user } = this.props.auth ; 

        const userLinks = (
            <ul className="nav navbar-nav navbar-right" >
                <NavLinkLi to="/scrum" icon="trello" title="My Boards" />
                <NavLinkLi to="#" onClick={this.logout.bind(this)} icon="sign-out" title="Sign out" />
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav right" >
                <NavLinkLi to="/signup" icon="user-plus" title="Sign up" />
                <NavLinkLi to="/login" icon="sign-in" title="Sign in" />
            </ul>
        );




        return (
            <div className={classnames('navbar navbar-expand-sm bg-primary navbar-dark', {'navbar-default': !isAuthenticated,'navbar-inverse': isAuthenticated})}>
                <div className="container-custom">
                    <div className="navbar-header">
                        <Link to="/" className='navbar-brand'><i className="fa fa-user-circle fa-3x" aria-hidden="true"></i> </Link>
                    </div>
                </div>

                <div className="container-custom">
                    <div className="navbar-header">
                        <Link to="/" className='navbar-brand'>Scrum Administrator</Link>
                    </div>
                    <div className="navbar-name">{user && user.email}</div>
                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    {isAuthenticated ? userLinks: guestLinks}
                </div>
            </div>
        );
    }
}

NavBarComponent.propTypes = {
    auth: React.PropTypes.object.isRequired , 
    logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(NavBarComponent) ;