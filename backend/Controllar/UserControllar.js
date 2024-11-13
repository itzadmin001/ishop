const { Userpasswordencrypt, UserpasswordDencrypt, ganrateToken} = require("../.helper")
const UserModel = require("../Model/UserModel")
const CartModel = require("../Model/CartModel");


class UserController {
    create(data) {
        return new Promise(
            async (res, rej) => {
                if (data.password != data.confirm_Password) {
                    rej({
                        status: 0,
                        msg: "Password and confirm password should be same"
                    })
                    return;
                } else {
                    try {
                        const FindUser = await UserModel.findOne({ email: data.email })
                        if (FindUser) {
                            rej({
                                status: 0,
                                msg: "Email already exists"
                            })
                        } else {
                            const CreateUser = await UserModel.create({ name: data.name, email: data.email, password: Userpasswordencrypt(data.password) })
                            CreateUser.save()
                                .then(
                                    (success) => {
                                       
                                        res({
                                            status: 1,
                                            CreateUser,
                                            msg: "User created successfully"
                                        })
                                    }
                                ).catch(
                                    (error) => {
                                        console.log(error);
                                        rej({
                                            status: 0,
                                            msg: "Failed to create user"
                                        })
                                    }
                                )

                        }
                    } catch (err) {
                        console.log(err)
                        rej({
                            status: 0,
                            msg: "Internal server error"
                        })
                    }
                }

            }
        )

    }
    login(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const Finduser = await UserModel.findOne({ email: data.email })
                    if (Finduser) {
                        if (data.password === UserpasswordDencrypt(Finduser.password))
                            Finduser.password = "********"
                        res({
                            status: 1,
                            msg: "Login Successful",
                            user: Finduser
                        })
                    } else {
                        rej({
                            status: 0,
                            msg: "User not found"
                        })
                    }
                } catch (err) {
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    })
                }
            }
        )
    }

    updateCart(user_id, { state_user }) {
        return new Promise(
            async (res, rej) => {
                try {
                    for (let c of state_user) {
                        const Dbcart = await CartModel.findOne({ user_id: user_id, product_id: c.pId })
                        if (Dbcart) {
                            await CartModel.updateOne({ _id: Dbcart._id }, { qty: Dbcart.qty + c.qty })
                        } else {
                            const newCart = new CartModel({
                                user_id: user_id,
                                product_id: c.pId,
                                qty: c.qty
                            });
                            await newCart.save()
                        }
                    }
                    const UserCart = await CartModel.find({ user_id: user_id }).populate("product_id")
                    res({
                        status: 1,
                        msg: "Cart created successfully",
                        UserCart
                    })
                } catch (e) {
                    console.log(e)

                }
            }
        )
    }

    changeCartQty(user_id, product_id, qty) {
        return new Promise(
            async (res, rej) => {
                try {
                    if (qty == 0) {
                        CartModel.deleteOne({ user_id: user_id, product_id: product_id })
                            .then(
                                (success) => {
                                    res({
                                        status: "1",
                                        msg: "data deleted"
                                    })
                                }
                            ).catch((error) => {
                                rej({
                                    status: 0,
                                    msg: "Failed to update quantity"
                                })
                            })
                    } else {
                        console.log("else")
                        CartModel.updateOne({ user_id: user_id, product_id: product_id }, { qty: qty })
                            .then(
                                (success) => {
                                    res({
                                        status: 1,
                                        msg: "updated quantity"
                                    })
                                }
                            ).catch(
                                (error) => {
                                    rej({
                                        status: 0,
                                        msg: "Failed to update quantity"
                                    })
                                }
                            )
                    }

                } catch (e) {
                    console.log(e)
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    })
                }
            }
        )
    }
    addtoDbCart(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const existingCart = await CartModel.findOne({ user_id: data.user_id, product_id: data.product_id })
                    if (existingCart) {
                        existingCart.updateOne({ _id: existingCart._id }, { qty: existingCart.qty + 1 })
                            .then(
                                (sucess) => {
                                    res({
                                        status: 1,
                                        msg: " qty updated successfully"
                                    })
                                }
                            ).catch(
                                (err) => {
                                    rej({
                                        status: 0,
                                        msg: " qty are not update"
                                    })
                                }
                            )

                    } else {
                        const cart = new CartModel(data)
                        cart.save()
                            .then(
                                (sucess) => {
                                    res({
                                        status: 1,
                                        msg: "data added successfully"
                                    })
                                }
                            ).catch(
                                (err) => {
                                    rej({
                                        status: 0,
                                        msg: " unable to add data"
                                    })
                                }
                            )

                    }
                } catch (e) {
                    rej({
                        status: 0,
                        msg: "internal server error"
                    })
                }

            }
        )
    }
}

module.exports = UserController;