// Question: 
// Create a JavaScript program that defines an object representing a student with properties
// such as id, name, department, and marks. Use object destructuring to extract the values
// and display them. Then create a new object using the spread operator that adds an
// additional property called grade based on the marks and display the updated object.

const getGrade = (marks) => {
    switch (true) {
        case (marks >= 90):
            return "S"
        case (marks >= 80):
            return "A"
        case (marks >= 70):
            return "B"
        case (marks >= 60):
            return "C"
        case (marks >= 50):
            return "D"
        case (marks >= 40):
            return "E"
        default:
            return "F"
    }
}

const addGrade = (studentDetails) => {
    const { marks } = studentDetails
    return {
        ...studentDetails,
        grade: getGrade(marks)
    }
}

const studentDetails = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 80,
};

console.log(addGrade(studentDetails))