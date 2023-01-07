import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { postCustomer, getCustomerById } from '../../../utils/services/customerUtils';
import { useNavigate, useParams, Navigate } from 'react-router';
import { useEffect } from 'react';

import './CustomerForm.scss';
import { parseBool } from '../../../utils/services/boolUtils';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';

export function CustomerForm() {
    const emptyCustomer = {
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        isAdmin: false
    };
    const [currentCustomer, setCurrentCustomer] = useState(emptyCustomer);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getCustomerById(params.id)
                .then((response) => {
                    setCurrentCustomer(response.data);
                })
        } else {
            setCurrentCustomer(emptyCustomer);
        }
    }, [params.id]);

    const onFormControlChange = (event) => {
       const target = event.target;
       let prop = 'value';
        setCurrentCustomer((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target[prop]
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        postCustomer(currentCustomer).then(() => {
            navigate('/customers');
        }).catch(error => {
            setError(error.message);
        });
    }

  //  const renderIsAdminControl = () => {
  //      const loggedCustomer = getLoggedCustomer();
//
  //      if (!loggedCustomer || !loggedCustomer.isAdmin || loggedCustomer.id === currentCustomer.id)
  //          return '';
//
  //      return <Form.Group className="mb-3" controlId="formBasicEmail">
  //          <Form.Label>Is Admin</Form.Label>
  //          <Form.Check name="isAdmin" onChange={onCheckboxChange} checked={parseBool(currentCustomer.isAdmin)} />
  //      </Form.Group>
  //  }

    const navigateIfNotAdmin = () => {
        const loggedCustomer = getLoggedCustomer();

        if (loggedCustomer && !loggedCustomer.isAdmin)
            return <Navigate to='/customers' />
    }

    return (
        <div className="user-form-wrapper">
            {navigateIfNotAdmin()}
            <Form className="user-form" onSubmit={onSubmit}>
                <span className="text-danger">{error}</span>
                <Form.Group className="mb-3" controlId='formBasicName'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" name="fullName" placeholder="Enter full name" onChange={onFormControlChange} value={currentCustomer.fullName} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email" onChange={onFormControlChange} value={currentCustomer.email} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId='formBasicPhone'>
                    <Form.Label>phone Number</Form.Label>
                    <Form.Control type="phone" name="phone" placeholder="Enter Phone number" onChange={onFormControlChange} value={currentCustomer.phoneNumber} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={onFormControlChange} value={currentCustomer.password} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}