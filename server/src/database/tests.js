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

        test.questions.map(async question => {

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

    return {
        isSuccess: true,
        test_id
    }
}

async function getAllTestsByThemes(id) {
    let result = (
        await pool.query(
            `select *
                from tests
            where
                theme_id = $1`,
            [id]
        )
    ).rows;

    return result;
}

async function getAllTestsByAuthors(id) {
    let result = (
        await pool.query(
            `select *
                from tests
            where
                author = $1`,
            [id]
        )
    ).rows

    return result;
}

async function addAnswers(answers) {
    const client = await pool.connect();
    await client.query('begin');

    try {
        answers.map( async el => {
            if (!el["answer"]) {
                el.answer = null
            }

            await client.query(
                `insert
                    into user_answers
                    (users_id, answer_options_id, answer, question_id)
                values
                    ($1, $2, $3, $4)`,
                [el.user_id, el.answer_options_id, el.answer, el.question_id]
            )

            await client.query(
                `update 
                    users
                set score = (
                                select score
                                    from users
                                where
                                    id = $1
                            ) + (
                                select value
                                    from answer_options
                                where
                                    id = $2
                            )
                where
                    id = $1 and (
                                select is_correct
                                    from answer_options
                                where 
                                    id = $2
                    )`,
                [el.user_id, el.answer_options_id]
            )
        })
    } catch (e) {
        await client.query('rollback');
        client.release();
        throw e;
    }

    await client.query('commit');
    client.release()

    return {
        isSuccess: true
    }
}

async function addCommands(id, command_ids){
    let s = command_ids.map( (_, i) => ( i += 2, `( $1, $${i})` ) ).join(',');

    await pool.query(
        `insert
            into tests_commands
            (test_id, command_id)
        values
            ${s}`,
        [id, ...command_ids.map(el => el.id)]
    )

    return {
        isSuccess: true
    }
}

async function getTestsByCommand(id){
    let test_ids = (
        await pool.query(
            `select test_id
                from tests_commands
            where
                command_id = $1`,
            [id]
        )
    ).rows;

    let tests = []

    for(let {test_id} of test_ids){
        let test = await getTest( test_id );
        tests.push(test.result)
    }

    return {
        isSuccess: true,
        tests
    }
}

module.exports = {
    getTest,
    createTest,
    getAllTestsByThemes,
    getAllTestsByAuthors,
    addAnswers,
    addCommands,
    getTestsByCommand
}