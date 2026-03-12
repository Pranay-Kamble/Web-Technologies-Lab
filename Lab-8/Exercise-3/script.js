// Question:
// Develop a JavaScript program using ES6 classes and promises to simulate a simple course
// enrollment system. Create a class named Course with a constructor to initialize the course
// name and instructor. Include a method to display course details. Implement a promise that
// checks whether seats are available and prints either “Enrollment Successful” or “Course Full”
// based on the condition.

class Course {
    constructor(courseName, instructorName, seats) {
        this.courseName = courseName
        this.instructorName = instructorName
        this.seats = seats
    }

    displayCourse = () => {
        console.log(`Course Name: ${this.courseName}, Instructor Name: ${this.instructorName}, Seats Available: ${this.seats}`)
    }

    enroll = (studentName) => {
        return new Promise((resolve, reject) => {
            if (this.seats > 0) {
                --this.seats
                resolve(`Enrolled ${studentName} into the course. Seats available: ${this.seats}`)
            } else {
                reject(`Unable to enroll ${studentName} into the course. Seats are full.`)
            }
        })
    }
}

const course1 = new Course("Web Technologies", "Dr. S Gopikrishnan", 3)

const studentNames = ["Pranay", "Tarun", "Shanmukh", "Not Allowed"]

for (const studentName of studentNames) {
    course1.enroll(studentName)
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
}