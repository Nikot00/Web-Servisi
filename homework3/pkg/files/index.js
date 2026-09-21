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

module.exports = {
    writeData,
    readData
}