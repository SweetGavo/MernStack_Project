const path = require('path');
const fs = require('fs').promises;
const { driverReport } = require('../src/report'); 



describe(driverReport, () => {
  it('should return driver reports with correct computed fields', async () => {
    const report = await driverReport();

    expect(Array.isArray(report)).toBe(true);
    expect(report.length).toBeGreaterThan(0);

    const driver = report[0];

    expect(driver).toHaveProperty('fullName');
    expect(driver).toHaveProperty('id');
    expect(driver).toHaveProperty('phone');
    expect(driver).toHaveProperty('noOfTrips');
    expect(driver).toHaveProperty('noOfVehicles');
    expect(driver).toHaveProperty('vehicles');
    expect(driver).toHaveProperty('noOfCashTrips');
    expect(driver).toHaveProperty('noOfNonCashTrips');
    expect(driver).toHaveProperty('totalAmountEarned');
    expect(driver).toHaveProperty('totalCashAmount');
    expect(driver).toHaveProperty('totalNonCashAmount');
    expect(driver).toHaveProperty('trips');

    expect(driver.noOfTrips).toBe(driver.trips.length);
    expect(driver.noOfVehicles).toBe(driver.vehicles.length);
    expect(driver.totalAmountEarned).toBeCloseTo(driver.totalCashAmount + driver.totalNonCashAmount, 2);
  });
});
