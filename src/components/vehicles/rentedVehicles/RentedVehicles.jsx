import React,{useState,useEffect} from 'react'
import {getRentedVehicles,maikati} from '../../../utils/services/rentalEventUtils'
import { getVehicleById } from '../../../utils/services/vehiclesUtils';
import {VehicleList} from "../vehiclesList/VehicleList"
import { VehicleCard } from '../vehicleCard/VehicleCard';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';
export const RentedVehicles = () => {
  const loggedCustomer = getLoggedCustomer();
  const [currentVehicle,setCurrentVehicle] = useState([]);

console.log(maikati());

return (
<div className="vehicleCards">
    <VehicleCard key={cars[0].id} id={cars[0].id} img={cars[0].picture} brand={cars[0].brand} model={cars[0].model} constructionYear={cars[0].constructionYear} fuelType={cars[0].fuelType} NumberOfSeats={cars[0].NumberOfSeats} count={cars[0].count}/>
    </div>
)
}


// localStorage.getItem('rentCars').split(',').forEach(x=>{
//   if(x!= '' || x!= undefined || x!= null){
//     getVehicleById(x).then(car=>{
//       setCurrentVehicle(car.data)
//     })}
// })