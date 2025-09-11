const jwt = require('jsonwebtoken');

exports.adminAuth = async(req, res, next)=>{
    try {
        const {token} = req.headers;

        if(!token){
            throw new Error('Not Authorized Login Again.');
        }

        const decode_token = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log(decode_token);

        if(decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            throw new Error('Not Authorized Login Again.');
        }
        next();

    } catch (error) {
        console.log(error.message);
        res.status(401).json({success:false, message:error.message})
    }
}

