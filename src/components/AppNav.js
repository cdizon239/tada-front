import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export const AppNav = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Tada</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
            <Nav.Link href="#">Todos Today</Nav.Link>
              <Nav.Link href="#">Bucket</Nav.Link>
              <NavDropdown title={'Rencel'} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Rencel</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
