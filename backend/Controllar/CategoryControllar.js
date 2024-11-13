const { getRondomName } = require("../.helper")
const CategoryModel = require("../Model/CategoryModel")
const { unlinkSync } = require("fs")
const ProductModel = require("../Model/ProductModel")


class CategoryControllar {
    create(data, image) {
        return new Promise((resolve, reject) => {
            try {
                const imageName = getRondomName(image.name)
                const destination = "./public/images/Category/" + imageName
                image.mv(
                    destination,
                    async (err) => {
                        if (err) {
                            reject({
                                status: 0,
                                msg: "Failed to save image",
                                error: err
                            });
                            return;
                        } else {
                            data.image = imageName
                            const CreateUser = await CategoryModel.create(data)
                                .then((success) => {
                                    resolve({
                                        status: 1,
                                        msg: "Data Added successfully"
                                    })
                                }).catch((error) => {
                                    reject({
                                        status: 0,
                                        msg: "Data creation failed"
                                    })
                                })
                        }
                    }
                )
            } catch (err) {
                console.log(err)
                reject({
                    status: 0,
                    msg: " internal server error "
                });
            }
        })
    }

    read(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    let data = []
                    if (id != undefined) {
                        data = await CategoryModel.findById(id)

                    } else {
                        data = await CategoryModel.find()
                    }
                    res({
                        status: 1,
                        data,
                        msg: "Data fetched successfully",
                        imgBaseUrl: "/images/Category/"
                    })
                } catch (err) {
                    console.log(err)
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    });
                }
            })

    }
    delete(id, imageName) {
        return new Promise(
            async (res, rej) => {
                try {
                    const ProductCount = await ProductModel.find({category:id}).countDocuments()
                    if(ProductCount != 0 ){
                        rej({
                            status: 0,
                            msg: "Cannot delete this category because it has products"
                        })
                        return;
                    }
                    let data = await CategoryModel.findByIdAndDelete(id)
                    unlinkSync("./public/images/Category/" + imageName);
                    res({
                        status: 1,
                        msg: "Data deleted successfully"
                    })
                } catch (err) {
                    console.log(err)
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    });
                }
            })

    }

    edit(id, data, files) {
        return new Promise(
            async (res, rej) => {
                try {
                    if (files != undefined) {
                        let imageName = getRondomName(files.name);
                        const destination = "./public/images/Category/"+imageName
                        files.mv(destination, async (err) => {
                            if(err) {
                                rej({
                                    status: 0,
                                    msg: "Failed to save image",
                                })
                            }else{
                                let Edit = await CategoryModel.findByIdAndUpdate({ _id: id }, {...data, image: imageName })
                                .then((success) => {
                                    unlinkSync("./public/images/Category/" + data.old_image)
                                    res({
                                        status: 1,
                                        msg: "Data updated successfully",
                                    })
                                }).catch((error) => {
                                    res({
                                        status: 0,
                                        msg: "Data update failed",
                                    })
                                })
                            }

                        })
                    } else {
                        let Edit = await CategoryModel.findByIdAndUpdate({ _id: id }, { name: data.name, slug: data.slug})
                        .then((success) => {
                            res({
                                status: 1,
                                msg: "Data updated successfully",
                            })
                        }).catch((error) => {
                            res({
                                status: 0,
                                msg: "Data update failed",
                            })
                        })
                    }   
                } catch (err) {
                    rej({
                        status: 0,
                        msg: " internal server error "
                    })
                }
            })

    }
    UpdateStatus(id, status) {
        console.log(id, status)
        return new Promise(
            async (res, rej) => {
                try {
                    let UpdateStatusResponse = await CategoryModel.findOneAndUpdate({ _id: id }, { status: status })
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
}

module.exports = CategoryControllar;