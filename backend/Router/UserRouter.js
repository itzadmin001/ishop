const express = require('express');
const UserController = require('../Controllar/UserControllar');
const { ganrateToken } = require('../.helper');
const UserRouter = express.Router();

UserRouter.post(
    "/create-account",
    (req, res,) => {
            const CreateUser = new UserController().create(req.body)
            .then(
                (success) => {
                    const token = ganrateToken(success.CreateUser)
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: false,  // HTTP के लिए
                        maxAge: 1 * 60 * 60 * 1000 , // 1 घंटे
                        role: success.CreateUser.role
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
UserRouter.post(
    "/login",
    (req, res,) => {
        const LoginUser = new UserController().login(req.body)
        .then(
            (success) => {
                const token = ganrateToken(success.user)
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,  // HTTP के लिए
                    maxAge: 1 * 60 * 60 * 1000 , // 1 घंटे
                  });
                res.send(success)
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)

UserRouter.post(
    "/update-user-cart/:user_id",
    (req, res) => {
                const UserCart = new UserController().updateCart(req.params.user_id, req.body)
                .then(
                    (success) => {
                        res.send(success)
                    }
                ).catch(
                    (err) => {
                        res.send(err)
                    }
                )
    }
)

UserRouter.get(
    "/change-qty/:user_id/:product_id/:qty",
    (req, res) => {
            const Result = new UserController().changeCartQty(req.params.user_id, req.params.product_id,req.params.qty)
            .then(
                (success) => {
                    res.send(success)
                
            }).catch((error) => {
                res.send(error)
            })
})

UserRouter.post(
    "/add-to-cart",
    (req,res) => {
        const Result = new UserController().addtoDbCart(req.body)
        .then(
            (success) => {
                res.send(success)
            }
         ).catch(
            (error) => {
                res.send(error)
            }
         )
    }
)

UserRouter.get(
    "/logout",
    (req, res) => {
        res.cookie("token", "");
        res.send({
            status:1,
            message: "Logged out successfully."
        })
    }
)
module.exports = UserRouter;