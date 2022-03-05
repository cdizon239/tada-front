import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import {ThemeContext} from 'styled-components'

export const AppNav = () => {
  const theme = useContext(ThemeContext)
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg={theme.background} variant="light">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ borderColor: 'none'}} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#">Todo</Nav.Link>
              <Nav.Link href="#">Types to do</Nav.Link>
              <Nav.Link href="#">Tada</Nav.Link>
              <NavDropdown title={"Profile"} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Brand href="#home" id='logoTitle'>ta-dah</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};
