const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


//URLS, PORTS and CORS options for Heroku
const corsOptions = {
  origin: "https://bradagecse.herokuapp.com/",
  optionsSuccessStatus: 200
};



const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://rw:GoeQf8jnWJm9@cluster0-shard-00-00.aomqm.mongodb.net:27017,cluster0-shard-00-01.aomqm.mongodb.net:27017,cluster0-shard-00-02.aomqm.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-3bi6e7-shard-0&authSource=admin&retryWrites=true&w=majority';

//Port for local hose
const PORT = process.env.PORT || 3000;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  family: 4
};

//back to main code
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
  User.findById('6162286f8945b41734984bba')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.use(cors(corsOptions));

mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Bradage',
          email: 'bradage@fake.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
  })
  .catch(err => {
    console.log(err);
  });