import { useState } from "react";
import { useEffect } from "react";
import { getVehicles, deleteVehicle, postVehicle } from "../../../utils/services/vehiclesUtils";
import { getLoggedCustomer } from "../../../utils/services/auth-http-utils";
import { postRentalEvent, getRentedVehicleById, deleteRentalEventsByVehicleId, getRentalEventsByUserId } from "../../../utils/services/rentalEventUtils";
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
    var counter = 0;

    useEffect(() => {
        getVehicles().then((response) => {

            var arr = [];
            arr = response.data;

            arr.forEach(x => {
                if (x.count == 0) {
                    var index = arr.indexOf(x);
                    arr.splice(index, 1);
                }
            })

            setVehicles(arr);
        });
    }, [])

    //post rentalEvent when the loged user click the "Rent" button
    async function rentSelectedVehicle(vehicle) {
        var sumPerDays;
        var totalSum;
        var discountPercentage = 0;
        var days = +(localStorage.getItem('rentDays'));
        sumPerDays = +(vehicle.pricePerDay) * days;

        var rentalEvents = []
        await getRentalEventsByUserId(getLoggedCustomer().id).then(response => {
            rentalEvents = [...response][0]
        })

        // More than 3 days - 5% discount
        // More than 5 days - 7% discount
        // More than 10 days - 10% discount
        // More than 3 times in the last 60 days - 15% discount
        function between(x, min, max) {
            return x > min && x <= max;
        }

        if (rentalEvents.length > 3) {
            rentalEvents.forEach(x => {
                if (counter <= 3) {
                    var substract;
                    var currentDate = new Date()
                    var startDate = new Date(x.startDateAndTime)
                    var dif = Math.abs(currentDate - startDate)
                    substract = dif / (1000 * 3600 * 24)
                    if (substract < 60) {
                        counter++
                        // console.log(counter)
                    }
                }
            })
            if(counter > 3){
                discountPercentage = 15;
                totalSum = sumPerDays - sumPerDays * (discountPercentage / 100);
            }

        } else {
            if (days < 4) {
                totalSum = sumPerDays;
            }

            if (between(days, 3, 5)) {
                discountPercentage = 5;
                totalSum = sumPerDays - sumPerDays * (discountPercentage / 100);
            }
            if (between(days, 5, 10)) {
                discountPercentage = 7;
                totalSum = sumPerDays - sumPerDays * (discountPercentage / 100);
            }
            if (between(days, 10, 90)) {
                discountPercentage = 10;
                totalSum = sumPerDays - sumPerDays * (discountPercentage / 100);
            }
        }
        var date = new Date();
        var newDate = new Date();
        newDate.setDate(date.getDate() + days);
        await postRentalEvent({
            startDateAndTime: date,
            endDateAndTime: newDate,
            vehicle: vehicle.id,
            customer: JSON.parse(localStorage.getItem("loggedUser")).id,
            rentDays: days,
            discount: discountPercentage,
            totalPrice: totalSum
        }).then(response => {
            navigate('/vehicles')
        });
    }

    return (
        <div className="vehicleCards">
            {vehicles.map(vehicle => <VehicleCard
                key={vehicle.id}
                id={vehicle.id}
                picture={vehicle.picture}
                brand={vehicle.brand}
                model={vehicle.model}
                constructionYear={vehicle.constructionYear}
                vehicleType={vehicle.vehicleType}
                fuelType={vehicle.fuelType}
                numberOfSeats={vehicle.numberOfSeats}
                count={vehicle.count}
                pricePerDay={vehicle.pricePerDay}
                clickDelete={() => {
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
                            alert(`${vehicle.brand}: "${vehicle.model}" already rent!`);
                        } else {
                            vehicle.count--;
                            if (vehicle.count == 0) {
                                var index = vehicles.indexOf(vehicle);
                                vehicles.splice(index, 1);
                            }
                            postVehicle(vehicle);
                            rentSelectedVehicle(vehicle);
                        }
                    })
                    localStorage.removeItem('rentDays');
                }
                } />)
            }
        </div>
    );
}