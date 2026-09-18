import { Component, signal, computed, effect } from '@angular/core';

interface Product {
    id: number;
    name: string;
    price: number;
}

@Component({
    selector: 'app-root',
    standalone: true,

    template: `
    <div class="container">

      <h1>🛒 Shopping Cart</h1>

      <!-- Products -->
      <div class="products-section">

        <h2>Products</h2>

        <div class="products">

          @for (product of products; track product.id) {

            <div class="product">

              <h3>{{ product.name }}</h3>

              <p>Price: ${{ product.price }}</p>

              <button (click)="addToCart(product)">
                Add To Cart
              </button>

            </div>

          }

        </div>

      </div>


      <!-- Cart -->
      <div class="cart-section">

        <h2>Cart</h2>

        @if (cart().length === 0) {

          <p class="empty">
            Your cart is empty
          </p>

        } @else {

          @for (product of cart(); track product.id) {

            <div class="cart-item">

              <div>
                <h3>{{ product.name }}</h3>
                <p>${{ product.price }}</p>
              </div>

              <button
                class="remove"
                (click)="removeFromCart(product.id)"
              >
                Remove
              </button>

            </div>

          }


          <!-- Total -->
          <div class="total">

            <h2>
              Total Price: ${{ totalPrice() }}
            </h2>

            <button
              class="clear"
              (click)="clearCart()"
            >
              Clear Cart
            </button>

          </div>

        }

      </div>

    </div>
  `,

    styles: [`

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }

    .container {
      width: 90%;
      max-width: 1000px;
      margin: 30px auto;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
    }

    h2 {
      margin-bottom: 20px;
    }

    .products-section,
    .cart-section {
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 25px;
    }

    .products {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .product {
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 10px;
    }

    .product h3 {
      margin-top: 0;
    }

    button {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      background: #333;
      color: white;
      cursor: pointer;
    }

    button:hover {
      background: #555;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding: 15px 0;
    }

    .cart-item h3 {
      margin: 0;
    }

    .remove {
      background: #d9534f;
    }

    .clear {
      background: #333;
    }

    .total {
      text-align: right;
      margin-top: 20px;
    }

    .empty {
      text-align: center;
      padding: 30px;
      background: #f5f5f5;
      border-radius: 10px;
    }

    @media (max-width: 700px) {

      .products {
        grid-template-columns: 1fr;
      }

      .cart-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }

    }

  `]
})
export class AppComponent {


    // ==========================
    // Products
    // ==========================

    products: Product[] = [

        {
            id: 1,
            name: 'Laptop',
            price: 1000
        },

        {
            id: 2,
            name: 'Phone',
            price: 600
        },

        {
            id: 3,
            name: 'Headphones',
            price: 150
        },

        {
            id: 4,
            name: 'Keyboard',
            price: 80
        }

    ];


    // ==========================
    // Cart Signal
    // ==========================

    cart = signal < Product[] > ([]);


    // ==========================
    // Computed Total
    // ==========================

    totalPrice = computed(() => {

        return this.cart().reduce(
            (sum, product) => sum + product.price,
            0
        );

    });


    // ==========================
    // Effect
    // ==========================

    constructor() {

        effect(() => {

            console.log(
                'Cart items count:',
                this.cart().length
            );

        });

    }


    // ==========================
    // Add Product
    // ==========================

    addToCart(product: Product) {

        this.cart.update(function(currentCart) {

            return [...currentCart, product];

        });

    }


    // ==========================
    // Remove Product
    // ==========================

    removeFromCart(id: number) {

        this.cart.update(function(currentCart) {

            return currentCart.filter(function(product) {

                return product.id !== id;

            });

        });

    }


    // ==========================
    // Clear Cart
    // ==========================

    clearCart() {

        this.cart.set([]);

    }

}