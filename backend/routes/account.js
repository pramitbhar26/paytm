const express = require('express');
const { Account } = require('../db');
const { authMiddleware } = require('../middleware');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/balance',async(req,res)=>{
    const userProfile = await Account.findOne({
        userId:req.userId
    });

    res.status(200).json({
        balance:userProfile.balance
    })
});
router.post('/transfer',authMiddleware,async(req,res)=>{
    const session = mongoose.startSession();
    const {amount,to}=req.body;
    const account = await Account.findOne({
        userId:req.userId
    }).session(session);
    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient Balance"
        })
    }

    const toAcc = await Account.findOne({
        userId:to
    }).session(session);

    if(!toAcc){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid Account to transfer"
        })
    }

    await Account.updateOne({
        userId:req.userId
    },{$inc: {balance:-amount}}).session(session)

    await Account.updateOne({
        userId:to
    },{$inc: {balance:amount}}).session(session)

    await session.commitTransaction();
    res.status(200).json({
        message:"Transfer Successful"
    })
})
module.exports=router;