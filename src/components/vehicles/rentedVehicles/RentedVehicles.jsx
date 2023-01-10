import React, { useState, useEffect } from 'react'
import { getRentedVehiclesByUserId, getRentalEventsByUserId, getRentalEventByVehicleId } from '../../../utils/services/rentalEventUtils'
import { getVehicleById, postVehicle } from '../../../utils/services/vehiclesUtils';
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

  const getDiscount = () => {
    return getRentalEventByVehicleId(vehicle.id)
  }

  return (
    <div className="vehicleCards1">
      {
        rentedVehiclesByUserId.map(vehicle =>

          <RentedVehicleCard
            key={vehicle.id} id={vehicle.id}
            picture={vehicle.picture}
            brand={vehicle.brand}
            model={vehicle.model}
            constructionYear={vehicle.constructionYear}
            vehicleType={vehicle.vehicleType}
            fuelType={vehicle.fuelType}
            numberOfSeats={vehicle.numberOfSeats}
            pricePerDay={vehicle.pricePerDay}
            clickReturn={async () => {
              await deleteRentalEvent(vehicle).then(() => {
                vehicle.count++
                postVehicle(vehicle)

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