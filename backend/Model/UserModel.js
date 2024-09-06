const mongoose = require('mongoose')


const User = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        maxLength:100
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:true
    }
},
{
    timestamps: true
});

const UserModel = mongoose.model("User", User);
module.exports = UserModel;