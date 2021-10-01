const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            docTitle: 'All Products',
            path: '/products',
            formsCSS: false,
            productCSS: true
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'Shop',
            path: '/',
            formsCSS: false,
            productCSS: true
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        docTitle: 'Shopping Cart',
        path: '/cart',
        formsCSS: false,
        productCSS: true
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        docTitle: 'Your Orders',
        path: '/orders',
        formsCSS: false,
        productCSS: true
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/chekcout',
        formsCSS: false,
        productCSS: true
    });
};