"use strict";

const { Router } = require("express");
const {
    getTheme: getTheme_,
    createTheme: createTheme_
} = require("../database/themes");

async function getTheme({ params: { id } }, res) {
    let result = await getTheme_(
        id
    );

    res.json(result)
}

async function createTheme({body}, res){
    let result = await createTheme_(
        body
    )

    if(result.isSuccess)
        res.json(result)
    else
        res.json({
            isSuccess: false
        })
}

function index() {
    const router = new Router();

    router.get("/:id", getTheme);
    router.post("/", createTheme)

    return router;
}

module.exports = index();