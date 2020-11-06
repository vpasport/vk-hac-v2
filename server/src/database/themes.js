"use strict";

const dbConf = require("../config/dbconnect.json");
const { getPool } = require("./pg/pool");

const pool = getPool();

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
            type : el2.type,
            attachment: el2.attachment
        }) : '')
    })

    return {
        isSuccsess: true,
        result
    }
}

module.exports = {
    getTheme
}