import "reflect-metadata";

// const plane = {
//   color: "red",
// };

// associate metadata with an object
// Reflect.defineMetadata("note", "hi there from plane", plane);
// Reflect.defineMetadata("height", 10, plane);

// associate metadata with a property on an object
// Reflect.defineMetadata("note", "hi there from plane.color", plane, "color");

// metadata not listed as property
// console.log(plane); // { color: 'red' }

// get metadata from the object
// const note = Reflect.getMetadata("note", plane);
// const height = Reflect.getMetadata("height", plane);

// const noteOnProperty = Reflect.getMetadata("note", plane, "color");

// console.log(note); // hi there from plane
// console.log(height); // 10
// console.log(noteOnProperty); // hi there from plane.color

@printMetadata
class Plane {
  color: string = "red";

  @markFunction("HI THERE")
  fly(): void {
    console.log("vrrrr");
  }
}

function markFunction(secretInfo: string) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata("secret", secretInfo, target, key);
  };
}

// retrieve the metadata
// const secret = Reflect.getMetadata("secret", Plane.prototype, "fly");

// console.log(secret); // HI THERE

function printMetadata(target: typeof Plane) {
  // loop through the keys (methods) of the prototype to read metadata
  for (let key in target.prototype) {
    const secret = Reflect.getMetadata("secret", target.prototype, key);
    console.log(secret); // HI THERE
  }
}
