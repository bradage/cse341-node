const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

/*

    needed only if using handle bars

*/
// const expressHbs = require('express-handlebars'); 
// app.engine('hbs', expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout'
// }));

const app = express();

app.set('view engine', 'ejs');
// app.set('view engine', 'pug');
app.set('views', 'views'); //where to find the templates (views)

// const mainRoutes = require('./routes/index');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(mainRoutes);
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {
        docTitle: '404 Not Found'
    });
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