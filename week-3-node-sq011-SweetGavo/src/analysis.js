const { getTrips, getDriver } = require("api");
/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */
async function analysis() {
  // This is how result structure should be
  const obj = {
    noOfCashTrips: 0,
    noOfNonCashTrips: 0,
    billedTotal: 0,
    cashBilledTotal: 0,
    nonCashBilledTotal: 0,
    noOfDriversWithMoreThanOneVehicle: 0,
    mostTripsByDriver: {
      name: "Driver name",
      email: "Driver email",
      phone: "Driver phone",
      noOfTrips: 0,
      totalAmountEarned: 0,
    },
    highestEarningDriver: {
      name: "Driver name",
      email: "Driver email",
      phone: "Driver phone",
      noOfTrips: 0,
      totalAmountEarned: 0,
    },
  };
  const allTripsmadebydriver = await getTrips();
  const randomDriver = {};
  // Fetch all the drivers and their details
  await Promise.allSettled(
    allTripsmadebydriver.map((e) =>
      getDriver(e.driverID).then(
        (result) => (randomDriver[e.driverID] = result)
      )
    )
  );
  const allDriversinfo = {};
  let tempAmount = 0;
  let maxAmount = 0;
  let minTripNo = 0;
  let maxTripNo = 0;
  let keys = [];
  for (let trip of allTripsmadebydriver) {
    keys.push(trip.driverID);
  }
  keys = [...new Set(keys)];
  for (const id in keys) {
    for (const details in randomDriver) {
      if (keys[id] === details) allDriversinfo[keys[id]] = randomDriver[details];
    }
  }

  // Calculate billed total, non cash trips and cash trips
  for (let i = 0; i < allTripsmadebydriver.length; i++) {
    if (allTripsmadebydriver[i].isCash === true) {
      obj.noOfCashTrips++;
      const bill =
        Number(allTripsmadebydriver[i].billedAmount) ||
        Number(allTripsmadebydriver[i].billedAmount.replace(",", ""));
      obj.billedTotal += bill;
      obj.cashBilledTotal += bill;
    }
    if (allTripsmadebydriver[i].isCash === false) {
      obj.noOfNonCashTrips++;
      const bill =
        Number(allTripsmadebydriver[i].billedAmount) ||
        Number(allTripsmadebydriver[i].billedAmount.replace(",", ""));
      obj.billedTotal += bill;
      obj.nonCashBilledTotal += bill;
    }
  }

  for (const key in allDriversinfo) {
    if (allDriversinfo[key].vehicleID.length > 1) {
      obj.noOfDriversWithMoreThanOneVehicle++;
    }
    for (let i = 0; i < allTripsmadebydriver.length; i++) {
      if (allTripsmadebydriver[i].driverID === key) {
        tempAmount +=
          Number(allTripsmadebydriver[i].billedAmount) ||
          Number(allTripsmadebydriver[i].billedAmount.replace(",", ""));
        minTripNo++;
      }
      // Driver with most trips
      if (minTripNo > maxTripNo) {
        maxTripNo = minTripNo;
        // get driver name
        obj.mostTripsByDriver.name = allDriversinfo[key].name;
        // get driver email
        obj.mostTripsByDriver.email = allDriversinfo[key].email;
        // get driver phone number
        obj.mostTripsByDriver.phone = allDriversinfo[key].phone;
        // get driver number of trips
        obj.mostTripsByDriver.noOfTrips = maxTripNo;
        // get driver totalAmuntEarned for all trips
        obj.mostTripsByDriver.totalAmountEarned = tempAmount;
      }
      // Driver with most earnings
      if (tempAmount > maxAmount) {
        maxAmount = tempAmount;
        // get the name of diver with highest earning
        obj.highestEarningDriver.name = allDriversinfo[key].name;
        // get the email of diver with highest earning
        obj.highestEarningDriver.email = allDriversinfo[key].email;
        // get the phone number of diver with highest earning
        obj.highestEarningDriver.phone = allDriversinfo[key].phone;
        // get the number of trips of diver with highest earning
        obj.highestEarningDriver.noOfTrips = minTripNo;
        // get the totalAmountEarned  of diver with highest earning
        obj.highestEarningDriver.totalAmountEarned = maxAmount;
      }
    }
    // set amount and minimum trips to zero
    tempAmount = 0;
    minTripNo = 0;
  }
  obj.nonCashBilledTotal = Number(obj.nonCashBilledTotal.toFixed(2));
  obj.billedTotal = Number(obj.billedTotal.toFixed(2));
  return obj;
}
module.exports = analysis;
analysis();








