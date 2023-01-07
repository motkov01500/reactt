import axios from "axios";
import { getLoggedCustomer } from "./auth-http-utils";

const apiUrl = 'http://localhost:3005/vehicles';

export function getVehicles() {
    const loggedCustomer = getLoggedCustomer();

    if (loggedCustomer.isAdmin)
        return axios.get(apiUrl);

    const url = `${apiUrl}?authorId=${loggedCustomer.id}`;
    return axios.get(url);
}

export function getVehicleById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function postVehicle(vehicleObject) {
    if (vehicleObject.id) {
        return axios.put(`${apiUrl}/${vehicleObject.id}`, vehicleObject);
    }

    const loggedCustomer = getLoggedCustomer();
    return axios.post(apiUrl, vehicleObject);
}

export function deleteVehicle(id) {
    return axios.delete(`${apiUrl}/${id}`);
}