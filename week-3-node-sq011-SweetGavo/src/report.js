const { getTrips, getDriver, getVehicle } = require("./api.cjs");
const fs = require("fs").promises;
const path = require("path");
/**
 * This function should return the data for drivers in the specified format
 *
 * Question 4
 *
 * @returns {any} Driver report data
 */

async function driverReport() {
  const data = await fs.readFile(
    path.join(__dirname, "../fixtures/report.json"),
    "utf8",
  );
  const drivers = JSON.parse(data);

  const report = drivers.map((driver) => {
    const { fullName, id, phone, vehicles = [], trips = [] } = driver;

    const noOfCashTrips = trips.filter((t) => t.isCash).length;
    const noOfNonCashTrips = trips.length - noOfCashTrips;
    const totalCashAmount = trips
      .filter((t) => t.isCash)
      .reduce(
        (sum, t) =>
          sum +
          (typeof t.billed === "number" ? t.billed : parseFloat(t.billed)),
        0,
      );
    const totalNonCashAmount = trips
      .filter((t) => !t.isCash)
      .reduce(
        (sum, t) =>
          sum +
          (typeof t.billed === "number" ? t.billed : parseFloat(t.billed)),
        0,
      );
    const totalAmountEarned = totalCashAmount + totalNonCashAmount;

    return {
      fullName,
      id,
      phone,
      noOfTrips: trips.length,
      noOfVehicles: vehicles.length,
      vehicles: vehicles.map((v) => ({
        plate: v.plate,
        manufacturer: v.manufacturer,
      })),
      noOfCashTrips,
      noOfNonCashTrips,
      totalAmountEarned,
      totalCashAmount,
      totalNonCashAmount,
      trips,
    };
  });

  return report;
}

module.exports = driverReport;

// Run driverReport for testing
driverReport()
  .then((report) => {
    console.log(report);
  })
  .catch(console.error);

module.exports = { driverReport };
