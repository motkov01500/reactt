import React from 'react'
import { useState } from 'react';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';

import './VehicleCard.css';

export const VehicleCard = (props) => {
    const [rentDays, setRentDays] = useState(1);

    const printUpdateDeleteButtons = () => {
        const loggedCustomer = getLoggedCustomer();
        if (loggedCustomer.isAdmin) {
            {
                return (
                    <>
                        <button id='updateButton' onClick={props.clickUpdate}>update</button>
                        <button id='deleteButton' onClick={props.clickDelete}>delete</button>
                    </>
                )
            }
        }
        else {
            localStorage.setItem('rentDays', rentDays.toString())
            {
                return (
                    <button id='button' onClick={props.clickRent}>Rent</button>
                )
            }
        }
    }

    const onFormChange = (event) => {
        var value = event.target.value
        if (value <= 0 || value > 90) {
            alert("Choose between 1 and 90 days!");
            setRentDays(1);
        } else {
            setRentDays(value);
        }
    }

    const printSelectRentDays = () => {
        return (
            <>
                <form>
                    <input type="number" name="name" max={90} min={1} onChange={onFormChange} value={rentDays} />
                </form>
            </>
        )
    }

    return (
        <div id="fluid-container" data-vehicle-id={props.id}>
            <div>
                <img src={props.picture} />
            </div>
            <div id='container'>
                <div id="propsNames">
                    <h3>Brand</h3>
                    <h3>Model</h3>
                    <h3>Construction Year</h3>
                    <h3>Vehicle Type</h3>
                    <h3>FuelType</h3>
                    <h3>Number of Seats</h3>
                    <h3>Count</h3>
                    <h3>Price Per Day</h3>
                    <h3>Choose rental period: </h3>
                </div>
                <div id="propsValues">
                    <h3>{props.brand}</h3>
                    <h3>{props.model}</h3>
                    <h3>{props.constructionYear}</h3>
                    <h3>{props.vehicleType}</h3>
                    <h3>{props.fuelType}</h3>
                    <h3>{props.numberOfSeats}</h3>
                    <h3>{props.count}</h3>
                    <h3>{props.pricePerDay}</h3>
                    {printSelectRentDays()}
                </div>
            </div>

            {printUpdateDeleteButtons()}
        </div>
    )
}