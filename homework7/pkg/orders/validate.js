const { Validator } = require("node-input-validator");

const OrderCreate = {
    foodName: "required|string",
    restaurant: "required|string",
    paymentMethod: "required|string"
};

const OrderUpdate = {
    foodName: "string",
    restaurant: "string",
    paymentMethod: "string"
};

const validate = async(data, schema) => {

    let v = new Validator(data, schema);

    let e = v.check();

    if(!e){
        throw{
            code: 400,
            error: v.errors,
        }
    }
};

module.exports = {
    OrderCreate,
    OrderUpdate,
    validate
};