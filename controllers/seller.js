const Product = require('../models/product');
const Order = require('../models/order');
const sequelize = require('../util/database');
const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
    res.render('seller/edit-product', {
        pageTitle: 'Add Product',
        path: '/seller/add-product',
        editing: false,
        isAuthenticated: req.session.isLoggedIn,
        isSeller: req.session.isSeller,
        isAdmin: req.session.isAdmin
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
        .then(result => {
            console.log('Created Product');
            res.redirect('/seller/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user
        .getProducts({ where: { id: prodId } })
        .then(products => {
            const product = products[0];
            if (!product) {
                return res.redirect('/');
            }
            res.render('seller/edit-product', {
                pageTitle: 'Edit Product',
                path: '/seller/edit-product',
                editing: editMode,
                product: product,
                isAuthenticated: req.session.isLoggedIn,
                isSeller: req.session.isSeller,
                isAdmin: req.session.isAdmin
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;

    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/seller/products');
        })
        .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
        .then(products => {
            res.render('seller/products', {
                prods: products,
                pageTitle: 'Seller Products',
                path: '/seller/products',
                isAuthenticated: req.session.isLoggedIn,
                isSeller: req.session.isSeller,
                isAdmin: req.session.isAdmin

            });
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/seller/products');
        })
        .catch(err => console.log(err));

}

// exports.getViewOrders = (req, res, next) => {
//     // sequelize.query("SELECT b.id AS `P_ID`, b.title, c.quantity, c.orderId, c.createdAt, d.userId, e.mobile FROM sellers a INNER JOIN products b ON a.id=b.sellerId INNER JOIN orderitems c ON b.id=c.productId INNER JOIN orders d ON c.orderId=d.id INNER JOIN users e ON d.userId=e.id WHERE a.id=?", {replacements: [req.user.id] } )
    
//     sequelize.query("SELECT b.orderId, a.id AS `P_ID`, a.title, b.quantity, c.userId, d.mobile, b.updatedAt FROM products a INNER JOIN orderitems b ON a.id=b.productId INNER JOIN orders c ON b.orderId=c.id INNER JOIN users d ON c.userId=d.id WHERE a.sellerId=? ORDER BY c.id, a.id;", {replacements: [req.user.id]})
//         .then((orders) => {
//   
//             res.render('seller/view-orders', {
//                 orders: orders[0],
//                 pageTitle: 'All Orders',
//                 path: '/seller/view-orders',
//                 isAuthenticated: req.session.isLoggedIn,
//                 isSeller: req.session.isSeller,
//                 isAdmin: req.session.isAdmin

//             });
        
//         }).catch(err => {
//             console.log(err);
//         });
// }

// exports.getViewOrders = (req, res, next) => {
//     Order.findAll({ include: ['products'] })
//         .then(orders => {
//             console.log(orders);
            
//         })
//         .catch(err => console.log(err));
// }

// Right One
// exports.getViewOrders = (req, res, next) => {
//     Order.findAll({ include: ['products'] })
//     .then(orders =>{
//             orders.forEach(order =>{
//                 order.products = order.products.filter(product => product.sellerId === req.user.id);
//             });
//             res.render('seller/view-orders', {
//                 orders: orders,
//                 pageTitle: 'All Orders',
//                 path: '/seller/view-orders',
//                 isAuthenticated: req.session.isLoggedIn,
//                 isSeller: req.session.isSeller,
//                 isAdmin: req.session.isAdmin
                
//             });
//     })
//     .catch(err => console.log(err));
// }


// Doing Diff way of Above
exports.getViewOrders = (req, res, next) => {
    Order.findAll({ include: [{ model: Product, where: { sellerId: req.user.id } }, { model: User }] })
    .then(orders =>{
            res.render('seller/view-orders', {
                orders: orders,
                pageTitle: 'All Orders',
                path: '/seller/view-orders',
                isAuthenticated: req.session.isLoggedIn,
                isSeller: req.session.isSeller,
                isAdmin: req.session.isAdmin
                
            });
    })
    .catch(err => console.log(err));
}