const express = require('express');
const AdminRouter = express.Router();

const AdminModel  = require("../Model/AdminModel");
const AdminController = require('../Controllar/AdminControllar');
const { ganrateToken } = require('../.helper');


AdminRouter.post(
    "/login",
    (req, res,) => {
        const LoginAdmin = new AdminController().login(req.body)
        .then(
            (success) => {
                const token = ganrateToken(success.user)
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,  // HTTP के लिए
                    maxAge: 1 * 60 * 60 * 1000 , // 1 घंटे
                  });
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)

AdminRouter.get(
    "/logout",
    (req, res) => {
        res.cookie("token", "");
        res.send({ message: "Logged out successfully." })
    }
)

module.exports = AdminRouter;