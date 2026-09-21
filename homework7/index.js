const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");

const config = require("./pkg/config");
require("./pkg/db");

const {
    login,
    register,
    refreshToken,
    resetPassword
} = require("./handlers/auth");

const {
    getAll,
    getOne,
    create,
    update,
    remove
} = require("./handlers/orders");

const {
    upload,
    download,
    listFiles,
    removeFile
} = require("./handlers/storage")


const api = express();

api.use(express.json());
api.use(fileUpload());


api.use(
    jwt({
        secret: config.getSection("development").jwt,
        algorithms: ["HS256"],
    }).unless({
        path: [
            "/api/v1/auth/login",
            "/api/v1/auth/register",
            "/api/v1/auth/refreshToken",
            "/api/v1/auth/resetPassword"
        ],
    })
);


// AUTH

api.post("/api/v1/auth/login", login);
api.post("/api/v1/auth/register", register);
api.post("/api/v1/auth/refreshToken", refreshToken);
api.post("/api/v1/auth/resetPassword", resetPassword);


// ORDERS

api.get("/api/v2/orders", getAll);
api.get("/api/v2/orders/:id", getOne);
api.post("/api/v2/orders", create);
api.put("/api/v2/orders/:id", update);
api.delete("/api/v2/orders/:id", remove);


// STORAGE
api.post("/api/v1/storage", upload);
api.get("/api/v1/storage/:filename", download);
api.get("/api/v1/storage", listFiles);
api.delete("/api/v1/storage/:filename", removeFile);



api.listen(config.getSection("development").port, (err) => {
    err
        ? console.error(err)
        : console.log(
            `Server started at port ${config.getSection("development").port}`
        );
});