const validator = require('validator');

exports.validateSignUpData = (req)=>{
    const {name, email,password} = req.body;
    if(!name || !email || !password){
        throw new Error('All the fields are required!')
    }else if(!validator.isEmail(email)){
        throw new Error('Please provide valid email.')
    }else if(!validator.isStrongPassword(password)){
        throw new Error('Please provide a strong password.')
    }
}

exports.validateLoginData = (req)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new Error('All the fields are required!')
    }
}