const products = [{
        id: 1,
        name: "Laptop",
        price: 20000
    },
    {
        id: 2,
        name: "Phone",
        price: 10000
    },
    {
        id: 3,
        name: "Headphones",
        price: 1500
    },
    {
        id: 4,
        name: "Keyboard",
        price: 800
    }
];

const cart = [];

// Add product to cart
function addToCart(productId) {
    const product = products.find(function(item) {
        return item.id === productId;
    });

    if (product) {
        cart.push(product);
        console.log(product.name + " added to cart");
    } else {
        console.log("Product not found");
    }
}

// Remove product from cart
function removeFromCart(productId) {
    const index = cart.findIndex(function(item) {
        return item.id === productId;
    });

    if (index !== -1) {
        const removedProduct = cart.splice(index, 1);
        console.log(removedProduct[0].name + " removed from cart");
    } else {
        console.log("Product not found in cart");
    }
}

// List cart items
function listCart() {
    console.log("Cart items:");

    if (cart.length === 0) {
        console.log("Cart is empty");
        return;
    }

    cart.forEach(function(item) {
        console.log(
            item.id + " - " +
            item.name + " - " +
            item.price
        );
    });
}

// Calculate total
function calculateTotal() {
    let total = 0;

    cart.forEach(function(item) {
        total = total + item.price;
    });

    return total;
}


// ====================
// Program
// ====================

addToCart(1);
addToCart(2);
addToCart(3);

listCart();

console.log("Total:", calculateTotal());

removeFromCart(2);

listCart();

console.log("Total:", calculateTotal());