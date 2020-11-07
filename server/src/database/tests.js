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

    questions_.map((question, i) => {
        question.answers = []
        answers.map(answer => {
            answer.question_id == question.id ? question.answers.push(answer) : ''
        })
        result.questions.push(question)
    })

    return {
        isSuccess: true,
        result
    }
}

async function createTest(test) {
    console.log(test)

    const client = await pool.connect();
    await client.query('begin');

    try {

        let test_id = (
            await client.query(
                `insert
                    into tests
                    (name, description, author, theme_id)
                values
                    ($1, $2, $3, $4)
                returning id`,
                [test.name, test.description, test.author, test.theme_id]
            )
        ).rows[0].id;

        test.questions.map(async question =>  {

            let question_id = (
                await client.query(
                    `insert
                        into questions
                        (type, description)
                    values
                        ($1, $2)
                    returning id`,
                    [question.type, question.description]
                )
            ).rows[0].id;

            question.answers.map(async answer => {
                await client.query(
                    `insert
                        into answer_options
                        (question_id, description, is_correct)
                    values
                        ($1, $2, $3)`,
                    [question_id, answer.description, answer.is_correct]
                )
            })


            await client.query(
                `insert 
                into tests_questions
                (question_id, test_id)
            values
                ($1, $2)`,
                [question_id, test_id]
            )
        })
    } catch (e) {
        await client.query('rollback');
        client.release()
        throw e;
    }

    await client.query('commit');
    client.release()
}

module.exports = {
    getTest,
    createTest
}