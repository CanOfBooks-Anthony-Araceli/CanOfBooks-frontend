import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar className='footer' collapseOnSelect expand="lg">
        <Navbar.Brand style={{margin:'auto'}}>Anthony Lopez &amp; Araceli Garcia 2023 &copy;</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
