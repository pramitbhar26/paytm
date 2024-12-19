const jwt =require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({
            message:"Hello you are not authorized"
        })
    }
    const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    }
    catch(err){
        res.status(411).json({})
    }
};

module.exports={
    authMiddleware
}