// Question:
// Write a JavaScript program using ES6 features to calculate the total and average marks of a
// student. The program should declare variables using let and const, use an arrow function to
// compute the average, and display the result using template literals. The program should
// print the student name, total marks, and average marks in a formatted message.

const calculateSum = (...args) => {
  return args.reduce((prev, curr) => curr + prev, 0);
};

const calculateAverage = (...args) => {
  return calculateSum(...args) / args.length;
};

const calculateData = (...args) => {
  return `Total Score: ${calculateSum(...args)} out of ${100 * args.length}, Average: ${calculateAverage(...args).toFixed(2)}`;
};

console.log(calculateData(100, 95, 100, 95, 100, 93));
