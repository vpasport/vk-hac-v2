"use strict";

const dbConf = require("../config/dbconnect.json");
const { getPool } = require("./pg/pool")
const hash_ = require("./hash");

const pool = getPool(dbConf)

async function reg(login, pass) {
    let data = (
        await pool.query(
            `select * 
                from users 
            where 
                login = $1`,
            [login]
        )
    );

    if (data.rows.length > 0)
        return {
            isSuccess: false,
            error: "this login alredy exists"
        };

    console.log( pass )
    let { hash, salt, hashAndSalt } = hash_(
        pass,
        {
            saltLength: 10,
            algorithm: 'sha512'
        }
    );

    let id = (
        await pool.query(
            `insert into users (login, password, role)
            values ($1, $2, $3) returning id`,
            [login, hashAndSalt, 'user']
        )
    ).rows[0].id;

    return {
        isSuccess: true,
        id
    }
}

async function auth(login, pass) {
    let data = (
        await pool.query(
            `select 
                password, role, id
            from users as u
                where u."login" = $1`,
            [login]
        )
    ).rows[0];

    if (data === undefined)
        return {
            isSuccess: false,
            error: 'invalid login'
        };

    let pass_ = data.password.split(';');

    let {hash, salt, hashAndSalt} = hash_(
        pass,
        {
            salt: pass_[1],
            algorithm: 'sha512'
        }
    );

    if (hash !== pass_[0])
        return {
            isSuccess: false,
            error : 'invalid password'
        };

    return {
        isSuccess: true,
        role: data.role,
        id: data.id
    }   
}

module.exports = {
    reg,
    auth
}