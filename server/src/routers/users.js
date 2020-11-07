"use strict";

const { Router } = require("express");
const {
    setConfirmed: setConfirmed_,
    getConfirmedStatuses: getConfirmedStaruses_,
    getAllByCompaniesAndConfirmedStatuses: getAllByCompaniesAndConfirmedStatuses_
} = require("../database/users");

async function setConfirmed(
    { params: { id }, body: { status_id } },
    res
) {
    let result = await setConfirmed_(
        id,
        status_id
    )

    if (result.isSuccess)
        res.json(result)
}

async function getConfirmedStaruses(req, res) {
    let result = await getConfirmedStaruses_();

    if (result.isSuccess)
        res.json(result);
}

async function getAllByCompaniesAndConfirmedStatuses(
    { params: { id }, body: { status_id } },
    res
) {
    let result = await getAllByCompaniesAndConfirmedStatuses_(
        id,
        status_id
    )

    if(result.isSuccess)
        res.json(result)
}

function index() {
    const router = new Router();

    router.get("/confirmed/:id", setConfirmed);
    router.get("/statuses", getConfirmedStaruses);
    router.get("/companies/:id", getAllByCompaniesAndConfirmedStatuses);

    return router;
}

module.exports = index()