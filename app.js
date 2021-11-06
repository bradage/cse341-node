const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');



//URLS, PORTS and CORS options for Heroku
const corsOptions = {
  origin: "https://bradagecse.herokuapp.com/",
  optionsSuccessStatus: 200
};



const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://rw:GoeQf8jnWJm9@cluster0-shard-00-00.aomqm.mongodb.net:27017,cluster0-shard-00-01.aomqm.mongodb.net:27017,cluster0-shard-00-02.aomqm.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-3bi6e7-shard-0&authSource=admin&w=majority';

//Port for local hose
const PORT = process.env.PORT || 3000;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  family: 4
};

const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});
//back to main code
const errorController = require('./controllers/error');
const User = require('./models/user');

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter
  }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(
  session({
    secret: 'i4A2tzOuuevNkSA6YA4c',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});

app.use(cors(corsOptions));

mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: 'Bradage',
    //       email: 'bradage@fake.com',
    //       cart: {
    //         items: []
    //       }
    //     });
    //     user.save();
    //   }
    // });
    app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
  })
  .catch(err => {
    console.log(err);
  });