"use strict";

const {
    registrate,
    login,
    logout
} = require("./main")
const tests = require('./tests');
const themes = require("./themes");

function index(server) {
    server.post("/registrate", registrate);
    server.post("/login", login);
    server.get("/logout", logout);

    server.use("/test", tests);

    server.use("/theme", themes);
}

module.exports = index