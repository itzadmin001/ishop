const { Schema } = require("mongoose");
const mongoose = require("mongoose")


const Product = mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 30
        },
        slug: {
            type: String,
            maxLength: 30
        },
        image: {
            type: String,
            maxLength: 50
        },
        price: {
            type: Number,
            min : 1
        },
        color:[
            {
                type:Schema.ObjectId,
                ref: "Color"
            }
        ],
        category:{
            type : Schema.ObjectId,
            ref: "Category"
        },
        discount_Price:{
            type:Number,
            min:1
        },
        status:{
            type: Boolean,
            default: true
        },
        stock:{
            type: Boolean,
            default: true
        },
        sale:{
            type: Boolean,
            default: false
        },
        deleted_at :{
            type:Number ,
            default:0
        }
    },
    {
        timestamps: true
    }
)

const ProductModel = mongoose.model("Product", Product);
module.exports = ProductModel;