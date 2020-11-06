"use strict";

const http = require("http");
const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const dbConf = require("./src/config/dbconnect.json")
const pool = require("./src/database/pg/pool").getPool(dbConf)

require("./src/config/env");

const server = express();

server.use(
    cors(
        {
            origin: 'http://localhost:3000',
            credentials: true
        }
    )
);
server.use(
    cookieParser()
);
server.use(
    bodyParser.urlencoded(
        {
            extended: true
        }
    )
);
server.use(
    bodyParser.json()
);

server.use((req, res, next) => {
    console.log(req)

    next()
});

server.get("/", (req, res) => {
    res.json(
        {
            status: 'Я живь'
        }
    )
})

http.createServer(server).listen(process.env.PORT, () => {
    console.log(`Server start on port ${process.env.PORT}`);
})