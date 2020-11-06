"use strict";

const { Router } = require("express");
const {
    getTheme: getTheme_
} = require("../database/themes");

async function getTheme({ params: { id } }, res) {
    let result = await getTheme_(
        id
    );

    res.json(result)
}

function index() {
    const router = new Router();

    router.get("/:id", getTheme);

    return router;
}

module.exports = index();