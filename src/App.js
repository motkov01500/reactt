import './App.scss';
import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router';
import { CustomerList } from './components/customers/customerList/CustomerList';
import { CustomerForm } from './components/customers/customerForm/CustomerForm';
import { Login } from './components/auth/login/Login';
import { NonAuthenticatedRoute } from './utils/guards/NonAuthenticatedRoute';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { Register } from './components/auth/register/Register';
import { VehicleForm } from './components/vehicles/vehiclesForm/VehicleForm';
import { VehicleList } from './components/vehicles/vehiclesList/VehicleList';
import {RentedVehicles} from './components/vehicles/rentedVehicles/RentedVehicles';
// import {RentedVehicleCard} from './components/vehicles/rentedVehicleCard//rentedVehicleCard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<NonAuthenticatedRoute> <Login /> </NonAuthenticatedRoute>} />
        <Route path="/register" element={<NonAuthenticatedRoute> <Register /> </NonAuthenticatedRoute>} />
        <Route path="/" element={<AuthenticatedRoute> <Layout /> </AuthenticatedRoute>} >
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/create" element={<CustomerForm />} />
          <Route path="customers/edit/:id" element={<CustomerForm />} />
          <Route path="vehicles" element={<VehicleList />} />
          <Route path="vehicle/create" element={<VehicleForm />} />
          <Route path="vehicles/edit/:id" element={<VehicleForm />} />
          <Route path="/vehicle/rentedBy" element={<RentedVehicles/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
