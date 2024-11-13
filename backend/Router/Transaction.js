const express = require('express');
const TransactionController = require('../Controllar/Transaction');
const TransactionRouter = express.Router();



TransactionRouter.get(
    "/get-transaction/:id?",
    (req, res) => {
        const result = new TransactionController().read(req.params.id)
        .then(
            (success) =>{
                res.send(success)
            }
        ).catch(
            (err) => {
                res.send(err)
            }
        )
    }
)





module.exports = TransactionRouter;



