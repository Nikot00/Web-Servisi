const fs = require("fs");


const readData = (source) => { 
    return new Promise ((success, fail) => {
        fs.readFile(`${source}.json`, "utf-8", (err, data) => {
            if(err) return fail(err);
            const out = JSON.parse(data);
            return success(out);
        });
    });
};


const writeData = (data, destinaton) => {  
    return new Promise ((success, fail) => {
        const out = JSON.stringify(data);
        fs.writeFile(`${destinaton}.json`, out, (err) => {
            if(err) return fail(err);
            return success();
        });
    });
};

const getAllBooks = async() => {
    try{
        const data = await readData("/books")
        return data
    } catch(err) {
        throw err;
    }
}

const addBook = async(id, title, author) => {
    try{
        const book = {
            id: id,
            title: title,
            author: author
        }
        let data = await readData("./books");
        data.push(book);
        await writeData(data, "./books");
    }catch(err){
        throw err;
    }
};

const updateBook = async(id, newBookData) => {
    try{
        let data = await readData("./books");
        const book = data.find((book) => book.id === id);
        const newBook = {
            ...book,  
            ...newBookData
        };
        data = data.filter((book) => book.id != id); // site koli bez kolata koja se obiduvame da ja azurirame
        data.push(newBook);
        await writeData(data, "./books");
    }catch(err){
        throw err;
    }
};

const removeBook = async(id) => {
    try{
        const data = await readData("./books");
        const out = data.filter((book) => book.id !== id);
        await writeData(out, "./books");
    }catch(err){
        throw err;
    }
};

(async function (){
    await addBook(1,"The Hobbit","J.R.R. Tolkien")
    await addBook(2, "1984", "George Orwell")

    const newBookData = {
        title: "The Lord of the Rings"
    }
    await updateBook(1, newBookData)

    await removeBook(2)
})()