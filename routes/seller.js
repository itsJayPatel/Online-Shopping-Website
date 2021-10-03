const express = require('express');
const path = require('path');

const router = express.Router();

const isAuthSeller = require("../middleware/is-authSeller");

const sellerController = require('../controllers/seller');

router.get('/add-product', isAuthSeller, sellerController.getAddProduct);

router.get('/products', isAuthSeller, sellerController.getProducts);

router.post('/add-product', isAuthSeller, sellerController.postAddProduct);

router.get('/edit-product/:productId', isAuthSeller, sellerController.getEditProduct);

router.post('/edit-product', isAuthSeller, sellerController.postEditProduct);

router.post('/delete-product', isAuthSeller, sellerController.postDeleteProduct);

router.get('/view-orders', isAuthSeller, sellerController.getViewOrders);

// router.get('/orders', sellerController.getOrders);

module.exports = router;