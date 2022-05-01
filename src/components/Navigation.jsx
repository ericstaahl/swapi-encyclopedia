import { NavLink, Link, useNavigate } from "react-router-dom"
import { Navbar, NavbarBrand, Button } from "react-bootstrap"
import Nav from "react-bootstrap/Nav"
import { Container } from "react-bootstrap"

const Navigation = () => {
    const navigate = useNavigate()

    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <NavbarBrand as={Link} to="/">The Star Wars encyclopedia</NavbarBrand>
                <Button onClick={() => navigate(-1)}>Back</Button>
                <Nav>
                    <Nav.Link as={NavLink} to="/films">Films</Nav.Link>
                    <Nav.Link as={NavLink} to="/people">Characters</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation