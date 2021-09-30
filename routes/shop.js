const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

// original
// router.get('/', (req, res, next) => {
//     console.log('shop.js', adminData.products);
//     res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// });

//render pug
router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {
        prods: products,
        docTitle: 'Shop',
        path: 'shop',
        hasProduct: products.length > 0, //used with handlebars because it only does true / false arguements
        prod: true,
        productCss: true,
        page: 'shop'
    });
});

module.exports = router;