const express = require('express');
const ProductRouter = express.Router();
const fileUpload = require("express-fileupload");
const ProductControllar = require('../Controllar/ProductControllar');
const { VerifyAdmin } = require('../middleware/isLoggden');




ProductRouter.get(
    "/:id?",
    (req, res) => {
            const data  = new ProductControllar().read(req.params.id , req.query)
            .then((response) =>{
                res.send(response)
            }).catch((error) =>{
                res.send(error)
            })
    })

ProductRouter.post(
    "/create",
    fileUpload({
        createParentPath: true,
    }),
    VerifyAdmin,
    (req, res) => {
        const data = req.body;
        const image = req.files.image
        const createProduct = new ProductControllar().create(data, image)
        .then((success) => {
            res.send(success)
        }).catch((error) => {
            console.log(error)
            res.send(error)
        })
    }
)
ProductRouter.delete(
    "/delete/:id/:imageName",
    VerifyAdmin,
    (req, res) => {
        const dataDelete  = new ProductControllar().delete(req.params.id , req.params.imageName)
        .then((response) => {
            res.send(response)
        }).catch((error) => {
            res.send(error)
        })
    })

ProductRouter.patch(
        "/change-status/:id/:new_status",
        VerifyAdmin,
        (req, res) => {
            const newStatus = new ProductControllar().UpdateStatus(req.params.id,  req.params.new_status)
            .then((success) => {
                res.send(success)
            }).catch((error) => {
                res.send(error)
            })
        })
module.exports = ProductRouter