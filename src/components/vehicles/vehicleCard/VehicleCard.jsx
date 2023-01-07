import React from 'react'
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';

import './VehicleCard.css';

export const VehicleCard = (props) => {
    const loggedCustomer = getLoggedCustomer();
    const printUpdateDeleteButtons = ()=>{
            const loggedCustomer = getLoggedCustomer();
            if(loggedCustomer.isAdmin){{            
            return (<div id="buttons">
            <button onClick={props.clickUpdate}>update</button>
            <button onClick={props.clickDelete}>delete</button>
                </div>)
        }
    }
    else{{
        return (<button onClick={props.clickRent}>Rent</button>)
    }}
}


  return (
    <div id="fluid-container" data-vehicle-id={props.id}>
        <div>
            <img src={props.img}/>
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