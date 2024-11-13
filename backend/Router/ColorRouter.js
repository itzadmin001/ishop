const express = require('express');
const ColorRouter = express.Router();
const ColorController = require("../Controllar/ColorControllar");



ColorRouter.get(
    "/:id?",
    (req, res) => {
        const getcolor = new ColorController().read(req.params.id)
        .then((response) =>{
            res.send(response)
        }).catch((error) => {
            res.send(error)
        })
    })

ColorRouter.post(
    "/create",
    (req , res) => {
    const createColor = new ColorController().create(req.body)
    .then((success) =>{
        res.send(success)
    }).catch((err) => {
        res.send(err)
    })
})

ColorRouter.patch(
    "/change-status/:id/:new_status",
    (req, res) => {
            const UpdateStatus = new ColorController().update(req.params.id ,req.params.new_status)
            .then((response) => {
                res.send(response)
            }).catch((error) => {
                res.send(error)
            })
    })

ColorRouter.put(
    "/update/:id",
    (req, res) => {
        const Updatedata = new ColorController().edit(req.params.id, req.body)
        .then((response) => {
            res.send(response)
        }).catch((error) => {
            res.send(error)
        })
    }
)

ColorRouter.delete(
    "/delete/:id",
    (req, res) => {
        const DelColor  = new ColorController().delete(req.params.id)
        .then((success) => {
            res.send(success)
        }).catch(
            (err)=> {
                res.send(err)
            }
        )
    }
)

module.exports = ColorRouter;