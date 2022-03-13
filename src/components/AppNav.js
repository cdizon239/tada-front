import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import {ThemeContext} from 'styled-components'
import { useNavigate } from "react-router-dom";

export const AppNav = () => {
  const theme = useContext(ThemeContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    fetch(process.env.REACT_APP_BACKEND_URL+'sessions/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, 
      credentials: 'include'
    })
    navigate('/')
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg={theme.background} variant="light">
        <Container>
        <Navbar.Brand href="/todos" id='logoTitle'>ta-dah</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ borderColor: 'none'}} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/todos">Todo</Nav.Link>
              <Nav.Link href="/tadas">Tada</Nav.Link>
              <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
              {/* <Nav.Link href="/logout">Logout</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
