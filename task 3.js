// ===================================
// 1. Log messages in order
// ===================================

console.log("Start");
console.log("Middle");
console.log("End");


// ===================================
// 2. Function calls another function
// ===================================

function secondFunction() {
    console.log("Second Function");
}

function firstFunction() {
    console.log("First Function");
    secondFunction();
    console.log("Back to First Function");
}

firstFunction();


// ===================================
// 3. Sequential Calculations
// ===================================

var number1 = 10;
var number2 = 5;

var sum = number1 + number2;
console.log("Sum = " + sum);

var multiply = number1 * number2;
console.log("Multiply = " + multiply);

var subtract = number1 - number2;
console.log("Subtract = " + subtract);


// ===================================
// 4. Function depends on another function
// ===================================

function getTotal(price, quantity) {
    return price * quantity;
}

function printTotal(price, quantity) {

    var total = getTotal(price, quantity);

    console.log("Total Price = " + total);
}

printTotal(100, 3);





// ===================================
// 1. Hello then World
// ===================================

console.log("Hello");

setTimeout(function() {
    console.log("World");
}, 2000);


// ===================================
// 2. Print Numbers with Delay
// ===================================

for (var i = 1; i <= 5; i++) {

    setTimeout(function(number) {

        console.log(number);

    }, i * 1000, i);

}


// ===================================
// 3. Loading Example
// ===================================

console.log("Loading...");

setTimeout(function() {

    console.log("Done");

}, 3000);


// ===================================
// 4. Delayed Message
// ===================================

function sendMessage() {

    console.log("Sending Message...");

    setTimeout(function() {

        console.log("Message Sent Successfully.");

    }, 2000);

}

sendMessage();




// ===================================
// 1. Predict the Output
// ===================================

console.log("Start");

setTimeout(function() {
    console.log("Middle");
}, 1000);

console.log("End");


// ===================================
// 2. setTimeout(0)
// ===================================

console.log("One");

setTimeout(function() {
    console.log("Two");
}, 0);

console.log("Three");


// ===================================
// 3. Line by Line Execution
// ===================================

console.log("Line 1");

setTimeout(function() {
    console.log("Line 3");
}, 2000);

console.log("Line 2");


// ===================================
// 4. Call Stack Example
// ===================================

console.log("Program Started");

setTimeout(function() {
    console.log("Async Task");
}, 0);

console.log("Doing Work...");
console.log("Program Finished");




// ===================================
// 1. Greeting with Callback
// ===================================

function sayHello(name, callback) {

    console.log("Hello " + name);

    callback();

}

function afterGreeting() {

    console.log("Welcome!");

}

sayHello("Ziad", afterGreeting);


// ===================================
// 2. Calculator with Callback
// ===================================

function calculator(num1, num2, callback) {

    callback(num1, num2);

}

function add(a, b) {
    console.log("Addition = " + (a + b));
}

function subtract(a, b) {
    console.log("Subtraction = " + (a - b));
}

function multiply(a, b) {
    console.log("Multiplication = " + (a * b));
}

calculator(10, 5, add);
calculator(10, 5, subtract);
calculator(10, 5, multiply);


// ===================================
// 3. Loading Data
// ===================================

function loadData(callback) {

    console.log("Loading Data...");

    setTimeout(function() {

        console.log("Data Loaded");

        callback();

    }, 2000);

}

function finished() {

    console.log("Loading Finished");

}

loadData(finished);


// ===================================
// 4. Authentication Flow
// ===================================

function login(username, password, callback) {

    if (username == "admin" && password == "1234") {

        console.log("Login Successful");

        callback();

    } else {

        console.log("Login Failed");

    }

}

function nextStep() {

    console.log("Welcome to the Dashboard");

}

login("admin", "1234", nextStep);