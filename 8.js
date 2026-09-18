const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "books.json");


// Read books from JSON file
function readBooks() {
    try {
        const data = fs.readFileSync(filePath, "utf8");

        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}


// Save books to JSON file
function saveBooks(books) {
    try {
        fs.writeFileSync(
            filePath,
            JSON.stringify(books, null, 2)
        );

        return true;
    } catch (error) {
        return false;
    }
}


// Send JSON response
function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data));
}


// Create server
const server = http.createServer(function(req, res) {

    const method = req.method;
    const url = req.url;


    // =========================
    // GET /books
    // =========================

    if (method === "GET" && url === "/books") {

        const books = readBooks();

        if (books === null) {
            sendResponse(res, 500, {
                message: "Error reading books file"
            });

            return;
        }

        sendResponse(res, 200, books);

        return;
    }


    // =========================
    // POST /books
    // =========================

    if (method === "POST" && url === "/books") {

        let body = "";

        req.on("data", function(chunk) {
            body = body + chunk;
        });


        req.on("end", function() {

            let newBook;

            // Try to parse JSON
            try {
                newBook = JSON.parse(body);
            } catch (error) {

                sendResponse(res, 400, {
                    message: "Invalid JSON"
                });

                return;
            }


            // Check required data
            if (!newBook.title ||
                !newBook.author ||
                newBook.price === undefined ||
                newBook.available === undefined
            ) {

                sendResponse(res, 400, {
                    message: "Missing book information"
                });

                return;
            }


            const books = readBooks();

            if (books === null) {

                sendResponse(res, 500, {
                    message: "Error reading books file"
                });

                return;
            }


            // Generate new ID
            let newId = 1;

            if (books.length > 0) {
                newId = books[books.length - 1].id + 1;
            }


            // Create new book
            const book = {
                id: newId,
                title: newBook.title,
                author: newBook.author,
                price: newBook.price,
                available: newBook.available
            };


            // Add book
            books.push(book);


            // Save books
            const saved = saveBooks(books);

            if (!saved) {

                sendResponse(res, 500, {
                    message: "Error saving books"
                });

                return;
            }


            // Send new book
            sendResponse(res, 201, book);
        });

        return;
    }


    // =========================
    // DELETE /books/:id
    // =========================

    if (method === "DELETE" && url.startsWith("/books/")) {

        // Get ID from URL
        const id = Number(url.split("/")[2]);


        if (isNaN(id)) {

            sendResponse(res, 400, {
                message: "Invalid book ID"
            });

            return;
        }


        const books = readBooks();

        if (books === null) {

            sendResponse(res, 500, {
                message: "Error reading books file"
            });

            return;
        }


        // Find book
        const bookIndex = books.findIndex(function(book) {
            return book.id === id;
        });


        // Book not found
        if (bookIndex === -1) {

            sendResponse(res, 404, {
                message: "Book not found"
            });

            return;
        }


        // Delete book
        const deletedBook = books.splice(bookIndex, 1);


        // Save updated books
        const saved = saveBooks(books);

        if (!saved) {

            sendResponse(res, 500, {
                message: "Error saving books"
            });

            return;
        }


        sendResponse(res, 200, {
            message: "Book deleted successfully",
            book: deletedBook[0]
        });

        return;
    }


    // =========================
    // Invalid Route
    // =========================

    sendResponse(res, 404, {
        message: "Route not found"
    });

});


// Start server
server.listen(3000, function() {
    console.log("Server is running on port 3000");
});