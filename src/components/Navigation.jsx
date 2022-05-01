import { NavLink, Link } from "react-router-dom"
import { Navbar, NavbarBrand } from "react-bootstrap"
import Nav from "react-bootstrap/Nav"
import { Container } from "react-bootstrap"

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container fluid>
                <NavbarBrand as={Link} to="/">The Star Wars encyclopedia</NavbarBrand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" /> 
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/films">Films</Nav.Link>
                        <Nav.Link as={NavLink} to="/people">Characters</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation