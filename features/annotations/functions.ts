// TS infers number type output here, even if annotation was left off
const add = (a: number, b: number): number => {
  return a + b;
};

// TS infers void output here, but doesn't catch the mistaken failure to return anything
const subtract = (a: number, b: number) => {
  a - b;
};

function divide(a: number, b: number): number {
  return a / b;
}

const multiply = function (a: number, b: number): number {
  return a * b;
};

// Use void type for fns that don't return a value. Can be used for those that return null or undefined when strictNullChecks is disabled?
const logger = (message: string): void => {
  console.log(message);
};

// This will never return a value - the fn will exit early without completing
const throwError = (message: string): never => {
  throw new Error(message);
};

// Destructuring with annotations

const todaysWeather = {
  date: new Date(),
  weather: "sunny",
};

const logWeather = (forecast: { date: Date; weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
};

const logWeatherDestructured = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};
