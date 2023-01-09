import React, { useState, useEffect } from 'react'
import { getRentedVehiclesByUserId, getRentalEventsByUserId } from '../../../utils/services/rentalEventUtils'
import { getVehicleById } from '../../../utils/services/vehiclesUtils';
import { VehicleList } from "../vehiclesList/VehicleList"
import { RentedVehicleCard } from '../rentedVehicleCard/RentedVehicleCard';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';
import { deleteRentalEvent } from '../../../utils/services/rentalEventUtils';

export function RentedVehicles() {
  const loggedCustomer = getLoggedCustomer();
  const [rentedVehiclesByUserId, setRentedVehiclesByUserId] = useState([]);

  useEffect(() => {

    getRentedVehiclesByUserId().then(response => {
      setRentedVehiclesByUserId(response)
    });

  }, []);

  return (
    <div className="vehicleCards1">
      {
        rentedVehiclesByUserId.map(vehicle => <RentedVehicleCard key={vehicle.id} id={vehicle.id} img={vehicle.picture} brand={vehicle.brand} model={vehicle.model} constructionYear={vehicle.constructionYear} fuelType={vehicle.fuelType} NumberOfSeats={vehicle.NumberOfSeats} count={vehicle.count}
          clickReturn={async () => {
            await deleteRentalEvent(vehicle).then(() => {

              setRentedVehiclesByUserId((allRentedVehicles) => {
                return allRentedVehicles.filter(v => v.id !== vehicle.id);
              });
            })
          }}
        />)
      }
    </div>
  )
}