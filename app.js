const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const flash = require('connect-flash');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Seller = require('./models/seller');
const Admin = require('./models/admin');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();
const store = new SequelizeStore({
    db: sequelize,
    tableName: "Session"
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const sellerRoutes = require('./routes/seller');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));
app.use(flash());

app.use((req, res, next) => {
    if(req.session.user){
        User.findById(req.session.user.id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
    }

    else if(req.session.seller){
        Seller.findById(req.session.seller.id)
        .then(seller => {
            req.user = seller;
            next();
        })
        .catch(err => console.log(err));
    }

    else if(req.session.admin){
        Admin.findById(req.session.admin.id)
        .then(admin => {
            req.user = admin;
            next();
        })
        .catch(err => console.log(err));
    }

    else{
        return next();
    }
});
  
app.use('/seller', sellerRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

Product.belongsTo(Seller, { constraints: true, onDelete: 'CASCADE' });
Seller.hasMany(Product);

Cart.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasOne(Cart);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Order);
Order.belongsTo(User ,{ constraints: true, onDelete: 'CASCADE' });

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        app.listen(80);
    })
    .catch(err => {
        console.log(err);
    });
