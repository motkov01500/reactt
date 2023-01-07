import { getLoggedCustomer } from "../services/auth-http-utils";
import { useNavigate, Navigate } from "react-router";
import { CustomerList } from "../../components/customers/customerList/CustomerList";

export function NonAuthenticatedRoute({ children }) {
    const customer = getLoggedCustomer();

    if (customer) {
        return <Navigate to="/customers" />;
    }

    return children;
}