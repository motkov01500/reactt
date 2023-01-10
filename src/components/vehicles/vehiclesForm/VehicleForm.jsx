import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { postVehicle, getVehicleById } from "../../../utils/services/vehiclesUtils";
import { useNavigate, useParams } from "react-router";

import './VechilesForm.scss';
import { useEffect } from "react";

export function VehicleForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [currentVehicle, setCurrentVehicle] = useState({});

    useEffect(() => {
        if (params.id) {
            getVehicleById(params.id).then((response) => {
                setCurrentVehicle(response.data);
            });
        }
    }, [params.id])

    const onFormChange = (event) => {
        setCurrentVehicle((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        postVehicle(currentVehicle).then(() => {
            navigate('/vehicles');
        });
    }

    //here we insert values in the vehicle object
    return (
        <div className="task-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" name="picture" onChange={onFormChange} value={currentVehicle.picture} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" name="brand" onChange={onFormChange} value={currentVehicle.brand} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="model" onChange={onFormChange} value={currentVehicle.model} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Vehicle Type</Form.Label>
                    <Form.Select name="vehicleType" onChange={onFormChange} value={currentVehicle.vehicleType}>
                        <option value="Estate">Estate</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Economy">Economy</option>
                        <option value="SUV">SUV</option>
                        <option value="Cargo">Cargo</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select name="fuelType" onChange={onFormChange} value={currentVehicle.fuelType}>
                        <option value="petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Construction Year</Form.Label>
                    <Form.Control type="number" name="constructionYear" onChange={onFormChange} value={currentVehicle.constructionYear} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Number Of Seats</Form.Label>
                    <Form.Control type="number" name="numberOfSeats" onChange={onFormChange} value={currentVehicle.numberOfSeats} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Count</Form.Label>
                    <Form.Control type="number" min={1} max={5} name="count" onChange={onFormChange} value={currentVehicle.count} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price per day</Form.Label>
                    <Form.Control type="number" name="pricePerDay" onChange={onFormChange} value={currentVehicle.pricePerDay} />
                </Form.Group>
                <Button type="submit">Save</Button>
            </Form>
        </div>
    );
}