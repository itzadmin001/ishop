const express = require('express');
const OderRouter = express.Router();
const OderControllar = require("../Controllar/OderController");
const OrderControllar = require('../Controllar/OderController');
const { VerifyAdmin } = require('../middleware/isLoggden');

OderRouter.post(
    "/create-order",
    (req, res) => {
            const result = new OderControllar().create(req.body)
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

OderRouter.get(
    "/get-order/:id",
    (req, res) => {
        const Result = new OrderControllar().read(req.params.id)
        .then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (err) => {
                res.send(err)
            }
        )

    })


OderRouter.post(
    "/razorpay-payment-handle",
    (req, res) => {
        const result = new OderControllar().Razorpaypaymenthandle(req.body)
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


OderRouter.get(
    "/get-order",
    VerifyAdmin,
    (req,res) => {
        const Result = new OrderControllar().getOrders(req.query)
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
module.exports = OderRouter;