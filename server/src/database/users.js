"use strict";

const dbConf = require("../config/dbconnect.json");
const { getPool } = require("./pg/pool")
const hash_ = require("./hash");
const { API } = require("vk-io");
const crypto = require("crypto")

const pool = getPool(dbConf)

const api = new API({
    token: process.env.VK_TOKEN
})

async function reg(vk_id, pass, role) {
    let data = (
        await pool.query(
            `select * 
                from users 
            where 
                vk_id = $1`,
            [vk_id]
        )
    );

    if (data.rows.length > 0)
        return {
            isSuccess: false,
            error: "this vk_id alredy exists"
        };

    let { hash, salt, hashAndSalt } = hash_(
        pass,
        {
            saltLength: 10,
            algorithm: 'sha512'
        }
    );

    let side = Math.random() > 0.5 ? 'добро' : 'зло'

    let id = (
        await pool.query(
            `insert into users (vk_id, password, role, score, side)
            values ($1, $2, $3, 0, $4) returning id`,
            [vk_id, hashAndSalt, role, side]
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
            error: 'invalid vk_id'
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


    let user = await api.call('users.get', {
        user_ids: vk_id,
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
    }

    if (data.command_id !== null) {
        let command = (
            await pool.query(
                `select *
                    from commands
                where
                    id = $1`,
                [data.command_id]
            )
        ).rows[0]

        result.command = {
            name: command.name,
            description: command.description
        }
    }

    return {
        isSuccess: true,
        user: result
    }
}

async function setConfirmed(id, status_id) {
    let result = await pool.query(
        `update 
            users
        set
            confirmed_status_id = $1
        where
            id = $2`,
        [status_id, id]
    )

    return {
        isSuccess: true
    }
}

async function getConfirmedStatuses() {
    let result = (
        await pool.query(
            `select * 
            from confirmed_statuses`
        )
    ).rows;

    return {
        isSuccess: true,
        result
    }
}

async function getAllByCompaniesAndConfirmedStatuses(company_id, status_id) {
    let result;

    if (status_id == -1) {
        result = (
            await pool.query(
                `select id, vk_id
                    from users
                where
                    company_id = $1`,
                [company_id]
            )
        ).rows;
    } else {
        result = (
            await pool.query(
                `select id, vk_id
                    from users
                where
                    company_id = $1 and confirmed_status_id = $2`,
                [company_id, status_id]
            )
        ).rows;
    }

    let users = []
    for (let { vk_id } of result) {
        let user = await api.call('users.get', {
            user_ids: vk_id,
            fields: 'photo_100'
        })
        users.push(user[0])
    }

    let res = {
        users: []
    }

    result.map((el, i) => {
        let user = {
            id: el.id,
            vk_id: el.vk_id,
            first_name: users[i].first_name,
            last_name: users[i].last_name,
            photo: users[i].photo_100
        }
        res.users.push(user)
    })

    return {
        isSuccess: true,
        result: res
    }
}

async function getUsersCommand(id) {
    let users = (
        await pool.query(
            `select id, vk_id
                from users
            where
                command_id = $1`,
            [id]
        )
    ).rows;

    let command = (
        await pool.query(
            `select *
                from commands
            where
                id = $1`,
            [id]
        )
    ).rows[0];

    command.users = []

    for (let { vk_id } of users) {
        let user = await api.call('users.get', {
            user_ids: vk_id,
            fields: 'photo_100'
        })
        command.users.push({
            id: id,
            vk_id: vk_id,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            photo: user[0].photo_100
        })
    }

    return {
        isSuccess: true,
        command
    }
}

async function getCommands() {
    let commands = (
        await pool.query(
            `select *
                from commands`
        )
    ).rows;

    return {
        isSuccess: true,
        commands
    }
}

async function remind(company_id) {
    let users = (
        await pool.query(
            `select vk_id
            from users
        where
            company_id = $1`,
            [company_id]
        )
    ).rows;

    try{
        await api.call('messages.send', {
            random_id: crypto.randomInt(0, 1000000),
            peer_ids: users.map(el => el.vk_id),
            message: 'Привет, твой начальник попросил меня напомнить тебе, что тебе нужно проходить тесты\nТак что давай быстрее заходи, а то он будет злиться🙂'
        })
        return {
            isSuccess: true
        }
    } catch(e) {
        return {
            isSuccess: false
        }
    }
}

async function getTests(id){

}

module.exports = {
    reg,
    auth,
    getConfirmedStatuses,
    setConfirmed,
    getAllByCompaniesAndConfirmedStatuses,
    getUsersCommand,
    getCommands,
    remind,
    getTests
}