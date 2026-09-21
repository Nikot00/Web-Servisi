const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    foodName: String,

    restaurant: String,

    paymentMethod: String,

    account_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "accounts"
    }

})

const Order = mongoose.model("orders", orderSchema)

const create = async(order) => {

    const newOrder = new Order(order)

    return await newOrder.save()

}

const getAll = async(account_id) => {

    return await Order.find({account_id: account_id})

}

const getById = async(account_id, id) => {

    return await Order.findOne({
        account_id: account_id,
        _id: id
    })

}

const remove = async(account_id, id) => {

    return await Order.deleteOne({
        account_id: account_id,
        _id: id
    })

}

const update = async(account_id, id, newOrderData) => {

    return await Order.updateOne(
        {
            account_id: account_id,
            _id: id
        },
        newOrderData
    )


}

module.exports = {
    create,
    getAll,
    getById,
    remove,
    update
}