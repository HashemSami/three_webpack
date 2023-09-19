const userState = {
  firstName: "",
  lastName: "",
  age: 0,
  occupation: "",
};

const useState = state => {
  const newState = state;
  const setState = () => {
    Object.assign(newState, state);
  };
  return [newState, setState];
};

const showStrength = age => {
  let howOld = age;
  let output = "I am";
  while (howOld-- > 0) {
    output += " very";
  }
  return output + " Strong";
};

const describeSelf = (firstName, lastName, age) => {
  console.log(
    `My name is ${firstName} ${lastName}, I am ${age}years Old and i work as a ${occupation}`
  );
};

const individuals = [];
for (let i = 0; i < 50000; i++) {
  const person = {
    firstName: "Zaynab",
    lastName: "Olagunju",
    age: [i],
    occupation: "Economist",
  };
  individuals.push(person);
}
const used = process.memoryUsage();
for (let key in used) {
  console.log(`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
}
const start = Date.now();
individuals.forEach(person => {
  // console.log(showStrength(person.age));
  showStrength(person.age);
});
// for (let i = 0; i < individuals.length; i++) {
//   showStrength(individuals[i].age);
// }

console.log(
  "Finished displaying strength in " + (Date.now() - start) / 1000 + " seconds"
);
// rss 30.12 MB heapTotal 18.23 MB heapUsed 8.03 MB external 0.01 MB
// Finished displaying strength in 4.037 seconds
