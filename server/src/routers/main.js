"use strict";

const {
    reg,
    auth
} = require("../database/users");

async function registrate(req, res){
    const result = await reg(
        req.body.login,
        req.body.password
    );

    res.json(result);
}

async function login(req, res){
    const result = await auth(
        req.body.vk_id,
        req.body.password
    );

    if (result.isSuccess) {
        req.session.role = result.user.role
        req.session.user_id = result.user.vk_id
    };

    res.json(result);
}

async function logout(req, res){
    req.session.role = undefined;
    req.session.user_id = undefined
}

module.exports = {
    registrate,
    login,
    logout
}