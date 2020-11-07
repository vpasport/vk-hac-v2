"use strict";

const { Router } = require("express");
const {
    getTest: getTest_,
    createTest: createTest_,
    getAllTestsByThemes: getAllTestsByThemes_,
    getAllTestsByAuthors: getAllTestsByAuthor_
} = require("../database/tests");

async function getTest({ params: { id } }, res) {
    let result = await getTest_(
        id
    )

    res.json(result)
}

async function createTest({ body }, res) {
    let result = await createTest_(
        body
    )

    if (result.isSuccess)
        res.json(result)
    else
        res.json({
            isSuccess: false
        })
}

async function getAllTestsByThemes({ params: { id } }, res) {
    let result = await getAllTestsByThemes_(
        id
    );

    res.json({
        isSuccess: true,
        result
    });
}

async function getAllTestsByAuthors({ params: { id } }, res) {
    let result = await getAllTestsByAuthor_(
        id
    )

    res.json({
        isSuccess :true,
        result
    })
}

function index() {
    const router = new Router();

    router.get("/:id", getTest);
    router.post("/", createTest)
    router.get("/all/theme/:id", getAllTestsByThemes)
    router.get("/all/author/:id", getAllTestsByAuthors)

    return router;
}

module.exports = index();