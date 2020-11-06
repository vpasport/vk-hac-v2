"use strict";

const http = require("http");
const express = require("express");
const session = require("express-session");
const pgStoreConnect = require("connect-pg-simple")(session);

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const dbConf = require("./src/config/dbconnect.json")
const { getPool } = require("./src/database/pg/pool")

async function index() {
    const pool = await getPool(dbConf)

    require("./src/config/env");

    const initRouters = require("./src/routers");

    const server = express();
    const dev = process.env.NODE_ENV === "dev";

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

    server.use(
        session(
            {
                cookie: {
                    httpOnly: true,
                    maxAge: !dev ? parseInt(process.env.SESSION_COOKIE_MAXAGE) : null,
                    secure: !dev && process.env.SESSION_COOKIE_SECURE === "true"
                },
                name: !dev ? process.env.SESSION_NAME : null,
                resave: false,
                rolling: true,
                saveUninitialized: false,
                secret: !dev ? process.env.SESSION_SECRET : "secret",
                store: new pgStoreConnect(
                    {
                        pool: pool,
                        tableName: process.env.SESSION_TABLE_NAME
                    }
                )
            }
        )
    );

    server.get("/", (req, res) => {
        res.json(
            {
                status: 'Я живь'
            }
        )
    })

    initRouters(server);

    http.createServer(server).listen(process.env.PORT, () => {
        console.log(`Server start on port ${process.env.PORT}`);
    })
}

index()