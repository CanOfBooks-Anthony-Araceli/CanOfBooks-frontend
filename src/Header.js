import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Login from './Login';
import Logout from './Logout'
import { withAuth0 } from '@auth0/auth0-react';

class Header extends React.Component {
  render() {
    return (
      <Navbar className='header' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{margin:'auto'}}><h1>AL & AG's Book Collection!</h1></Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        {this.props.auth0.isAuthenticated && <NavItem><Link to="/profile" className='nav-link'>Profile</Link></NavItem>}
        {/* PLACEHOLDER: render a navigation link to the about page */}
        {this.props.auth0.isAuthenticated ? <NavItem><Logout/></NavItem> : <NavItem><Login/></NavItem>}
      </Navbar>
    )
  }
}

export default withAuth0(Header);
