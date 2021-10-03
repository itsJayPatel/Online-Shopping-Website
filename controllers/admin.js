const Seller = require("../models/seller");
const Order = require('../models/order');
const sequelize = require('../util/database');
const Product = require("../models/product");
const User = require("../models/user");

exports.getSellers = (req, res, next) => {
    Seller.findAll()
        .then(sellers => {
            res.render('admin/sellers', {
                sellers: sellers,
                pageTitle: 'All Sellers',
                path: '/admin/sellers',
                isAuthenticated: req.session.isLoggedIn,
                isSeller: req.session.isSeller,
                isAdmin: req.session.isAdmin
            });
        })
    .catch(err => {
        console.log(err);
    });
}

// exports.getAllOrders = (req, res, next) => {
//     sequelize.query("SELECT b.orderId, b.productId, b.quantity, a.userId, c.mobile, a.updatedAt FROM orders a INNER JOIN orderitems b ON a.id=b.orderId INNER JOIN users c ON a.userId=c.id ORDER BY a.id, b.productId;")
//         .then((orders) => {
//             res.render('admin/all-orders', {
                
//                 orders: orders[0],
//                 pageTitle: 'All Orders',
//                 path: '/admin/all-orders',
//                 isAuthenticated: req.session.isLoggedIn,
//                 isSeller: req.session.isSeller,
//                 isAdmin: req.session.isAdmin
//             });
        
//         }).catch(err => {
//             console.log(err);
//         });
// }

exports.getAllOrders = (req, res, next) => {
    Order.findAll({ include: ['products', 'user'] })
    .then(orders =>{
            res.render('admin/all-orders', {
                orders: orders,
                pageTitle: 'All Orders',
                path: '/admin/all-orders',
                isAuthenticated: req.session.isLoggedIn,
                isSeller: req.session.isSeller,
                isAdmin: req.session.isAdmin
                
            });
    })
    .catch(err => console.log(err));
}