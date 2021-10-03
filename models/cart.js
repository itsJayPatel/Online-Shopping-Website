const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;


/* const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice){
        
        // Fetch the previous cart
        fs.readFile(filePath, (err, data) => {
            let cart = { products: [], totalPrice: 0 };
            if(!err){
                cart = JSON.parse(data);
            }

            // Analyze the cart => Find existing product/ increase quantity
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }

            // Add new product
            else{
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(filePath, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice){
        fs.readFile(filePath, (err, data) => {
            if(err){
                return;
            }

            const updatedCart = {...JSON.parse(data)};
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(filePath, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(cb){
        fs.readFile(filePath, (err, data) => {
            if(err){
                cb(null);
            }
            else{
                const cart = JSON.parse(data);
                cb(cart);
            }
        });
    }
} */