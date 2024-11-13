const mongoose = require('mongoose');

const transaction = mongoose.Schema({
    order_id:{
        type: String,
        required:true
    },
    razorpay_order_id:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
    },
    razorpay_payment_id:{
        type:String,
        required:true,
    },
    payment_status:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true
})

const TransactionModel = mongoose.model('Transaction', transaction);
module.exports = TransactionModel