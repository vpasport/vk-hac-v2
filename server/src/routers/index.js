"use strict";

const {
    registrate,
    login,
    logout
} = require("./main")
const tests = require('./tests');

function index(server) {
    server.post("/registrate", registrate);
    server.post("/login", login);
    server.get("/logout", logout);

    server.use("/test", tests);
}

module.exports = index