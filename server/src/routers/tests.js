"use strict";

const {Router} = require("express");
const {
    getTest: getTest_
} = require("../database/tests");

async function getTest( {params: {id}}, res ){
    let result = await getTest_(
        id
    )
    
    res.json( result )
}

function index(){
    const router = new Router();

    router.get("/:id", getTest);

    return router;
}

module.exports = index();