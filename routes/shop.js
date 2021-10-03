const express = require('express');
const path = require('path');

const isAuthUser = require("../middleware/is-authUser");

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuthUser, shopController.getCart);

router.post('/cart', isAuthUser, shopController.postCart);

router.post('/cart-delete-item', isAuthUser, shopController.postCartDeleteProduct);

router.post('/create-order', isAuthUser, shopController.postOrder);

router.get('/orders', isAuthUser, shopController.getOrders);

module.exports = router;
