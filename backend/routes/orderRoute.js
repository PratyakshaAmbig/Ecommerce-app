const express = require('express');
const { placeOrder, placeOrderRazorpay,allOrders,userOrders,updateOrderStatus, verifyStripe}  = require('../controllers/orderController');
const { adminAuth } = require('../middleware/adminAuth');
const { userAuth } = require('../middleware/userAuth');

const orderRouter = express.Router();

//  Admin features
orderRouter.get('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

// Payment features
orderRouter.post('/place', userAuth, placeOrder);
// orderRouter.post('/stripe', userAuth, placeOrderStrip);
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay);

// User features
orderRouter.get('/userorders', userAuth, userOrders);

// verify payment
// orderRouter.post('/verifyStripe', userAuth,verifyStripe)

module.exports=orderRouter;
