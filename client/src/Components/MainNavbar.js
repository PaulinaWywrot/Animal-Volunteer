import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const MainNavbar = ({ viewPage, setViewPage }) => {
  const handleNavbarBrandClick = () => {
    setViewPage("About");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#about" onClick={handleNavbarBrandClick}>
          About Us
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            href="#book"
            onClick={() => setViewPage("Calendar")}
            active={viewPage === "Calendar"}
          >
            Book a Session
          </Nav.Link>
          <Nav.Link
            href="#volunteer"
            onClick={() => setViewPage("Volunteer")}
            active={viewPage === "Volunteer"}
          >
            Volunteer
          </Nav.Link>
          <Nav.Link
            href="#manager"
            onClick={() => setViewPage("Manager")}
            active={viewPage === "Manager"}
          >
            Manager
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
