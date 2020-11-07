"use strict";

const {Router} = require("express");
const {
    getUserCommand: getUserCommand_
} = require("../database/companies");

async function getUserCommand({body: {id}}, res){
    let result = await getUserCommand_(
        id
    )
}

function index(){
    const router = new Router();

    router.get("/command/:id", getUserCommand);

    return router;
}

module.exports = index()