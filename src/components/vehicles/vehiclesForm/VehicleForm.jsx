import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { postVehicle,getVehicleById } from "../../../utils/services/vehiclesUtils";
import { useNavigate, useParams } from "react-router";

import './VechilesForm.scss';
import { useEffect } from "react";

export function VehicleForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [currentVechile, setCurrentVechile] = useState({});

    useEffect(() => {
        if (params.id) {
            getVehicleById(params.id).then((response) => {
                setCurrentVechile(response.data);
            });
        }
    }, [params.id])

    const onFormChange = (event) => {
        setCurrentVechile((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        postVehicle(currentVechile).then(() => {
            navigate('/vehicles');
        });
    }

    return (
        <div className="task-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" name="image" onChange={onFormChange} value={currentVechile.picture} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" name="brand" onChange={onFormChange} value={currentVechile.brand} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="model" onChange={onFormChange} value={currentVechile.model} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select name="fuelType" onChange={onFormChange} value={currentVechile.fuelType}>
                        <option value="petrol">Petrol</option>
                        <option value="Diesel" >Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Construction Year</Form.Label>
                    <Form.Control type="number" name="date" onChange={onFormChange} value={currentVechile.constructionYear} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Number Of Seats</Form.Label>
                    <Form.Control type="number" name="numberOfSeats" onChange={onFormChange} value={currentVechile.NumberOfSeats} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Count</Form.Label>
                    <Form.Control type="number" name="countOfCars" onChange={onFormChange} value={currentVechile.count} />
                </Form.Group>
                <Button type="submit">Save</Button>
            </Form>
        </div>
    );
}