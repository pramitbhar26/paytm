const express = require("express");
const router = express.Router();
const { user,signinBody, updateBody } = require("../types");
const {User,Account} = require("../db");
const app=express();
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

router.post('/signin',async(req,res)=>{
    const userPayload = req.body;
    const parsedPayload = signinBody.safeParse(userPayload);
    if(!parsedPayload.success){
        return res.status(411).json({
            message:"Email is already taken or Your input is incorrect"
        });
    }
    const userProfile = await User.findOne({
        username:userPayload.username,
        password:userPayload.password
    });
    if(!userProfile){
        return res.status(411).json({
            message:"Email is already taken or Your input is incorrect"
        });
    }
    const token = jwt.sign({
        userId:userProfile._id
    },process.env.JWT_SECRET);
    return res.status(200).json({
        token:token
    })
});
router.post('/signup',async(req,res)=>{
    const userPayload=req.body;
    const parsedPayload = user.safeParse(userPayload);
    if(!parsedPayload.success){
        return res.status(411).json({
            message:"Email is already taken or Your input is incorrect"
        });
    }
    const existingUser = await User.findOne({
        username:userPayload.username
    });

    if(existingUser){
        return res.status(411).json({
            message:"Email is already taken or Your input is incorrect"
        });
    }
    const userProfile = await User.create({
        username:userPayload.username,
        password:userPayload.password,
        firstname:userPayload.firstname,
        lastname:userPayload.lastname
    })
    const userId = userProfile._id;
    await Account.create({
        userId,
        balance:1+Math.random()*1000
    })
    const token = jwt.sign({
        userId
    },process.env.JWT_SECRET);
    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

router.put("/",authMiddleware,async(req,res)=>{
    const userPayload=req.body;
    const parsedPayload = updateBody.safeParse(userPayload);
    if(!parsedPayload.success){
        res.status(411).json({});
    }
    await User.updateOne(req.body,{
        _id:req.userId
    })
    res.status(200).json({
        message:"User id updated Successfully"
    })
})
router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";
    const existingUser = await User.find({
        $or:[
            {firstname:{$regex: `^${filter}$`, $options:"i"}},
            {lastname:{$regex: `^${filter}$`, $options:"i"}}
        ]
    });

    if(existingUser.length>0){
        return res.status(200).json({
            users:existingUser.map(user=>({
                firstname:user.firstname,
                lastname:user.lastname,
                id:user._id
            }))
        })
    }else{
        return res.status(201).json({
            "message":"No user found!"
        })
    }
})


module.exports=router;