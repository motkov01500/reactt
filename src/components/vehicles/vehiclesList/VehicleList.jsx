import { useState } from "react";
import { useEffect } from "react";
import { getVehicles, deleteVehicle } from "../../../utils/services/vehiclesUtils";
import { getLoggedCustomer } from "../../../utils/services/auth-http-utils";
import { postRentalEvent, getRentedVehicleById,deleteRentalEventsByVehicleId } from "../../../utils/services/rentalEventUtils";
import './VehicleList.scss';
import { useNavigate } from "react-router";
import { VehicleCard } from "../vehicleCard/VehicleCard";


const wrapperStyles = {
    margin: '20px'
};

export function VehicleList() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [rentevent, SetRentEvent] = useState({});


    useEffect(() => {
        getVehicles().then((response) => {

            setVehicles(response.data);
        });
    }, [])

    //post rentalEvent when the loged user click the "Rent" button
    async function rentSelectedVehicle(vehicle) {
        var date = new Date();
        var newDate = new Date();
        newDate.setDate(newDate.getDate() + 2);
        await postRentalEvent({
            startDateAndTime: date,
            endDateAndTime: newDate,
            vehicle: vehicle.id,
            customer: JSON.parse(localStorage.getItem("loggedUser")).id
        }).then(response => {
            navigate('/vehicles')
        });
    }


    return (
        <div className="vehicleCards">
            {vehicles.map(vehicle => <VehicleCard key={vehicle.id} id={vehicle.id} img={vehicle.picture} brand={vehicle.brand} model={vehicle.model} constructionYear={vehicle.constructionYear} fuelType={vehicle.fuelType} NumberOfSeats={vehicle.NumberOfSeats} count={vehicle.count} clickDelete={() => {
                const loggedCustomer = getLoggedCustomer();
                if (loggedCustomer.isAdmin) {
                    deleteRentalEventsByVehicleId(vehicle.id)
                    deleteVehicle(vehicle.id).then(() => {
                        setVehicles((allVehicles) => {
                            return allVehicles.filter(v => v.id !== vehicle.id);
                        });
                    });
                }
                else {
                    alert("only admins could delete");
                }
            }} clickUpdate={() => {
                const loggedCustomer = getLoggedCustomer();
                if (loggedCustomer.isAdmin) {
                    navigate(`/vehicles/edit/${vehicle.id}`);
                } else {
                    alert("only admins could update");
                }
            }} clickRent={async () => {
                await getRentedVehicleById(vehicle.id).then(response => {
                    if (response != null) {
                        alert(`${vehicle.brand}: "${vehicle.model}" already rent!`)
                    } else {
                        rentSelectedVehicle(vehicle)
                    }
                })
            }
            } />)
            }
        </div>
    );
}