const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb");
const connectCloudinary = require("./config/cloudinary");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
require('dotenv/config');

// App Config
const app = express();
const PORT = process.env.PORT || 4000;

connectCloudinary();

// middlewares
app.use(express.json());
// we can acces the backend from any IP address
app.use(cors());

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart/',cartRouter);
app.use('/api/order/',orderRouter);

connectDB().then(()=>{
    console.log('Database is connected..')
    app.listen(PORT, ()=>{
    console.log(`Server started on PORT : ${PORT}`)
})
}).catch((err)=>{
    console.log(err)
})
