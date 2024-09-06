const { getRondomName } = require("../.helper")
const ProductModel = require("../Model/ProductModel");
const { unlinkSync } = require("fs")
const CategoryModel = require('../Model/CategoryModel')
class ProductControllar {

    create(data , image){
            return new Promise(
               async (res , rej) => {
                    try{
                        const imageName = getRondomName(image.name)
                        const destination = "./public/images/Product/"+imageName
                        image.mv(
                         destination, async (err) => {
                             if(err){
                                 rej({
                                     status: 0,
                                     msg: "Failed to save image"
                                 })
                             }else{
                                 data.image = imageName
                                 data.color = JSON.parse(data.color)
                                 const CreateUser = await ProductModel.create(data)
                                 CreateUser.save()

                                     .then((success) => {
                                         res({
                                             status: 1,
                                             msg: "Data Added successfully"
                                         })
                                     }).catch((error) => {
                                         rej({
                                             status: 0,
                                             msg: "Data creation failed"
                                      })
                                  })
                             }
                         }
                        )
                    }catch(err){
                        rej({
                            status:0,
                            msg:"internal server error"
                        })
                    }
                }
            )
    }

    read(id, query) {
        return new Promise(
            async (res, rej) => {
                try {
                    let data = []
                    if (id != undefined) {
                        data = await ProductModel.findById(id).populate(["category" , "color"])
                    } else {
                        const byCategory = await CategoryModel.findOne({slug : query.slug})
                        let newQuery = {}
                        if(byCategory != undefined){
                            newQuery.category = byCategory._id
                            if(query.color && query.color != "null"){
                                    newQuery.color = query.color
                            }
                            data = await ProductModel.find(newQuery).populate(["category" , "color"]).limit(parseInt(query.limit))
                        }else{
                            data = await ProductModel.find().populate(["category" , "color"]).limit(parseInt(query.limit))
                        }
                    }
                    res({
                        status: 1,
                        data,
                        msg: "Data fetched successfully",
                        imgBaseUrl: "/images/Product/"
                    })
                } catch (err) {
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    });
                }
            })

    }
    UpdateStatus(id, status) {
        return new Promise(
            async (res, rej) => {
                try {
                    let UpdateStatusResponse = await ProductModel.findOneAndUpdate({ _id: id }, { status: status })
                    res({
                        status: 1,
                        msg: "Status updated successfully"
                    })
                } catch (err) {
                    rej({
                        status: 0,
                        msg: " internal server error "
                    })
                }
            })
    }
    delete(id, imageName) {
        return new Promise(
            async (res, rej) => {
                try {
                    let data = await ProductModel.findByIdAndDelete(id)
                    unlinkSync("./public/images/Product/" + imageName);
                    res({
                        status: 1,
                        msg: "Data deleted successfully"
                    })
                } catch (err) {
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    });
                }
            })

    }
}

module.exports = ProductControllar;

