const { readData, writeData } = require("../files");

const DATA_SOURCE = `${__dirname}/../../books`

const addBook = async(book) => {
    try {
       const data = await readData(DATA_SOURCE)
       data.push(book)
       await writeData(data, DATA_SOURCE)
    } catch (err) {
        throw err
    }
}

const getAllBooks = async() => {
    try {
      const data = await readData(DATA_SOURCE)
      return data
    } catch(err) {
        throw err
    }
}

const getBookById = async(id) => {
     try {
      const data = await readData(DATA_SOURCE)
      const bookFound = data.find((book) => book.id === id)
      return bookFound
    } catch(err) {
        throw err
    }
}

const updateBook = async(id, newBookData) => {
     try {
      let data = await readData(DATA_SOURCE)
      const bookFound = data.find(book => book.id === id)
      if(bookFound) {
        const newBook = {
        ...bookFound,
        ...newBookData,
    } 
    data = data.filter((book) => book.id !== id)
    data.push(newBook)
    await writeData(data, DATA_SOURCE)
      } else {
        console.log("Book with this id doesnt exist");
      }
    } catch(err) {
        throw err
    }
}

const removeBook = async(id) => {
    try {
        const data = await readData(DATA_SOURCE)
        const newData = data.filter((book) => book.id !== id)
        await writeData(newData, DATA_SOURCE)
    } catch(err) {
        throw err
    }
}

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    removeBook
}
