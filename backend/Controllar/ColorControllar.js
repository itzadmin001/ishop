const ColorModel = require("../Model/ColorModel");

class ColorController {
    create(data){
        return new Promise(
           async (res, rej) => {
                try{
                    const color = await ColorModel.create(data)
                    color.save()
                    .then((success) => {
                        res({
                            status: 1,
                            msg: "Data saved successfully",
                        })
                    }).catch((err) => {
                        rej({
                            status: 0,
                            msg: "Data not saved",
                        })
                    })
                }catch(err){
                    rej({
                        status: 0,
                        msg: "internal server error",
                    })
                }
            })
    }
    read(id){
        return new Promise(
           async (res, rej) => {
                try{
                    let data = []
                    if(id != undefined){
                        data = await ColorModel.findById(id)
                    }else{
                        data = await ColorModel.find()
                    }
                    res({
                        status: 1,
                        msg: "Data fetched successfully",
                        data,
                    })
                }catch(err){
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    })
                }
            }
        )
    }
    update(id, new_status){
        return new Promise(
           async (res, rej) => {
                try{
                    const data = await ColorModel.findOneAndUpdate({_id:id},{ status: new_status})
                    res({
                        status: 1,
                        msg: "Data updated successfully",
                    })
                }catch(err){
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    })
                }
            }
        )
    }
    edit(id, data){
        return new Promise(
            async (res, rej) => {
                try{
                    const color = await ColorModel.findByIdAndUpdate({_id:id}, data)
                    color.save()
                    res({
                        status: 1,
                        msg: "Data updated successfully",
                    })
                }catch(err){
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    })
                }
            }
        )

    }
    delete(id){
        return new Promise(
            (res, rej) => {
                try{
                    const DeleteDeta = ColorModel.findOneAndDelete({_id:id})
                    .then((success)=>{
                        res({
                            status: 1,
                            msg:"data deleted successfully"
                        })
                    }).catch(
                        (err) => {
                            res({
                                status:0,
                                msg:"data deleted successfully"
                            })
                        })
                }catch(err){
                    rej({
                        status: 0,
                        msg: "Internal server error"
                    })
                }
            }
        )
    }
}

module.exports = ColorController;