const analysis = require("../src/analysis");
const { driverReport } = require("../src/report");
const report = require("../fixtures/report.json");

describe("analysis spec", () => {
  test("matches the required data format", () => {
    return expect(analysis()).resolves.toEqual({
      noOfCashTrips: expect.any(Number),
      noOfNonCashTrips: expect.any(Number),
      billedTotal: expect.any(Number),
      cashBilledTotal: expect.any(Number),
      nonCashBilledTotal: expect.any(Number),
      noOfDriversWithMoreThanOneVehicle: expect.any(Number),
      mostTripsByDriver: {
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        noOfTrips: expect.any(Number),
        totalAmountEarned: expect.any(Number),
      },
      highestEarningDriver: {
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        noOfTrips: expect.any(Number),
        totalAmountEarned: expect.any(Number),
      },
    });
  });

  test("analysis solution", async () => {
    const result = await analysis();

    expect(result.noOfCashTrips).toBe(26);
    expect(result.noOfNonCashTrips).toBe(24);
    expect(result.noOfDriversWithMoreThanOneVehicle).toBe(3);

    expect(result.billedTotal).toBeCloseTo(128224.69, 1);
    expect(result.cashBilledTotal).toBeCloseTo(69043.8, 1);
    expect(result.nonCashBilledTotal).toBeCloseTo(59180.89, 1);

    expect(result.mostTripsByDriver).toEqual({
      name: "Bush Gibbs",
      email: "bushgibbs@example.com",
      phone: "+234 808-204-2520",
      noOfTrips: 7,
      totalAmountEarned: 17656.46,
    });

    expect(result.highestEarningDriver).toEqual({
      name: "Hughes Strickland",
      email: "hughesstrickland@example.com",
      phone: "+234 808-084-4833",
      noOfTrips: 7,
      totalAmountEarned: 24508.77,
    });
  });
});

describe("driver report", () => {
  test("matches the required data format", async () => {
    expect(driverReport()).resolves.toEqual(report);
  });
});
