const userState = {
  firstName: "Hash",
  lastName: "",
  age: 0,
  occupation: "",
};

const useState = state => {
  const setState = newState => {
    Object.assign(state, newState);
  };
  return [state, setState];
};

const showStrength = age => {
  let howOld = age;
  let output = "I am";
  while (howOld-- > 0) {
    output += " very";
  }
  return output + " Strong";
};

const describeSelf = state => {
  const [state1, setState] = useState(state);

  setState({ lastName: "sam", age: 40, occupation: "mad" });

  console.log(
    `My name is ${state1.firstName} ${state1.lastName}, I am ${state1.age}years Old and i work as a ${state1.occupation}`
  );
};

describeSelf(userState);
