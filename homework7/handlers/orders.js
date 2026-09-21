
const order = require("../pkg/orders/orders");

const {
    OrderCreate,
    OrderUpdate,
    validate
} = require("../pkg/orders/validate");


const getAll = async(req, res) => {
    try{
        const data = await order.getAll(req.auth.id);
        return res.status(200).send(data);
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};


const getOne = async(req, res) => {
    try{
        const data = await order.getById(req.auth.id, req.params.id);

        if(!data){
            return res.status(404).send("Order not found!");
        }

        return res.status(200).send(data);
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};


const create = async(req, res) => {
    try{
await validate(req.body, OrderCreate);
        if(!req.auth.id){
            return res.status(400).send("Unauthorized action!");
        }

        const data = {
            ...req.body,
            account_id: req.auth.id
        };

        const newOrder = await order.create(data);

        return res.status(200).send(newOrder);
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};


const update = async(req, res) => {
    try{
        await validate(req.body, OrderUpdate);

        if(!req.auth.id){
            return res.status(400).send("Unauthorized action!");
        }

        await order.update(req.auth.id, req.params.id, req.body);

        return res.status(200).send("Update was successfull!");
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};


const remove = async(req, res) => {
    try{
        await order.remove(req.auth.id, req.params.id);

        return res.status(200).send("Succesfull deletion!");
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}
