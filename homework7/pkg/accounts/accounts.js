const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String
})

const Account = mongoose.model("accounts", accountSchema)

const create = async(account) => {
    const newAccount = new Account(account)
    return await newAccount.save()
}

const getAll = async() => {
    return await Account.find({})
}

const getById = async(id) => {
    return await Account.findOne({_id: id})
}

const getByEmail = async(email) => {
    console.log("EMAIL:", email)

    const account = await Account.findOne({email: email}).maxTimeMS(5000)

    console.log("ACCOUNT:", account)

    return account
}

const remove = async(id) => {
    return await Account.deleteOne({_id: id})
}

const update = async(id, newAccountData) => {
    return await Account.updateOne({_id: id}, newAccountData)
}

const setNewPassword = async(id, newPassword) => {

    return await Account.updateOne(
        {_id: id},
        {password: newPassword}
    )

}

module.exports = {
    create,
    getAll,
    getById,
    getByEmail,
    remove,
    update,
    setNewPassword
}