const mongoose = require('mongoose');


const Cart = mongoose.Schema({
    user_id:{
        type : mongoose.Schema.ObjectId,
        ref:"user"

    },
    product_id:{
        type:mongoose.Schema.ObjectId,
        ref:"Product"
    },
    qty:{
        type :Number,
        default:1
    }
},
{
    timestamps: true
});

const CartModel = mongoose.model("cart" , Cart);
module.exports = CartModel;