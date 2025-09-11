const UserModel = require("../models/userModle");
const { validateSignUpData, validateLoginData } = require("../utils/validation")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Route for user login
const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;

        const findUser = await UserModel.findOne({email});

        if(!findUser){
            throw new Error('User not found please sign up!')
        }
        validateLoginData(req);

        const isPasswordCorrect = await findUser.validatePassword(password);
        if(!isPasswordCorrect){
            throw new Error('Invalid credentials!')
        }
        const token = await findUser.getJWT();
        res.cookie('token', token, {expires: new Date(Date.now() + 8 * 3600000)})
        return res.json({success:true, message:'Login Successfully', token})
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
}


// Route for user registration
const registerUser = async(req, res)=>{
    try {        
        const {name, email,password} = req.body;

        // Check the user is already exists or not
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            throw new Error('User already exists!');
        }

        // validating email format and strong password
        validateSignUpData(req);

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new UserModel({
            name,
            email,
            password:hashedPassword
        });

        const saveUser = await newUser.save();
        const token = await saveUser.getJWT();
        res.cookie('token', token,{expires:new Date(Date.now() + 8 * 3600000)});
        return res.json({success:true, token})

    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
}

// Route for admin login
const adminLogin = async(req, res)=>{
    try {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET_KEY);
            return res.json({success:true, token})
        }else{
            throw new Error('Invalid Credentials!');
        }

    } catch (error) {
        res.status(400).json({success:false, message:error.message});
        console.log(error.message)
    }
}


module.exports={
    loginUser,
    registerUser,
    adminLogin
}