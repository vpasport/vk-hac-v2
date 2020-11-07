"use strict";

const { Router } = require("express");
const pool = require("../database/pg/pool");
const {
    getTheme: getTheme_,
    createTheme: createTheme_,
    getAllThemes: getAllThemes_
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

async function getAllThemes(req, res){
    let result = await getAllThemes_();

    res.json(result)
}

function index() {
    const router = new Router();

    router.get("/:id", getTheme);
    router.post("/", createTheme)
    router.get("/", getAllThemes)

    return router;
}

module.exports = index();