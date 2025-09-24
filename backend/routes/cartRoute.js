const express = require('express');
const { addToCart, getUserCart, updateCart } = require('../controllers/cartController');
const { userAuth } = require('../middleware/userAuth');

const cartRouter = express.Router();

cartRouter.post('/add', userAuth, addToCart);
cartRouter.get('/getcartdata', userAuth, getUserCart);
cartRouter.patch('/update', userAuth, updateCart);

module.exports=cartRouter