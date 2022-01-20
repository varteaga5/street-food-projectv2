import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const NavBar = ({ setUser, userIsVendor }) => {
  const [active, setActive] = useState("default");

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  let userType;
  const vendorType = (
    <>
      <Nav.Link as={Link} to="/">
        My Profile
      </Nav.Link>
      <Nav.Link as={Link} to="/VendMenuList">
        My Menu
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </>
  );
  const custType = (
    <>
      <Nav.Link as={Link} to="/">
        Browse Vendors
      </Nav.Link>
      <Nav.Link as={Link} to="/FavList">
        My Favorite Vendors
      </Nav.Link>
      <Nav.Link as={Link} to="/CustProfile">
        My Profile
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </>
  );
  userIsVendor ? (userType = vendorType) : (userType = custType);

  return (
    <Navbar
      autoclose="outside"
      sticky="top"
      bg="dark"
      variant="dark"
      expand="lg"
      activeKey={active}
      onSelect={(selectedKey) => setActive(selectedKey)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Street Food
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">{userType}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
