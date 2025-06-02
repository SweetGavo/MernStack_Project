const { getTrips, getDriver } = require("./api.cjs");
const fs = require('fs').promises; 
const path = require('path');
/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */
async function analysis() {
      const data = await fs.readFile(path.join(__dirname, '../fixtures/report.json'), 'utf8');
      const drivers = JSON.parse(data);
      
      
      if (!Array.isArray(drivers)) {
        throw new Error("Invalid input: expected an array of drivers.");
      }
    
      let noOfCashTrips = 0;
      let noOfNonCashTrips = 0;
      let billedTotal = 0;
      let cashBilledTotal = 0;
      let nonCashBilledTotal = 0;
      let noOfDriversWithMoreThanOneVehicle = 0;
    
      let mostTripsByDriver = null;
      let highestEarningDriver = null;
    
      for (const driver of drivers) {
        let {
          fullName = '',
          phone,
          noOfTrips,
          noOfCashTrips: driverCashTrips,
          noOfNonCashTrips: driverNonCashTrips,
          totalAmountEarned,
          totalCashAmount,
          totalNonCashAmount,
          vehicles
        } = driver;
        
    
        const driversName = fullName.split(' ').map(namePart => namePart.charAt(0).toLowerCase() + namePart.slice(1)).join('') + '@example.com';
    
        noOfCashTrips += driverCashTrips || 0;
        noOfNonCashTrips += driverNonCashTrips || 0;
        billedTotal += totalAmountEarned || 0;
        cashBilledTotal += totalCashAmount || 0;
        nonCashBilledTotal += totalNonCashAmount || 0;
    
        if (vehicles && vehicles.length > 1) {
          noOfDriversWithMoreThanOneVehicle++;
        }
    
        if (!mostTripsByDriver || noOfTrips > mostTripsByDriver.noOfTrips) {
          mostTripsByDriver = {
            name: fullName,
            email: driversName,
            phone,
            noOfTrips,
            totalAmountEarned
          };
        }
    
        if (!highestEarningDriver || totalAmountEarned > highestEarningDriver.totalAmountEarned) {
          highestEarningDriver = {
            name: fullName,
            email: driversName,
            phone,
            noOfTrips,
            totalAmountEarned
          };
        }
      }
    
    
      return {
        noOfCashTrips,
        noOfNonCashTrips,
        billedTotal: parseFloat(billedTotal.toFixed(2)),
        cashBilledTotal: Math.round(parseFloat(cashBilledTotal.toFixed(2))*10)/10,
        nonCashBilledTotal: parseFloat(nonCashBilledTotal.toFixed(2)),
        noOfDriversWithMoreThanOneVehicle,
        mostTripsByDriver,
        highestEarningDriver
      };
    
}


// Run analysis for testing
module.exports = analysis;

analysis().then(result => {
  console.log(result);
}).catch(console.error);
