"use strict";

const { Router } = require("express");
const {
    setConfirmed: setConfirmed_,
    getConfirmedStatuses: getConfirmedStatuses_,
    getAllByCompaniesAndConfirmedStatuses: getAllByCompaniesAndConfirmedStatuses_,
    getUsersCommand: getUsersCommand_,
    getCommands: getCommands_,
    remind: remind_,
    getTests: getTests_,
    getLiders: getLiders_
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

async function getConfirmedStatuses(req, res) {
    let result = await getConfirmedStatuses_();

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

    if (result.isSuccess)
        res.json(result)
}

async function getUsersCommand({ params: { id } }, res) {
    let result = await getUsersCommand_(
        id
    )

    if (result.isSuccess)
        res.json(result)
    else
        res.json({
            isSuccess: false
        })
}

async function getCommands(req, res) {
    let result = await getCommands_();

    if (result.isSuccess)
        res.json(result)
    else
        res.json({
            isSuccess: false
        })
}

async function remind({ body: { company_id } }, res) {
    let result = await remind_(
        company_id
    )

    res.json(
        result
    )
}

async function getTests({ params: { id } }, res) {
    let result = await getTests_(
        id
    )

    if (result.isSuccess)
        res.json(result)
    else
        res.json({
            isSuccess: false
        })
}

async function getLiders(req, res){
    let result = await getLiders_();

    if( result.isSuccess )
        res.json(result)
    else
        res.json({
            isSuccess: false
        })
}

function index() {
    const router = new Router();

    router.post("/confirmed/:id", setConfirmed);
    router.get("/statuses", getConfirmedStatuses);
    router.post("/companies/:id", getAllByCompaniesAndConfirmedStatuses);
    router.get("/command/:id", getUsersCommand);
    router.get("/commands", getCommands);
    router.post("/remind", remind);
    router.get("/tests/:id", getTests);
    router.get("/liders", getLiders);

    return router;
}

module.exports = index()