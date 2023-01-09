import React from 'react'
import './RentedVehicleCard.scss';

export const RentedVehicleCard = (props) => {

    const printUpdateDeleteButtons = () => {

        return (<div id="buttons">
            <button onClick={props.clickReturn}>Return</button>
        </div>)
    }

    return (
        <div id="fluid-container" data-vehicle-id={props.id}>
            <div>
                <img src={props.img} />
            </div>
            <div id='container'>
                <div id="propsNames">
                    <h3>Brand</h3>
                    <h3>Model</h3>
                    <h3>ConstructionYear</h3>
                    <h3>FuelType</h3>
                    <h3>NumberOfSeats</h3>
                    <h3>Count</h3>
                </div>
                <div id="propsValues">
                    <h3>{props.brand}</h3>
                    <h3>{props.model}</h3>
                    <h3>{props.constructionYear}</h3>
                    <h3>{props.fuelType}</h3>
                    <h3>{props.NumberOfSeats}</h3>
                    <h3>{props.count}</h3>
                </div>
            </div>
            {printUpdateDeleteButtons()}
        </div>
    )
}