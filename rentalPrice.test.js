const { getPrice, isWeekend } = require("./rentalPrice");

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

test("calculates the correct rental price for a driver with more than 10 days in low season", () => {
    const pickupDate = "2023-01-01";
    const dropoffDate = "2023-01-12";
    const type = "Compact";
    const age = 30;
    const licenseOwnedDuration = 5;
    const expectedPrice = "$324.00";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedPrice);
});

test("calculates the correct rental price for a driver with more than 10 days in high season", () => {
    const pickupDate = "2023-06-01";
    const dropoffDate = "2023-06-12";
    const type = "Compact";
    const age = 30;
    const licenseOwnedDuration = 5;
    const expectedPrice = "$414.00";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedPrice);
});

test("calculates the correct rental price for a driver with pickup and dropoff dates spanning high season start and end", () => {
    const pickupDate = "2023-03-30";
    const dropoffDate = "2023-04-02";
    const type = "Compact";
    const age = 30;
    const licenseOwnedDuration = 5;
    const expectedPrice = "$120.00";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedPrice);
});

test("calculates the correct rental price for a driver with pickup date in high season and dropoff date in low season", () => {
    const pickupDate = "2023-10-30";
    const dropoffDate = "2023-11-02";
    const type = "Compact";
    const age = 30;
    const licenseOwnedDuration = 5;
    const expectedPrice = "$138.00";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedPrice);
});

test("calculates the correct rental price for a driver with pickup date in high season and dropoff date in high season", () => {
    const pickupDate = "2023-05-01";
    const dropoffDate = "2023-05-10";
    const type = "Compact";
    const age = 30;
    const licenseOwnedDuration = 5;
    const expectedPrice = "$345.00";

    const result = getPrice(pickupDate, dropoffDate, type, age, licenseOwnedDuration);

    expect(result).toBe(expectedPrice);
});

test("15.02.2025 is weekend", () => {
    expect(isWeekend(new Date('2025-02-15')))
    .toBe(true);
});

test("14.02.2025 is not weekend", () => {
    expect(isWeekend(new Date('2025-02-14')))
    .toBe(false);
})

test("15.02.2025 price increase 5%", () => {
    expect(getPrice('2025-02-15', '2025-02-16', 'Compact', 30, 5))
    .toBe("$63.00");	
});

test("14.02.2025 price not increase", () => {
    expect(getPrice('2025-02-12', '2025-02-14', 'Compact', 30, 5))
    .toBe("$90.00");	
});

test("rent monday to wednesday", () => {
    expect(getPrice('2025-02-10', '2025-02-12', 'Compact', 50, 5))
    .toBe("$150.00");	
});

test("rent thursday to saturday", () => {
    expect(getPrice('2025-02-13', '2025-02-15', 'Compact', 50, 5))
    .toBe("$152.50");	
});