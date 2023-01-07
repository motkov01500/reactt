import axios from 'axios';
import { getLoggedCustomer } from './auth-http-utils';
import {getVehicleById} from './vehiclesUtils';

const apiUrl = 'http://localhost:3005/rentalEvent';

export async function getRentedVehicles(){
    const loggedCustomer = getLoggedCustomer();
    const carsRented =[];
    await axios.get(`${apiUrl}`).then(x=>{
        carsRented.push([...x.data].filter(x=>x.customer == loggedCustomer.id));
    });
    return carsRented;
}

export function maikati(){    
    var cars = [];
  getRentedVehicles().then(ev=>{
    ev[0].forEach(eve=>{
        getVehicleById(eve.vehicle).then(car=>{
        cars.push(car.data);
      })
    })
   })
   return cars;
}

export async function postRentalEvent(RentalEventObj) {
    return axios.post(apiUrl, RentalEventObj);
}


// export async function getRentedVehicles(){
//     const loggedCustomer = getLoggedCustomer();
//     const rentedEvents =[];
//     const carRented = [];
//     await axios.get(`${apiUrl}`).then(x=>{
//         rentedEvents.push([...x.data].filter(x=>x.customer == loggedCustomer.id));
//     });
    
//     [...rentedEvents[0]].forEach(ev=>{
//         carRented.push(ev.vehicle);
//     })
//     return carRented;
// }

// export function maikati(){
//     var cars = [];
//   getRentedVehicles().then(ev=>{
//     ev[0].forEach(eve=>{
//     //console.log(eve.vehicle);
//       getVehicleById(eve.vehicle).then(car=>{
//         cars.push(car.data);
//       })
//     })
//    })
//    return cars;

// getRentedVehicles().then(vehicle=>{
//     getVehicleById(vehicle).then(x=>{
//         cars.push(x);
//     })
// })
// return cars;