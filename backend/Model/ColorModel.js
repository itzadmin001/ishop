const mongoose = require('mongoose');


const Color = mongoose.Schema({
    name: {
        type: String,
        maxLength: 30
    },
    color: {
        type: String,
        maxLength: 50
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

const ColorModel = mongoose.model('Color', Color);
module.exports = ColorModel;