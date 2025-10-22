import React from 'react';
import {Nav,Navbar, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert("Logged out successfully");
        navigate("/");
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="me-auto">

                    {role === "admin" ?(
                        <Nav.Link href="/admin">Admin Dashboard</Nav.Link>
                    ) : role === "seller" ? (
                        <Nav.Link href="/seller">Seller Dashboard</Nav.Link>
                    ) : (
                        <Nav.Link href="/"></Nav.Link>)
                    }

                </Nav>
                <Nav className="ms-auto">
                    {!token ? (
                        <Nav.Link href="/login">Login</Nav.Link>
                    ) : (
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;