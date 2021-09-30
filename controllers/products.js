const {
    fetchAll
} = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // console.log('In another middleware!');
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        productCss: false,
        page: 'add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            docTitle: 'Shop',
            path: '/shop',
            hasProduct: products.length > 0, //used with handlebars because it only does true / false arguements
            prod: true,
            productCss: true,
            page: 'shop'
        });
    });
};