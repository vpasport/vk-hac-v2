"use strict";

const {Router} = require("express");
const {
    getTest: getTest_,
    createTest: createTest_
} = require("../database/tests");

async function getTest( {params: {id}}, res ){
    let result = await getTest_(
        id
    )
    
    res.json( result )
}

async function createTest({body}, res){
    let result = await createTest_(
        body
    )

    if(result.isSuccess)
        res.json(result)
    else
        res.json({
            isSuccess: false
        })
}

function index(){
    const router = new Router();

    router.get("/:id", getTest);
    router.post("/", createTest)

    return router;
}

module.exports = index();