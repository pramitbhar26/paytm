const mongoose  =require("mongoose");

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database Connected");
});
const userSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:6,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    }
});

const accountSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    balance:{
        type:Number,
        required:true
    }
});

const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema);
module.exports={
    User,Account
}