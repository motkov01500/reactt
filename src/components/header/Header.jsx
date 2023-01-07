import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getLoggedCustomer } from '../../utils/services/auth-http-utils';

export function Header() {

    const navigate = useNavigate();

    const onLogout = () => {
        logout().then(() => {
            navigate('/login');
        });
    }

    const renderCreateUserLink = () => {
        const loggedCustomer = getLoggedCustomer();

        if (loggedCustomer.isAdmin) {
            return <Link className="nav-link" to="/customers/create">Create customer</Link>
        }
    }

    const renderCreateVehicleLink = () => {
        const loggedCustomer = getLoggedCustomer();

        if (loggedCustomer.isAdmin) {
            return <Link className="nav-link" to="/vehicle/create">Create Vehicle</Link>
        }
    }
    
    const renderRentedVehicles = () => {
        const loggedCustomer = getLoggedCustomer();

        if (!loggedCustomer.isAdmin) {
            return <Link className="nav-link" to="/vehicle/rentedBy">My Rented</Link>
        }
    }

    return (
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" to="/customers">Users</Link>
                            {renderCreateUserLink()}
                            <Link className="nav-link" to="/vehicles">Vehicles</Link>
                            {renderCreateVehicleLink()}
                            {renderRentedVehicles()}
                        </Nav>
                        <Link className="nav-link" onClick={onLogout} > Logout </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}