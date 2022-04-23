import { NavLink, Link } from "react-router-dom"
import { Navbar, NavbarBrand } from "react-bootstrap"
import Nav from "react-bootstrap/Nav"
import { Container } from "react-bootstrap"

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <NavbarBrand>The Star Wars encyclopedia</NavbarBrand>
                <Nav>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/films">Films</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation