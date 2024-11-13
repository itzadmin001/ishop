const Cryptr = require('cryptr');
const cryptr = new Cryptr('ishop_!@#$');
const Razorpay = require("razorpay");
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config();

// SecretKey = "ishop_@123";

const SecretKey  = process.env.GANRATE_TOKEN_SECRET_KEY

function ganrateToken (user) {
        return  token = jwt.sign({ email: user.email , role:user.role}, SecretKey);  
}


function verifyPayment(order_id, razorpay_payment_id, razorpay_signature) {
    const secret = "UwXc0YUUK8JR0SXZFfibB8X5"
    // Generate the signature
    const generated_signature = crypto
        .createHmac('sha256', secret)
        .update(order_id + "|" + razorpay_payment_id)
        .digest('hex');

    // Compare the generated signature with the received signature
    if (generated_signature === razorpay_signature) {
        console.log("Payment is successful");
        return true;
    } else {
        console.log("Payment verification failed");
        return false;
    }
}


const RazorpayInstance = new Razorpay({
    key_id: 'rzp_test_4BD1Vo8NcmQipy',
    key_secret: 'UwXc0YUUK8JR0SXZFfibB8X5',
  });





const Userpasswordencrypt = (password) =>{
    return cryptr.encrypt(password)
}
const UserpasswordDencrypt = (password) =>{
    return cryptr.decrypt(password)
}



function getRondomName(file_name) {
    return new Date().getTime() + Math.floor(Math.random() *1000) + file_name
}

module.exports = {getRondomName ,verifyPayment,SecretKey,Userpasswordencrypt,ganrateToken ,RazorpayInstance,UserpasswordDencrypt};