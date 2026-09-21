const express = require("express")

const api = express()

api.use(express.json())

const {
     getAll,
   getById,
   create,
   remove,
   update
} = require("./controllers/index")

api.get("/books", getAll)

api.get("/books/:id", getById)

api.post("/books", create)

api.delete("/books/:id", remove)

api.put("/books/:id", update)


api.listen(8080, (err) => {
        if(err) console.log(err);
        console.log("Server listening on port 8080");
        
    })