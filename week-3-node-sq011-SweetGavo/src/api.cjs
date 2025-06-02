const fs = require('fs').promises; 
const path = require('path');



async function getTrips() {
  const data = await fs.readFile(path.join(__dirname, '../fixtures/report.json'), 'utf8');
  const drivers = JSON.parse(data);
  console.log(drivers.map(driver => driver.trips));
}


async function getDriver(driverId) {
  const data = await fs.readFile(path.join(__dirname, '../fixtures/report.json'), 'utf8');
  const drivers = JSON.parse(data);

  const driver = drivers.find(d => d.id === driverId);

  if (!driver) {
    // Driver not found
    throw new Error('Driver not found');
  }

  return {
    vehicleID: driver.vehicles.map(v => v.plate), 
    gender: driver.gender || 'N/A',
    agent: driver.agent || 'Hiring Agent',
    email: driver.email || 'john@doe.com',
    phone: driver.phone || 'N/A',
    DOB: driver.DOB || 'N/A',
    address: driver.address || 'Decagon, Traditions Building, Igbo Efon, Lagos'
  };
}


async function getVehicle(vehicleId) {
  if (!vehicleId) {
    throw new Error('Vehicle ID is required');
  }

  const data = await fs.readFile(path.join(__dirname, '../fixtures/report.json'), 'utf8');
  const drivers = JSON.parse(data);
  const vehicles = drivers.flatMap(driver => driver.vehicles || []);
  const driverVehicle = vehicles.find(vehicle => vehicle.plate === vehicleId);
  

  if (driverVehicle) {
    return {
      manufacturer: driverVehicle.manufacturer,
      plate: driverVehicle.plate,
      acquired: new Date(), 
      acquiredNew: true     
    };
  }else{
    throw new Error(`Vehicle with id ${vehicleId} not found`);
  }

}


// getVehicle('EPE-2886-LG')
//   .then(vehicle => console.log(vehicle))
//   .catch(err => console.error(err.message));

// getDriver('6abbc78e-87d8-4def-a722-bd19b70e9639')
//   .then(vehicle => console.log(vehicle))
//   .catch(err => console.error(err.message));

  module.exports = {getTrips, getDriver,getVehicle};
