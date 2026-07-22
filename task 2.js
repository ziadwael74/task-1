// ==========================================
// Project 1: Online Store Order Processing
// ==========================================

// Orders
var orders = [
    { id: 1, status: "valid", stockAvailable: true, amount: 500 },
    { id: 2, status: "cancelled", stockAvailable: true, amount: 300 },
    { id: 3, status: "invalid", stockAvailable: true, amount: 200 },
    { id: 4, status: "valid", stockAvailable: false, amount: 700 },
    { id: 5, status: "valid", stockAvailable: true, amount: 400 },
    { id: 6, status: "valid", stockAvailable: false, amount: 600 },
    { id: 7, status: "valid", stockAvailable: false, amount: 800 },
    { id: 8, status: "valid", stockAvailable: true, amount: 900 }
];

// Variables
var totalRevenue = 0;
var successfulOrders = 0;
var processedOrders = 0;

var skippedInRow = 0;
var stockFailures = 0;

var stopMessage = "";

// Process Orders
for (var i = 0; i < orders.length; i++) {

    // Skip if cancelled or invalid
    if (orders[i].status == "cancelled" || orders[i].status == "invalid") {

        skippedInRow++;

        if (skippedInRow == 3) {
            stopMessage = "System stopped due to critical failure";
            break;
        }

        continue;
    }

    // Skip if stock is unavailable
    if (orders[i].stockAvailable == false) {

        skippedInRow++;
        stockFailures++;

        if (skippedInRow == 3 || stockFailures == 3) {
            stopMessage = "System stopped due to critical failure";
            break;
        }

        continue;
    }

    // Process Valid Order
    totalRevenue = totalRevenue + orders[i].amount;
    successfulOrders++;
    processedOrders++;

    // Reset skipped counter
    skippedInRow = 0;
}

// Output
console.log("===== Order Report =====");
console.log("Total Revenue: " + totalRevenue);
console.log("Successful Orders: " + successfulOrders);
console.log("Processed Orders: " + processedOrders);

if (stopMessage != "") {
    console.log(stopMessage);
}




// ================================
// Check if Array is Sorted
// ================================

function checkSorted(arr) {

    var sorted = true;

    for (var i = 0; i < arr.length - 1; i++) {

        if (arr[i] > arr[i + 1]) {
            sorted = false;
            break;
        }

    }

    return sorted;
}

// Test
var numbers = [2, 4, 6, 8, 10];

console.log(checkSorted(numbers));




// =====================================
// Return Numbers Greater Than a Value
// =====================================

function greaterThan(arr, value) {

    var result = [];

    for (var i = 0; i < arr.length; i++) {

        if (arr[i] > value) {
            result.push(arr[i]);
        }

    }

    return result;
}

// Test
var numbers = [5, 12, 7, 20, 3, 15];

console.log(greaterThan(numbers, 10));