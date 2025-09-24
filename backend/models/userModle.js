const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    }
},{minimize:false});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY, {expiresIn:'1d'});
    return token;
}

userSchema.methods.validatePassword = async function(inputPassword){
    const hashedPassword = this.password;
    const isPasswordCorrect = await bcrypt.compare(inputPassword, hashedPassword);
    return isPasswordCorrect;
}

const UserModel = mongoose.models.user || mongoose.model('user',userSchema);

module.exports=UserModel;