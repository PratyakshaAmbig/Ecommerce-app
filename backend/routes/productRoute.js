const express = require('express');
const { addProduct, removeProduct, singleProduct, listProducts } = require('../controllers/productController');
const upload = require('../middleware/multer');
const { adminAuth } = require('../middleware/adminAuth');

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProduct);
productRouter.delete('/remove/:productId', adminAuth, removeProduct);
productRouter.get('/single/:productId', singleProduct);
productRouter.get('/list', listProducts);

module.exports=productRouter;


