const { getTrips, getDriver, getVehicle } = require("api");
/**
 * This function should return the data for drivers in the specified format
 *
 * Question 4
 *
 * @returns {any} Driver report data
 */
async function driverReport() {
  // This is how the result should be  
  const output = [];
  let personObj = {
    fullname: "",
    phone: "",
    id: "",
    vehicles: [],
    noOfTrips: 0,
    noOfCashTrips: 0,
    noOfNonCashTrips: 0,
    trips: [],
    totalAmountEarned: 0,
    totalCashAmount: 0,
    totalNonCashAmount: 0,
  };
  let personVehicle = {
    plate: "",
    manufacturer: "",
  };
  let personTrip = {
    user: "",
    created: "",
    pickup: "",
    destination: "",
    billed: 0,
    isCash: false,
  };
  const allTrips = await getTrips();
  const randomDriver = {};
  // Gets all the details of the driver using  Promise.allSettled
  await Promise.allSettled(
    allTrips.map((e) =>
      getDriver(e.driverID)
        .then((result) => (randomDriver[e.driverID] = result))
        .then(() => (randomDriver[e.driverID]["vehicle"] = []))
    )
  );
  // Getting the driver's vehicle details
  for (const key in randomDriver) {
    if (randomDriver[key].vehicleID.length > 1) {
      for (let n = 0; n < randomDriver[key].vehicleID.length; n++) {
        const vehicle = await getVehicle(randomDriver[key].vehicleID[n]);
        randomDriver[key]["vehicle"].push(vehicle);
      }
    } else {
      const vehicle = await getVehicle(randomDriver[key].vehicleID);
      randomDriver[key]["vehicle"].push(vehicle);
    }
  }
  // Sorting all  drivers 
  allDrivers = {};
  let keys = [];
  allTrips.forEach((trip) => {
    keys.push(trip.driverID);
  });
  keys = [...new Set(keys)];

  
  for (const id of keys) {
    if (id in randomDriver) allDrivers[id] = randomDriver[id];
  }

// Convert into astring and then a number
  const PersonObjTemplate = JSON.parse(JSON.stringify(personObj));
  const PersonVehicleTemplate = JSON.parse(JSON.stringify(personVehicle));
  const PersonTripTemplate = JSON.parse(JSON.stringify(personTrip));
  
  
  for (const id in allDrivers) {
    for (let trip of allTrips) {
      if (id === trip.driverID) {
        // convert billamount to number and relace removes every comma
        personObj.totalAmountEarned += Number(trip.billedAmount) || Number(trip.billedAmount.replace(",", ""));
        personObj.noOfTrips++;
        personObj.id = id;
        personObj.fullname = allDrivers[id].name;
        personObj.phone = allDrivers[id].phone;
        if (trip.isCash === true) {
          personObj.totalCashAmount +=
            Number(trip.billedAmount) ||
            Number(trip.billedAmount.replace(",", ""));
          personObj.noOfCashTrips++;
        } else {
          personObj.totalNonCashAmount +=
            Number(trip.billedAmount) ||
            Number(trip.billedAmount.replace(",", ""));
          personObj.noOfNonCashTrips++;
        }
        personTrip.user = trip.user.name;
        personTrip.created = trip.created;
        personTrip.pickup = trip.pickup.address;
        personTrip.destination = trip.destination.address;
        personTrip.isCash = trip.isCash;
        personTrip.billed =
          Number(trip.billedAmount) ||
          Number(trip.billedAmount.replace(",", ""));
        personObj.trips.push(personTrip);
        personTrip = JSON.parse(JSON.stringify(PersonTripTemplate));
      }
    }
    personObj.totalAmountEarned = Number(
      personObj.totalAmountEarned.toFixed(2)
    );
    personObj.totalCashAmount = Number(personObj.totalCashAmount.toFixed(2));
    personObj.totalNonCashAmount = Number(
      personObj.totalNonCashAmount.toFixed(2)
    );
    output.push(personObj);
    personObj = JSON.parse(JSON.stringify(PersonObjTemplate));
  }
  
  for (let driver of output) {
    const id = driver.id;
    for (const key in allDrivers[id].vehicle) {
      personVehicle.plate = allDrivers[id].vehicle[key].plate;
      personVehicle.manufacturer = allDrivers[id].vehicle[key].manufacturer;
      driver.vehicles.push(personVehicle);
      personVehicle = JSON.parse(JSON.stringify(PersonVehicleTemplate));
    }
  }
  return output;
}
module.exports = driverReport;
driverReport();
















