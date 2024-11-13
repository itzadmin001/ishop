const express = require('express');
const { model } = require('mongoose');
const CategoryRouter = express.Router();
const CartegoryController = require("../Controllar/CategoryControllar");
const fileUpload = require("express-fileupload");
const { VerifyAdmin } = require('../middleware/isLoggden');


CategoryRouter.get(
    "/:id?",

    (req, res) => {
            const data  = new CartegoryController().read(req.params.id)
            .then((response) =>{
                res.send(response)
            }).catch((error) =>{
                res.send(error)
            })
    })

CategoryRouter.post(
    "/create",
    fileUpload({
        createParentPath: true,
    }),
    VerifyAdmin,
   async (req, res) => {
    const data = req.body;
    const image = req.files.image;
        const Result =  new CartegoryController().create(data, image )
            .then((success) => {
                res.send(success)
                
            }).catch((error) => {
                res.send(error)
            });

    })

CategoryRouter.delete(
    "/delete/:id/:imageName",
    VerifyAdmin,
    (req, res) => {
        const dataDelete  = new CartegoryController().delete(req.params.id , req.params.imageName)
        .then((response) => {
            res.send(response)
        }).catch((error) => {
            res.send(error)
        })
    })
CategoryRouter.patch(
    "/change-status/:id/:new_status",
    VerifyAdmin,
    (req, res) => {
        const newStatus = new CartegoryController().UpdateStatus(req.params.id,  req.params.new_status)
        .then((success) => {
            res.send(success)
        }).catch((error) => {
            res.send(error)
        })
    })
CategoryRouter.put(
    "/update/:id",
    fileUpload({
        createParentPath: true,
    }),
    VerifyAdmin,
     (req, res) => {
        const EditData = new CartegoryController().edit(req.params.id, req.body , req.files?.image)
        .then((response) => {
            res.send(response)
        }).catch((error) => {
            res.send(error)
        })
    })


module.exports = CategoryRouter;