import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const MainNavbar = ({ setViewPage }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#about" onClick={() => setViewPage("About")}>
          About Us
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#book" onClick={() => setViewPage("Calendar")}>
            Book a Session
          </Nav.Link>
          <Nav.Link href="#volunteer" onClick={() => setViewPage("Volunteer")}>
            Volunteer
          </Nav.Link>
          <Nav.Link href="#manager" onClick={() => setViewPage("Manager")}>
            Manager
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
