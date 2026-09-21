const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true  },
  pages: {
    type: Number,
    min: 1,
    max: 4000
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

const addBook = async(book) => {
    const newBook = new Book(book)
    return await newBook.save()
}

const getAllBooks = async() => {
    return await Book.find({})
}

const getBookById = async(id) => {
    return await Book.findOne({_id: id})
}

const removeBook = async(id) => {
    return await Book.deleteOne({_id: id})
}

const updateBook = async(id, newBookData) => {
    return await Book.updateOne({_id: id}, newBookData)
}

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    removeBook,
    updateBook

}