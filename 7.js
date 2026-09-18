const fs = require("fs");

const filePath = "./data/grades.json";

// Read grades from JSON file
function readGrades() {
    if (!fs.existsSync(filePath)) {
        return [];
    }

    const data = fs.readFileSync(filePath, "utf8");

    if (data === "") {
        return [];
    }

    return JSON.parse(data);
}


// Save grades to JSON file
function saveGrades(grades) {
    fs.writeFileSync(
        filePath,
        JSON.stringify(grades, null, 2)
    );
}


// Add a new grade
function addGrade(studentName, subject, grade) {
    const grades = readGrades();

    const newGrade = {
        id: Date.now(),
        studentName: studentName,
        subject: subject,
        grade: grade
    };

    grades.push(newGrade);

    saveGrades(grades);

    console.log("Grade added successfully");
}


// Read all grades
function displayGrades() {
    const grades = readGrades();

    if (grades.length === 0) {
        console.log("No grades found");
        return;
    }

    console.log("Student Grades:");

    grades.forEach(function(item) {
        console.log(
            "ID: " + item.id +
            " | Student: " + item.studentName +
            " | Subject: " + item.subject +
            " | Grade: " + item.grade
        );
    });
}


// Update a student's grade
function updateGrade(id, newGrade) {
    const grades = readGrades();

    const studentGrade = grades.find(function(item) {
        return item.id === id;
    });

    if (studentGrade) {
        studentGrade.grade = newGrade;

        saveGrades(grades);

        console.log("Grade updated successfully");
    } else {
        console.log("Grade record not found");
    }
}


// Delete a student's grade
function deleteGrade(id) {
    const grades = readGrades();

    const newGrades = grades.filter(function(item) {
        return item.id !== id;
    });

    if (newGrades.length < grades.length) {
        saveGrades(newGrades);
        console.log("Grade deleted successfully");
    } else {
        console.log("Grade record not found");
    }
}


// ==========================
// Main Program
// ==========================

// Add grades
addGrade("Ziad", "JavaScript", 85);
addGrade("Ahmed", "JavaScript", 70);
addGrade("Omar", "Python", 90);

// Display all grades
displayGrades();

// Update a grade
// Put the ID from grades.json here
// Example:
// updateGrade(123456789, 95);

// Delete a grade
// Put the ID from grades.json here
// Example:
// deleteGrade(123456789);

// Display grades again
displayGrades();