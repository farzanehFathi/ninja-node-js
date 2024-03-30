const people = ["fari", "maxime", " peter", " hannah"];
const ages = ["32", "33", "32", "35"];

const person_Age = (person, age) => {
  return `${person} is ${age} years old`;
};

console.log(people);
console.log(ages);

console.log(person_Age(people, ages));

module.exports = { people, ages, person_Age };
