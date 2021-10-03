const express = require('express');

const adminController = require('../controllers/admin');

const isAuthAdmin = require("../middleware/is-authAdmin");

const router = express.Router();

router.get('/sellers', isAuthAdmin, adminController.getSellers);

router.get('/all-orders', isAuthAdmin, adminController.getAllOrders);

module.exports = router;