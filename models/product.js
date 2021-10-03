const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    title: {
        type: Sequelize.STRING(65),
        allowNull: false
    },
    
    price: {
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
    },
    
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    description: {
        type: Sequelize.STRING(1000),
        allowNull: false
    } 
});

module.exports = Product;
/* const Cart = require('./cart');
const db = require('../util/database');

module.exports = class Product{
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description]);
    }

    static deleteById(id){
        
    }

    static fetchAll(){
        return db.execute('SELECT * FROM products');
    }

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
} */