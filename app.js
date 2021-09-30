const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); //where to find the templates (views)

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const statusCodeController = require('./controllers/statusCodes');


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(statusCodeController.get404);

app.listen(3000);