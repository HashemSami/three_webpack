// class Example
// class UserClass {
//   constructor({ firstName, lastName, age, occupation }) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     this.occupation = occupation;
//   }
//   describeSelf() {
//     console.log(
//       `My name is ${this.firstName} ${this.lastName}, I am ${this.age}years Old and i work as a ${this.occupation}`
//     );
//   }
//   getAge() {
//     return this.age;
//   }
//   showStrength() {
//     let howOld = this.age;
//     let output = "I am";
//     while (howOld-- > 0) {
//       output += " very";
//     }
//     return output + " Strong";
//   }
// }

function UserFunc({ firstName, lastName, age, occupation }) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.occupation = occupation;
}

UserFunc.prototype.describeSelf = function () {
  console.log(
    `My name is ${this.firstName} ${this.lastName}, I am ${this.age}years Old and i work as a ${this.occupation}`
  );
};

UserFunc.prototype.getAge = function () {
  return this.age;
};

UserFunc.prototype.showStrength = function () {
  let howOld = this.age;
  let output = "I am";
  while (howOld-- > 0) {
    output += " very";
  }
  return output + " Strong";
};

const individuals = [];
for (let i = 0; i < 10; i++) {
  const person = new UserFunc({
    firstName: "Zaynab",
    lastName: "Olagunju",
    age: [i],
    occupation: "Economist",
  });
  individuals.push(person);
}
const used = process.memoryUsage();
for (let key in used) {
  console.log(`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
}
const start = Date.now();
individuals.map(person => {
  console.log(person.showStrength());
});
console.log(
  "Finished displaying strength in " + (Date.now() - start) / 1000 + " seconds"
);
