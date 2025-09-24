const jwt = require('jsonwebtoken');

exports.userAuth = async(req, res, next)=>{
    try {
        const {token} = req.headers;

        if(!token){
            return res.json({success:false, message:'Not Authorized Login Again'})
        }

        const decode_token = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = decode_token.userId;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false, message:error.message});
    }
}