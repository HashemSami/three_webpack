let userPrototype = {
  describeSelf: function () {
    console.log(
      `My name is ${this.firstName} ${this.lastName}, I am ${this.age}years Old and i work as a ${this.occupation}`
    );
  },
  getAge: function () {
    return this.age;
  },
  showStrength: function () {
    let howOld = this.age;
    let output = "I am";
    while (howOld-- > 0) {
      output += " very";
    }
    return output + " Strong " + this.firstName;
  },
};

const User = ({ firstName, lastName, age, occupation }) => {
  // let firstName = firstName || "hash";
  // let lastName = lastName || "hash";
  // let age = age || 10;
  // let occupation = occupation || 23;

  function ConstructorFunction(firstName, lastName, age, occupation) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.occupation = occupation;
  }

  ConstructorFunction.prototype = userPrototype;

  let instance = new ConstructorFunction(firstName, lastName, age, occupation);
  return instance;
};

const individuals = [];
for (let i = 0; i < 20000; i++) {
  const person = User({
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
individuals.map(person => person.showStrength());

console.log("data length:", individuals.length);
console.log(
  "Finished displaying strength in " + (Date.now() - start) / 1000 + " seconds"
);
