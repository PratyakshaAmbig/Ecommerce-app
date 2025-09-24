const UserModel = require("../models/userModle");


// add product to user cart
const addToCart = async(req, res)=>{
    try {
        const {userId} = req;
        const {itemId, size} = req.body;

        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            // itemId is not available in the cart then we have to create one object inside that obje i will the size
            cartData[itemId]={};
            cartData[itemId][size] =1;

        }
        await UserModel.findByIdAndUpdate(userId, {cartData});

        return res.json({success:true, message:'Added To Cart.'})

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({success:false, message:error.message});
        
    }
}

// update user cart
const updateCart = async(req,res)=>{
    try {
        const {userId} = req;
        const {itemId, size, quantity} = req.body;
        
        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await UserModel.findByIdAndUpdate(userId, {cartData});
        return res.json({success:true, message:'Cart Updated.'})

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({success:false, message:error.message});
    }
}

// get user cart data
const getUserCart = async(req, res)=>{
    try {

        const {userId} = req;

        const userData = await UserModel.findById(userId);
        let cartData  = await userData.cartData;

        return res.json({success:true, cartData});
        
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({success:false, message:error.message});
    }
}


module.exports={
    addToCart,
    updateCart,
    getUserCart
}