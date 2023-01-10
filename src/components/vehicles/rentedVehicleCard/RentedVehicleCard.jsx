import React, { useState } from 'react'
import axios from 'axios';
import './RentedVehicleCard.scss';
import { getRentalEventByVehicleId, getRentalEventByVehicleId1 } from '../../../utils/services/rentalEventUtils'
import { useEffect } from 'react';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';

export const RentedVehicleCard = (props) => {
    var [rentDays, setRentDays] = useState();
    var [discount, setDiscount] = useState();
    var [totalPrice, setTotalPrice] = useState();

    useEffect( () => {
       const loadData = async ()=>{
       var a = await getRentalEventByVehicleId(props.id);
        setRentDays(a.rentDays);
        setDiscount(a.discount);
        setTotalPrice(a.totalPrice);
       } 
       loadData()
    }, [])

    const printReturnButton = () => {

        return (<div id="returnButton">
            <button onClick={props.clickReturn}>Return</button>
        </div>)
    }

    const onFormChange = (event) => {
        setCurrentVehicle((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
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
                    <h3>Price Per Day</h3>
                    <h3>Rent Days</h3>
                    <h3>Discount</h3>
                </div>
                <div id="propsValues">
                    <h3>{props.brand}</h3>
                    <h3>{props.model}</h3>
                    <h3>{props.constructionYear}</h3>
                    <h3>{props.vehicleType}</h3>
                    <h3>{props.fuelType}</h3>
                    <h3>{props.numberOfSeats}</h3>
                    <h3>{props.pricePerDay}</h3>
                    {/* {setRentalEventInfo()} */}
                    <h3>{rentDays}</h3>
                    <h3>{discount}%</h3>
                </div>
            </div>

            <h3>Total Price: {totalPrice}</h3>
            {printReturnButton()}
        </div>
    )
}