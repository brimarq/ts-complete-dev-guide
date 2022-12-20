const emptyArray: string[] = [];

const carMakers: string[] = ["ford", "toyota", "chevy"];

const dates = [new Date(), new Date()];

const carsByMake = [["f150"], ["corolla"], ["camaro"]];

const carsByMake2: string[][] = [];

// Help with inference when extracting values
const car = carMakers[0];

const myCar = carMakers.pop();
// const myCar: string | undefined

// prevent incompatable values
carMakers.push(100);

// Help with 'map', etc. provides autocomplete
carMakers.map((car: string): string => {
  return car;
});

// Flexible types
const importantDates: (string | Date)[] = [new Date()];
importantDates.push("2030-10-10");
importantDates.push(new Date());
