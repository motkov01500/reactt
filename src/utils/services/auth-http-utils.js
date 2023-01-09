import { getCustomers} from './customerUtils.js';
import { parseBool } from "./boolUtils";

export function getLoggedCustomer() {
    const customer = JSON.parse(localStorage.getItem('loggedUser'));
    if (customer)
    customer.isAdmin = parseBool(customer.isAdmin);

    return customer;

}

export async function login(loginCreds) {
    const customers = (await getCustomers()).data;

    const foundCustomer = [...customers]
        .find(customer => customer.email === loginCreds.email && customer.password === loginCreds.password);

        localStorage.setItem('loggedUser', JSON.stringify(foundCustomer));

    if (!foundCustomer) {
        throw new Error('Invalid email/password');
    }
    localStorage.setItem('loggedUser', JSON.stringify(foundCustomer));
    
    return foundCustomer;

}

export function logout() {
    return new Promise((resolve) => {
        localStorage.removeItem('loggedUser');
        resolve();
    });
}