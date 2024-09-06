const mongoose = require('mongoose')


const Admin = mongoose.Schema({
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

const AdminModel = mongoose.model("admin", Admin);
module.exports = AdminModel;