const { UserpasswordDencrypt } = require("../.helper")
const AdminModel = require("../Model/AdminModel")

class AdminController {
    login(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const Finduser = await AdminModel.findOne({ email: data.email })
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


module.exports = AdminController;