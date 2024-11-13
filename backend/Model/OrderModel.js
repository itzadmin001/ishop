const mongoose = require('mongoose');


const Oder = mongoose.Schema({

    user_id:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    order_total :{
        type:Number,
        required: true
    }, 
    shipping_details:{ 
        type: Object,
        required: true
    },
    product_details:{
        type:Array,
        required: true
    },
    razorpay_oder_id:{
        type:String,
        default : null
    },
    transcation_id:{
        type:mongoose.Schema.ObjectId,
        default:null,
        ref: 'Transaction'
    },
    razorpay_transaction_id:{
        type:String,
        default : null
    },
    order_payment_type:{
        type:Number,
        enum: [1,2],
        default: 1
        // 1. online , 2. offline
    },
    order_status:{
        type: Number,
        enum: [1,2,3,4,5,6],
        // 1 . payment pending , 2. payment done , 3. shipped , 4. delivered , 5. cancelled, 6. return  
        default: 1  
    }
},
{
    timestamps: true
})

const OrderModel = mongoose.model('Order', Oder);
module.exports = OrderModel;