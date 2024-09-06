const mongoose = require('mongoose');


const Category = mongoose.Schema({

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
        maxLength: 100
    },
    status:{
        type: Boolean,
        default: true
    }
    
},
{   
    timestamps: true
}
)

const CategoryModel = mongoose.model('Category', Category);
module.exports = CategoryModel;