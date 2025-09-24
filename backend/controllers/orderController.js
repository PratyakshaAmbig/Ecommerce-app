const OrderModel = require("../models/orderModel");
const UserModel = require("../models/userModle");
const Stripe = require("stripe");

//  global variable
const currency = "inr";
const deliveryCharge = 10;

// gateway initialize

//  placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId } = req;

    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await new OrderModel(orderData);
    await newOrder.save();

    // after save the order we have to clear the user cartData
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// placing order using Strip method
// const placeOrderStrip = async (req, res) => {
//   try {
//     const { userId } = req;

//     const { items, amount, address } = req.body;

//     // origin -> we have to pass the frontend url
//     const { origin } = req.headers;

//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = await new OrderModel(orderData);
//     await newOrder.save();

//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: currency,
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));

//     line_items.push({
//       price_data: {
//         currency: currency,
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: deliveryCharge * 100,
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//       line_items,
//       mode: "payment",
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// Verify stripe
// const  verifyStripe = async (req, res)=>{
//     const {userId} = req;
//     const {orderId, success} = res.body;
//     try {
//         if(success === 'true'){
//             await OrderModel.findByIdAndUpdate(orderId,{payment:true});
//             await UserModel.findByIdAndUpdate(userId,{cartData:{}});

//             res.json({success:true})
//         }else{
//             await OrderModel.findByIdAndDelete(orderId)
//             res.json({success:false})
//         }
//     } catch (error) {
//     console.log(error);
//     res.status(400).json({ success: false, message: error.message });
//     }
// }

// placing order using Razorpay method
const placeOrderRazorpay = async (req, res) => {};

// All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//User order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req;

    const orders = await OrderModel.find({ userId });

    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// update order status from Admin panel
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  placeOrder,
  // placeOrderStrip,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateOrderStatus,
  // verifyStripe
};
