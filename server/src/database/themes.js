"use strict";

const dbConf = require("../config/dbconnect.json");
const { getPool } = require("./pg/pool");

const pool = getPool(dbConf);

async function getTheme(id) {
    let theme = (
        await pool.query(
            `select *
            from themes
            where 
            id = $1`,
            [id]
        )
    ).rows[0]

    if (theme.id === undefined)
        return {
            isSuccsess: false,
            error: 'invalid theme id'
        }

    let theme_parts = (
        await pool.query(
            `select *
                from theme_parts
            where 
                theme_id = $1`,
            [theme.id]
        )
    ).rows

    let s = '';
    theme_parts.map((el, i) => i !== theme_parts.length - 1 ? s += `pb.theme_parts_id = ${el.id} or ` : s += `pb.theme_parts_id = ${el.id}`)

    let part_blocks = (
        await pool.query(
            `select *
                from part_blocks as pb
            where
                ${s}`
        )
    ).rows

    let result = {
        id: theme.id,
        name: theme.name,
        parts: []
    }

    theme_parts.map((el, i) => {
        result.parts.push(
            {
                name: el.name,
                part: el.part,
                blocks: []
            }
        )
        part_blocks.map(el2 => el2.theme_parts_id === el.id ? result.parts[i].blocks.push({
            type: el2.type,
            attachment: el2.attachment
        }) : '')
    })

    return {
        isSuccsess: true,
        result
    }
}

async function createTheme(theme) {
    const client = await pool.connect();
    await client.query('begin');

    let theme_id = 'error'

    try {
        theme_id = (
            await client.query(
                `insert
                    into themes
                    (name)
                values
                    ($1)
                returning id`,
                [theme.name]
            )
        ).rows[0].id;

        theme.parts.map(async part => {
            let theme_parts_id = (
                await client.query(
                    `insert
                        into theme_parts
                        (name, part, theme_id)
                    values
                        ($1, $2, $3)
                    returning id`,
                    [part.name, part.part, theme_id]
                )
            ).rows[0].id;

            part.blocks.map(async block => {
                await client.query(
                    `insert
                        into part_blocks
                        (type, attachment, theme_parts_id)
                    values
                        ($1, $2, $3)`,
                    [block.type, block.attachment, theme_parts_id]
                )
            })
        })
    } catch (e) {
        await client.query('rollback');
        client.release()
        throw e;
    }

    await client.query('commit');
    client.release()

    return {
        isSuccess: true,
        theme_id
    }
}

async function getAllThemes() {
    let result = (
        await pool.query(
            `select *
                from themes`
        )
    ).rows;

    return {
        isSuccess: true,
        result
    }
}

module.exports = {
    getTheme,
    createTheme,
    getAllThemes
}