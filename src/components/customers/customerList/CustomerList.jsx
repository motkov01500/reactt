import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../../../utils/services/customerUtils";
import { CustomerCard } from "../customerCard/CustomerCard";

export function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers()
            .then((response) => {
                setCustomers(response.data);
            });
    }, []);

    const onDelete = (id) => {
        deleteCustomer(id).then(() => {
            setCustomers((prevState) => {
                return prevState.filter(customer => customer.id !== id);
            });
        });
    }

    return (
        <div className="users-list" style={{ display: 'flex' }}>
            {customers.map(customer => <CustomerCard key={customer.id} customer={customer} onDelete={onDelete} />)}
        </div>
    );
}