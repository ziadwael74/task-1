// Task 1 - School Management System

// ==============================
// Step 1: Person Class
// ==============================

class Person {#
    email;#
    ID;

    constructor(name, email, ID) {
        this.name = name;
        this.email = email;
        this.ID = ID;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        if (value.includes("@")) {
            this.#email = value;
        } else {
            console.log("Invalid email");
        }
    }

    get ID() {
        return this.#ID;
    }

    set ID(value) {
        if (value > 0) {
            this.#ID = value;
        } else {
            console.log("Invalid ID");
        }
    }

    describeRole() {
        console.log("This is a school member.");
    }
}


// ==============================
// Step 2: Principal Class
// ==============================

class Principal extends Person {

    constructor(name, email, ID) {
        super(name, email, ID);
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
        console.log(member.name + " was added to the school.");
    }

    removeMember(ID) {
        this.members = this.members.filter(member => member.ID !== ID);
        console.log("Member removed.");
    }

    listMembers() {
        console.log("School Members:");

        this.members.forEach(member => {
            console.log(member.name + " - " + member.ID);
        });
    }

    describeRole() {
        console.log(
            this.name + " is the Principal and manages the school."
        );
    }
}


// ==============================
// Step 3: Teacher Class
// ==============================

class Teacher extends Person {

    constructor(name, email, ID, subject) {
        super(name, email, ID);

        this.subject = subject;
        this.grades = [];
    }

    gradeStudent(studentName, grade) {

        this.grades.push({
            studentName: studentName,
            grade: grade
        });

        console.log(
            studentName +
            " received grade " +
            grade +
            " in " +
            this.subject
        );
    }

    listGrades() {

        console.log("Graded Students:");

        this.grades.forEach(item => {
            console.log(
                item.studentName + " - " + item.grade
            );
        });
    }

    describeRole() {
        console.log(
            this.name +
            " is a Teacher and teaches " +
            this.subject +
            "."
        );
    }
}


// ==============================
// Step 4: Student Class
// ==============================

class Student extends Person {

    constructor(name, email, ID) {
        super(name, email, ID);

        this.subjects = [];
    }

    enroll(subject) {

        this.subjects.push(subject);

        console.log(
            this.name +
            " enrolled in " +
            subject
        );
    }

    viewSubjects() {

        console.log(
            this.name +
            "'s Subjects:"
        );

        this.subjects.forEach(subject => {
            console.log(subject);
        });
    }

    describeRole() {

        console.log(
            this.name +
            " is a Student and studies different subjects."
        );
    }
}


// ==============================
// Step 5: Create and Use Objects
// ==============================

// Create Principal
const principal = new Principal(
    "Mr. Ahmed",
    "ahmed@school.com",
    1
);


// Create Teacher
const teacher = new Teacher(
    "Mr. Mohamed",
    "mohamed@school.com",
    2,
    "Mathematics"
);


// Create Student
const student = new Student(
    "Ali",
    "ali@school.com",
    3
);


// Principal adds members
principal.addMember(teacher);
principal.addMember(student);


// List all school members
principal.listMembers();


// Teacher grades a student
teacher.gradeStudent("Ali", 95);


// List graded students
teacher.listGrades();


// Student enrolls in subjects
student.enroll("Mathematics");
student.enroll("English");
student.enroll("Computer Science");


// View enrolled subjects
student.viewSubjects();


// Store all members in an array
const allMembers = [
    principal,
    teacher,
    student
];


// Call the shared method for every member
console.log("Roles:");

allMembers.forEach(member => {
    member.describeRole();
});