import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';
import { Link } from 'react-router-dom';

export function CustomerCard({ customer, onDelete }) {

    const navigate = useNavigate();

    const onDeleteClicked = () => {
        onDelete(customer.id);
    }

    const navigateToUpdate = () => {
        navigate(`edit/${customer.id}`);
    }

    const renderActionButtons = () => {
        const LoggedCustomer = getLoggedCustomer();

        if (LoggedCustomer.isAdmin && LoggedCustomer.id !== customer.id) {
            return <>
                <Card.Link onClick={navigateToUpdate} >Update</Card.Link>
                <Card.Link onClick={onDeleteClicked}>Delete</Card.Link>
            </>
        }

        if (LoggedCustomer.id === customer.id) {
            return <Card.Link onClick={navigateToUpdate} >Update</Card.Link>;
        }
    }

    return (
        <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Body>
                <Card.Title>
                    <Link to={`/profile/${customer.id}`}>
                        {customer.fullName}
                    </Link>
                </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Email: {customer.email} </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                {renderActionButtons()}
            </Card.Body>
        </Card>
    );
}