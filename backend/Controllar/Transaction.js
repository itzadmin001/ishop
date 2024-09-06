const TransactionModel = require("../Model/TransactionModel")


class TransactionController {


    create(){

    }
    read(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    let data = []
                    if (id != undefined) {
                        data = await TransactionModel.findById(id)
                        if (!data) {
                            rej({
                                status: 0,
                                msg: "Order not found"
                            })
                        } else {
                            res({
                                status: 1,
                                msg: "Order Found successfully",
                                data,
                                imgBaseUrl: "/images/Product/"
                            })
                        }
                    } else {
                        data = await TransactionModel.find()
                        console.log(data)
                        res({

                            status: 1,
                            data
                        })
                    }
                } catch (err) {
                    console.log(err)
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    })
                }
            }
        )
    }
}

module.exports = TransactionController