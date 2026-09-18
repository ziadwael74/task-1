const students = [];

// Add student
function addStudent(name, grades) {
    const student = {
        name: name,
        grades: grades
    };

    students.push(student);

    console.log(name + " added successfully");
}

// Calculate average
function calculateAverage(grades) {
    let total = 0;

    for (let i = 0; i < grades.length; i++) {
        total = total + grades[i];
    }

    return total / grades.length;
}

// List students
function listStudents() {
    console.log("Students:");

    students.forEach(function(student) {
        const average = calculateAverage(student.grades);

        console.log(
            student.name +
            " - Grades: " +
            student.grades +
            " - Average: " +
            average
        );
    });
}

// Filter passed students
function filterPassed() {
    const passedStudents = [];

    students.forEach(function(student) {
        const average = calculateAverage(student.grades);

        if (average >= 60) {
            passedStudents.push(student);
        }
    });

    return passedStudents;
}


// ====================
// Program
// ====================

addStudent("Ziad", [80, 70, 90]);
addStudent("Ahmed", [50, 40, 55]);
addStudent("Omar", [70, 65, 80]);

listStudents();

const passedStudents = filterPassed();

console.log("Passed Students:");

passedStudents.forEach(function(student) {
    console.log(student.name);
});