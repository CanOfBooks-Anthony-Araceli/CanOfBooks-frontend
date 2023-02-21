import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar className='header' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{margin:'auto'}}><h1>AL & AG's Book Collection!</h1></Navbar.Brand>
        {/* <NavItem><Link to="/" className="nav-link">Home</Link></NavItem> */}
        {/* PLACEHOLDER: render a navigation link to the about page */}
      </Navbar>
    )
  }
}

export default Header;
