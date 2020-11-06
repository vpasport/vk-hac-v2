"use strict";

const {
    registrate,
    login,
    logout
} = require("./main")

function index(server){
    server.post("/registrate", registrate);
    server.post("/login", login);
    server.get("/logout", logout);
}

module.exports = index