"use strict";

const e = require("express");
const dbConfig = require("../config/dbconnect.json");
const { getPool } = require("./pg/pool");

const pool = getPool(dbConfig);

async function getTest(id) {
    let test = (
        await pool.query(
            `select * 
                from tests
            where 
                id = $1`,
            [id]
        )
    ).rows[0];

    if (test === undefined)
        return {
            isSuccess: false,
            error: 'invailid test id'
        }

    let questions = (
        await pool.query(
            `select question_id
                from tests_questions as ts
            where
                ts.test_id = $1`,
            [id]
        )
    ).rows

    let s = ''
    questions.map((el, i) => i !== questions.length - 1 ? s += `id = ${el.question_id} or ` : s += `id = ${el.question_id}`)

    let questions_ = (
        await pool.query(
            `select *
                from questions
            where 
                ${s}`
        )
    ).rows

    s = ''
    questions.map((el, i) => i !== questions.length - 1 ? s += `question_id = ${el.question_id} or ` : s += `question_id = ${el.question_id}`)

    let answers = (
        await pool.query(
            `select *
                from answer_options
            where
                ${s}`
        )
    ).rows

    let result = {
        id: test.id,
        name: test.name,
        description: test.description,
        author: test.author,
        questions: []
    }

    questions_.map(el => el.answers = [])

    questions_.map(el1 => {
        answers.map(el2 => el2.question_id === el1.id ? el1.answers.push(el2) : '');
        questions_.map(el => result.questions.push(el));
    })

    return {
        isSuccess: true,
        result
    }
}

module.exports = {
    getTest
}