import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React from 'react';
import { Outlet, Link } from "react-router-dom";
import logo from '../../images/Logo1.png';
import './BarraNav.css';


function NavScrollExample({ onSearch }) {

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  // Obtener el ID de usuario logueado
  const userId = sessionStorage.getItem('id');


  // Función para cerrar sesión
  function onLogOut() {
    sessionStorage.clear(); // Limpiar sesión
    window.location.assign('/lugares'); // Redirigir a la página de lugares
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <img className="imagenn" src={logo} alt='logo' />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link className='link-router nav-link' to="/inicio">Inicio</Link>
              <Link className='link-router nav-link' to="/lugares">Lugares</Link>
              <Link className='link-router nav-link' to="/objetos">Objetos</Link>
              {userId ? (
                <NavDropdown className='link-router' title='Mi Perfil' id="navbarScrollingDropdown">
                  <NavDropdown.Item ><Link className='link-router' to={"/usuario/" + userId}>Mi perfil</Link></NavDropdown.Item>
                  <NavDropdown.Item href="#action5">
                    <Nav.Link className='link-router' onClick={onLogOut}>Cerrar sesión</Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link className='link-router nav-link' to="/login">Iniciar sesión</Link>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Explora lugares"
                className="me-2"
                aria-label="Search"
                onChange={handleSearchChange}
              />
              <Button variant="primary">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}


export default NavScrollExample;