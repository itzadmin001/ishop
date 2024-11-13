const { RazorpayInstance, verifyPayment } = require("../.helper")
const CartModel = require("../Model/CartModel")
const OrderModel = require("../Model/OrderModel")
const TransactionModel = require("../Model/TransactionModel")


class OrderControllar {
    create({ product_detail, user_id, order_total, user_details }) {
        return new Promise(
            async (res, rej) => {
                try {
                    const order = new OrderModel({
                        product_details: product_detail,
                        shipping_details: user_details,
                        user_id,
                        order_total,
                        order_payment_type: user_details.paymentMode
                    })
                    order.save()
                        .then(
                            (success) => {
                                CartModel.deleteMany({ user_id: user_id })
                                    .then(
                                        (success) => {
                                            if (user_details.paymentMode === 1) {
                                                res({
                                                    status: 1,
                                                    msg: "Order created successfully",
                                                    order_id: order._id,
                                                })
                                            } else {
                                                const options = {
                                                    amount: order_total * 100,  // amount in the smallest currency unit
                                                    currency: "INR",
                                                    receipt: order._id
                                                };
                                                RazorpayInstance.orders.create(options, function (err, RozarpayOrder) {
                                                    if (err) {
                                                        rej({
                                                            status: 0,
                                                            msg: "Failed to create order"
                                                        })
                                                    } else {
                                                        OrderModel.updateOne({ _id: order._id }, { razorpay_oder_id: RozarpayOrder.id })
                                                            .then(
                                                                (success) => {
                                                                    res({
                                                                        status: 1,
                                                                        msg: "Order created successfully",
                                                                        order_id: order._id,
                                                                        RozarpayOrder
                                                                    })
                                                                }
                                                            ).catch(
                                                                (err) => {
                                                                    rej({
                                                                        status: 0,
                                                                        msg: "Failed to update order"
                                                                    })
                                                                }
                                                            )


                                                    }
                                                });
                                            }
                                        }
                                    ).catch(
                                        (err) => {
                                            console.log(err)
                                            rej({
                                                status: 0,
                                                msg: "Failed to delete cart items"
                                            })
                                        }
                                    )

                            }
                        ).catch(
                            (err) => {
                                console.log(err)
                                rej({
                                    status: 0,
                                    msg: "Failed to create order"
                                })
                            }
                        )
                } catch (e) {
                    console.log(e)
                    rej({
                        status: 0,
                        msg: "Error while creating order"
                    })
                }
            }
        )
    }


    read(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    let data = []
                    if (id != undefined) {
                        data = await OrderModel.findById(id)
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
                        data = await OrderModel.find()
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

    Razorpaypaymenthandle({ amount, razorpay_response, order_id }) {
        return new Promise(
            async (res, rej) => {
                if(razorpay_response.razorpay_signature){
                    console.log("signature",)
                    try {
                        const Varify = verifyPayment(
                            razorpay_response.razorpay_order_id,
                            razorpay_response.razorpay_payment_id,
                            razorpay_response.razorpay_signature)
                        if (Varify) {
                            const transaction = new TransactionModel({
                                order_id: order_id,
                                razorpay_order_id: razorpay_response.razorpay_order_id,
                                razorpay_payment_id: razorpay_response.razorpay_payment_id,
                                amount: amount / 100,
                                payment_status: true
                            })
                          transaction.save()
                                .then(
                                    (success) => {
                                        console.log(order_id)
                                        console.log(success)
                                        OrderModel.updateOne({_id: order_id },
                                            {
                                                transcation_id: transaction._id,
                                                order_status: 2,
                                                razorpay_transaction_id: razorpay_response.razorpay_payment_id
                                            })
                                            .then(
                                                (success) => {
                                                    res({
                                                        status: 1,
                                                        msg: "Payment successfully 1",
                                                        order_id: order_id,
                                                    })
                                                }
                                            ).catch((error) => {
                                                console.log(error)
                                                rej({
                                                    status: 0,
                                                    msg: "Failed to update order status"
                                                })
                                            })
                                    }
                                ).catch(
                                    (error) => {
                                        console.log("two", error)
                                        rej({
                                            status: 0,
                                            msg: "Failed to save transaction"
                                        })
                                    }
                                )
    
                        } else {
                            rej({
                                status: 0,
                                msg: "Invalid payment"
                            })
                            return
                        }
                    } catch (err) {
                        rej({
                            status: 0,
                            msg: "Internal server error"
                        })
                    }
                }else{
                    const existingTransaction = await TransactionModel.findOne({
                        razorpay_order_id: razorpay_response.order_id,
                        razorpay_payment_id: razorpay_response.payment_id
                    });
                    if (existingTransaction) {
                        console.log("Duplicate transaction detected, skipping creation.");
                        return;
                    }
                    try{
                        const transaction = new TransactionModel({
                            order_id: order_id,
                            razorpay_order_id: razorpay_response.order_id  ,
                            razorpay_payment_id: razorpay_response.payment_id ,
                            amount: amount / 100,
                            payment_status: false
                        })
                        console.log(transaction)
                        transaction.save()
                        .then(
                            (success) => {
                                OrderModel.updateOne({_id: order_id },
                                    {
                                        transcation_id: transaction._id,
                                        razorpay_transaction_id: razorpay_response.payment_id
                                    })
                                    .then(
                                        (success) => {
                                            res({
                                                status: 0,
                                                msg: "Payment failed ,please try again Later",
                                                order_id: order_id,
                                            })
                                        }
                                    ).catch((error) => {
                                        console.log(error)
                                        rej({
                                            status: 0,
                                            msg: "Failed to update order status"
                                        })
                                    })
                            }
                        ).catch(
                            (error) => {
                                console.log("two", error)
                                rej({
                                    status: 0,
                                    msg: "Failed to save transaction"
                                })
                            }
                        )

                    }catch(err){
                        rej({
                            status: 0,
                            msg: "Invalid payment"
                        })
                        return
                    }

                }
                

            }
        )
    }


   getOrders(query){
    console.log(query)
    return new Promise(
        async (res, rej) => {
            try{
                let dbQuery = {}
                if(query.order_id){
                   dbQuery._id = query.order_id
                }
                if(query.user_id){
                   dbQuery.user_id = query.user_id
                }
                const Orderdata = await OrderModel.find(dbQuery).populate(['user_id','transcation_id'])
                        res({
                            status: 1,
                            msg: "Orders fetched successfully",
                            Orderdata
                        })
            }catch(err){
                rej({
                    status: 0,
                    msg: "Internal server error"
                })
            }
        })

   } 

}

module.exports = OrderControllar;