const MONGODB_URL = 'mongodb://rw:GoeQf8jnWJm9@cluster0-shard-00-00.aomqm.mongodb.net:27017,cluster0-shard-00-01.aomqm.mongodb.net:27017,cluster0-shard-00-02.aomqm.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-3bi6e7-shard-0&authSource=admin&retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('616207c73cedaec998a0798f')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb://rw:GoeQf8jnWJm9@cluster0-shard-00-00.aomqm.mongodb.net:27017,cluster0-shard-00-01.aomqm.mongodb.net:27017,cluster0-shard-00-02.aomqm.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-3bi6e7-shard-0&authSource=admin&retryWrites=true&w=majority'
    // MONGODB_URL, options
  )
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });

// const cors = require('cors') // Place this with other requires (like 'path' and 'express')
// ...
// const corsOptions = {
//     origin: "https://<your_app_name>.herokuapp.com/",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const options = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     family: 4
// };

// const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://<username>:<username>@cse341cluster-3dwlw.mongodb.net/test?retryWrites=true&w=majority";