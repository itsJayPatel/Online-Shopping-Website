const Seller = require("../models/seller");
const User = require("../models/user");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

exports.getUserLogin = (req, res, next) => {
    let errorMessage = req.flash('error');
    if(errorMessage.length > 0){
        errorMessage = errorMessage[0];
    }
    else{
        errorMessage = null;
    }
    
    res.render('auth/user-login', {
        pageTitle: 'User Login',
        path: '/user-login',
        isAuthenticated: false,
        errorMessage: errorMessage,
    });
}

exports.getSellerLogin = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/seller-login', {
        pageTitle: 'Seller Login',
        path: '/seller-login',
        isAuthenticated: false,
        errorMessage: message
    });
}

exports.getAdminLogin = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/admin-login', {
        pageTitle: 'Admin Login',
        path: '/admin-login',
        isAuthenticated: false,
        errorMessage: message
    });
}

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false,
        errorMessage: message
    });
}

exports.getSellerRegister = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/seller-register', {
        path: '/seller-register',
        pageTitle: 'Seller Registration',
        isAuthenticated: false,
        errorMessage: message
    });
}

exports.postUserLogin = (req, res, next) => {
    const mobile = req.body.mobile;
    const password = req.body.password;
    
    User.findOne({where: {mobile: mobile} })
        .then(user => {
            if (!user) {
                req.flash('error', 'User not found.');
                req.session.save(err => {
                    console.log(err);
                    return res.redirect('/user-login');
                });
                
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.isSeller = false;
                        req.session.isAdmin = false;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    req.flash('error', 'Invalid Password!');
                    req.session.save(err => {
                        console.log(err);
                        res.redirect('/user-login');
                    });
                    
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/user-login');
                });
            })
        .catch(err => console.log(err));
};

exports.postSellerLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    Seller.findOne({where: {email: email} })
        .then(seller => {
            if (!seller) {
                req.flash('error', 'Seller not found.');
                req.session.save(err => {
                    console.log(err);
                    return res.redirect('/seller-login');
                });
                
            }
            bcrypt.compare(password, seller.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.isSeller = true;
                        req.session.isAdmin = false;
                        req.session.seller = seller;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    req.flash('error', 'Invalid Password!');
                    req.session.save(err => {
                        console.log(err);
                        res.redirect('/seller-login');
                    });
                    
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/seller-login');
                });
            })
        .catch(err => console.log(err));
};

exports.postAdminLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    Admin.findOne({where: {email: email} })
        .then(admin => {
            if (!admin) {
                req.flash('error', 'Admin not found.');
                req.session.save(err => {
                    console.log(err);
                    return res.redirect('/admin-login');
                });
                
            }
            else if(password === admin.password)
            {
                req.session.isLoggedIn = true;
                req.session.isAdmin = true;
                req.session.isSeller = false;
                req.session.admin = admin;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }    
            else{
                req.flash('error', 'Invalid Password!');
                req.session.save(err => {
                    console.log(err);
                    res.redirect('/admin-login');
                });
            }
                    
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
};

exports.postSignup = (req, res, next) => {
    const mobile = req.body.mobile;
    const password = req.body.password;

    User.findOne({ where: { mobile: mobile } })
        .then(user => {
            if(user) {
                req.flash('error', 'Mobile Number is already registered!');
                req.session.save(err => {
                    console.log(err);
                    return res.redirect('/signup');
                });
                
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    User.create( {
                        mobile: mobile,
                        password: hashedPassword
                    } )
                    .then(result => {
                        return User.findOne({ where: { mobile: mobile } })
                    })
                    .then(user => {
                        return user.createCart()
                            .then(result => {
                                User.findOne({ where: { mobile: mobile } })
                                .then(user => {
                                    req.session.isLoggedIn = true;
                                    req.session.isSeller = false;
                                    req.session.isAdmin = false;
                                    req.session.user = user;
                                    req.session.save(err => {
                                        console.log(err);
                                        res.redirect('/');
                                    });
                                })
                            })
                        })
                    })
                    
            })
        .catch(err => console.log(err));
}

exports.postSellerRegister = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    Seller.findOne({ where: { email: email } })
        .then(seller => {
            if(seller) {
                req.flash('error', 'E-Mail is already registered!');
                req.session.save(err => {
                    console.log(err);
                    return res.redirect('/signup');
                });
                
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    Seller.create( {
                        email: email,
                        password: hashedPassword
                    } )
                    .then(result => {
                        Seller.findOne( { where: { email: email } } )
                            .then(seller => {
                                req.session.isLoggedIn = true;
                                req.session.isSeller = true;
                                req.session.isAdmin = false;
                                req.session.seller = seller;
                                return req.session.save(err => {
                                    console.log(err);
                                    res.redirect('/');
                                });
                            })
                        
                    })
                })
        })
        .catch(err => console.log(err));
}