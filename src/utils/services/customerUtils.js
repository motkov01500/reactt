import axios from 'axios';

const apiUrl = 'http://localhost:3005/customers';

export function getCustomers() {
    return axios.get(apiUrl);
}

export function getCustomerById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export async function postCustomer(customerObj) {

    const response = await getCustomers();
    const customers = response.data;
    const existingCustomer = customers.find(u => u.email === customerObj.email && u.id != customerObj.id);

    if (existingCustomer) {
        throw new Error('Email already taken.');
    }

    if (customerObj.id) {
        return axios.put(`${apiUrl}/${customerObj.id}`, customerObj).then(() => {
        });
    }
    return axios.post(apiUrl, customerObj);
}

export function deleteCustomer(id) {
    return axios.delete(`${apiUrl}/${id}`);
}