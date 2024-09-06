const SecretKey = process.env.GANRATE_TOKEN_SECRET_KEY;
var jwt = require('jsonwebtoken');
const AdminModel = require("../Model/AdminModel");
const { UserpasswordDencrypt } = require('../.helper');
const UserModel = require('../Model/UserModel');

const VerifyAdmin = async (req, res, next) => {
    if (!req.cookies.token) {
        return res.send({
            status: 0,
            msg: "Not Admin Rights "
        });
    } else {
        jwt.verify(req.cookies.token, SecretKey, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.send({
                    status: 0,
                    msg: err.message
                });
            } else {
                const Admin = await AdminModel.findOne({ email: decoded.email });
                if (Admin) {
                    next()
                } else {
                    return res.send({
                        status: 0,
                        msg: "Invalid user "
                    });
                }
            }
        });
    }
};




module.exports = { VerifyAdmin };
