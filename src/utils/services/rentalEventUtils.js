import axios from 'axios';
import { useState } from 'react';
import { getLoggedCustomer } from './auth-http-utils';
import { getVehicleById, getVehicles } from './vehiclesUtils';

const apiUrl = 'http://localhost:3005/rentalEvent';

export async function getRentalEvents(){
    return axios.get(`${apiUrl}`)
}

//returns all rentalEvents created by the loged user
export async function getRentalEventsByUserId() {
    const loggedCustomer = getLoggedCustomer();
    var rentedVehicles = [];
    await axios.get(`${apiUrl}`).then((x) => {

        rentedVehicles.push([...x.data].filter(x => x.customer == loggedCustomer.id));
    });
    return rentedVehicles;
}

//returns all vehicles (rented by the loged user) in order to map them to 'RentedVehicleCard'
export async function getRentedVehiclesByUserId() {
    var rentalEventsByUserId = [];
    var rentedVehiclesByUserId = [];

    await getRentalEventsByUserId().then(response => {
        response.forEach(element => {
            for (let x in element) {
                rentalEventsByUserId.push(element[x]);
            }
        });
    });

    await getVehicles().then(response => {
        var cars = [];
        response.data.forEach(x => {
            cars.push(x);
        });

        for (let y = 0; y < rentalEventsByUserId.length; y++) {
            for (let i = 0; i < cars.length; i++) {
                if (rentalEventsByUserId[y].vehicle == cars[i].id) {
                    rentedVehiclesByUserId.push(cars[i]);
                }
            }
        }
    })
    return rentedVehiclesByUserId;
}

export async function getRentedVehicleById(id) {

    var vehicle;
    await getRentedVehiclesByUserId().then(response => {

        vehicle = [...response].find(x =>
            x.id == id
        )
    })
    return vehicle;
}

export async function postRentalEvent(RentalEventObj) {
    return axios.post(apiUrl, RentalEventObj);
}

export async function deleteRentalEventById(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export async function deleteRentalEvent(vehicleObj) {
    var rentalEvent;
    await getRentalEventsByUserId().then(response => {
        rentalEvent = response[0].find(x =>
            x.vehicle == vehicleObj.id
        )
    })
    await deleteRentalEventById(rentalEvent.id)
}

export function deleteRentalEventsByVehicleId(vehicleId){
    getRentalEvents().then(x=>{
    x.data.forEach(y=>{
        if(y.vehicle == vehicleId){
            deleteRentalEventById(y.id)
        }
    })
   })
}

export function deleteRentalEventsByUserId(userId){
    getRentalEvents().then(x=>{
    x.data.forEach(y=>{
        if(y.customer == userId){
            deleteRentalEventById(y.id)
        }
    })
   })
}