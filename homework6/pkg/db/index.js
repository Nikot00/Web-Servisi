const mongoose = require("mongoose")

const dns = require("dns")

const config = require("../config/index")

dns.setServers(["8.8.8.8", "8.8.4.4"])

const {MONGO_USERNAME, MONGO_PASSWORD} = config.getSection("development")

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.g24qhxz.mongodb.net/accounts`

async function connect() {
    try {
       await mongoose.connect(uri)
       console.log('MongoDB connected');
       
    } catch(err) {
    console.log(err);
    
    }
}


connect()



