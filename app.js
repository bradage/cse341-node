const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

// const mainRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(mainRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// challenge express.js
/*
    // app.use((req, res, next) => {
    //     console.log('first middleware');
    //     next();
    // });

    // app.use((req, res, next) => {
    //     console.log('second middleware');
    //     res.send('<p>Assignment solved (almost!)</p>');
    // });

    // app.use('/users', (req, res, next) => {
    //     console.log('/users middleware');
    //     res.send('<p>The Middleware that handles just users</p>');
    // });

    // app.use('/', (req, res, next) => {
    // console.log('/ middleware');
    // res.send('<p>The Middleware that handles just /</p>');
    // });
*/

app.listen(3000);