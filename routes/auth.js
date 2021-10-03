const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/user-login', authController.getUserLogin);

router.get('/signup', authController.getSignup);

router.post('/user-login', authController.postUserLogin);

router.get('/seller-login', authController.getSellerLogin);

router.post('/seller-login', authController.postSellerLogin);

router.post('/signup', authController.postSignup);

router.get('/seller-register', authController.getSellerRegister);

router.post('/seller-register', authController.postSellerRegister);

router.get('/admin-login', authController.getAdminLogin);

router.post('/admin-login', authController.postAdminLogin);

router.post('/logout', authController.postLogout);

module.exports = router;