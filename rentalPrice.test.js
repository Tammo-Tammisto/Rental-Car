const { getPrice } = require("./rentalPrice");

test("calculates the correct rental price for a young driver with a compact car", () => {
    const pickupDate = "2023-06-01";
    const dropoffDate = "2023-06-05";
    const type = "Compact";
    const age = 20;
    const licenseOwnedDuration = 2;
    const expectedPrice = "$190.00";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedPrice);
});

test("calculates the correct rental price for a driver with a racer car in high season", () => {
    const pickupDate = "2023-07-01";
    const dropoffDate = "2023-07-05";
    const type = "Racer";
    const age = 24;
    const licenseOwnedDuration = 3;
    const expectedPrice = "$207.00";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedPrice);
});

test("returns error for driver with less than 1 year of license", () => {
    const pickupDate = "2023-06-01";
    const dropoffDate = "2023-06-05";
    const type = "Compact";
    const age = 25;
    const licenseOwnedDuration = 0.5;
    const expectedMessage = "Driver has not held license for enough time";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedMessage);
});

test("returns error for driver under 18", () => {
    const pickupDate = "2023-06-01";
    const dropoffDate = "2023-06-05";
    const type = "Compact";
    const age = 17;
    const licenseOwnedDuration = 2;
    const expectedMessage = "Driver too young - cannot quote the price";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedMessage);
});

test("returns error for driver under 21 with non-compact car", () => {
    const pickupDate = "2023-06-01";
    const dropoffDate = "2023-06-05";
    const type = "SUV";
    const age = 20;
    const licenseOwnedDuration = 2;
    const expectedMessage = "Drivers 21 y/o or less can only rent Compact vehicles";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedMessage);
});

test("calculates the correct rental price for a driver with less than 2 years of license", () => {
    const pickupDate = "2023-06-01";
    const dropoffDate = "2023-06-05";
    const type = "Compact";
    const age = 25;
    const licenseOwnedDuration = 1.5;
    const expectedPrice = "$261.88";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedPrice);
});

test("calculates the correct rental price for a driver with less than 3 years of license in high season", () => {
    const pickupDate = "2023-07-01";
    const dropoffDate = "2023-07-05";
    const type = "Compact";
    const age = 25;
    const licenseOwnedDuration = 2.5;
    const expectedPrice = "$218.75";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedPrice);
});