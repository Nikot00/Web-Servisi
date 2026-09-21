const {
    addBook,
    getAllBooks,
    getBookById,
    removeBook,
    updateBook
} = require("../pkg/books/mongo")


const getAll = async(req, res) => {
    try {
        const books = await getAllBooks()
        res.status(200).send(books)
    } catch(err) {
        res.status(500).send(err)
    }
}    

const getById = async(req, res) => {
    try {
        const id = Number(req.params.id)
        const book = await getBookById(id)

        if(!book) {
            res.status(404).send("book not found")
        } 

        res.status(200).send(book)
    } catch(err) {
        res.status(200).send(err)
    }
}

const create = async(req, res) => {
    try {
        console.log(req.body);
        
        const book = req.body

        await addBook(book)

        res.status(201).send(book)
    } catch(err) {
        res.status(500).send(err)
    }
}

const remove = async(req, res) => {
    try {
        const id = Number(req.params.id)
        await removeBook(id) 
        res.send("book deleted")
    } catch(err) {
         res.status(500).send(err)
    }
}

const update = async(req, res) => {
    try {
        const id = Number(req.params.id)
        const newBookData = req.body

        await updateBook(id, newBookData)
        
        res.send("Book updated")
    } catch(err) {
        res.status(500).send(err)
    }
}

module.exports = {
   getAll,
   getById,
   create,
   remove,
   update
}




