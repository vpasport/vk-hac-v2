"use strict";

const dbConf = require("../config/dbconnect.json");
const { getPool } = require("./pg/pool")
const hash_ = require("./hash");
const { API } = require("vk-io");

const pool = getPool(dbConf)

const api = new API({
    token: process.env.VK_TOKEN
})

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

    console.log(pass)
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

async function auth(vk_id, pass) {
    let data = (
        await pool.query(
            `select 
                *
            from users as u
                where u.vk_id = $1`,
            [vk_id]
        )
    ).rows[0];

    if (data === undefined)
        return {
            isSuccess: false,
            error: 'invalid login'
        };

    let pass_ = data.password.split(';');

    let { hash, salt, hashAndSalt } = hash_(
        pass,
        {
            salt: pass_[1],
            algorithm: 'sha512'
        }
    );

    if (hash !== pass_[0])
        return {
            isSuccess: false,
            error: 'invalid password'
        };

    let company = (
        await pool.query(
            `select *
                from companies
            where
                id = $1`,
            [data.company_id]
        )
    ).rows[0]

    let city = (
        await pool.query(
            `select *
                from cities
            where
                id = $1`,
            [company.city_id]
        )
    ).rows[0]

    let command = (
        await pool.query(
            `select *
                from commands
            where
                id = $1`,
            [data.command_id]
        )
    ).rows[0]

    let user = await api.call('users.get', {
        user_ids: 172349355,
        fields: 'photo_100'
    })

    let result = {
        vk_id: data.vk_id,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        photo: user[0].photo_100,
        role: data.role,
        score: data.score,
        side: data.side,
        company: company.name,
        city: city.name,
        command: {
            name: command.name,
            description: command.description
        }
    }

    console.log( result )

    return {
        isSuccess: true,
        user: result
    }
}

module.exports = {
    reg,
    auth
}