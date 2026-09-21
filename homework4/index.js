const express = require("express")

const config = require("./config/index")


require("./db")

const {
       getAll,
   getById,
   create,
   remove,
   update
} = require("./handlers/index")

const api = express()

api.use(express.json())

api.get("/books", getAll) 

api.get("/books/:id", getById) 

api.post("/books", create)

api.put("/books/:id", update) 

api.delete("/books/:id", remove)

api.listen(config.getSection("development").port, (err) => {
        err 
        ? console.log(err)
        : console.log(
            `Server started at port ${config.getSection("development").port}`
        );
    })