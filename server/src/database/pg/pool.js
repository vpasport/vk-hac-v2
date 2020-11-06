"use strict";

const { Pool } = require("pg");

let pool = null;

function getPool(config) {
    if (pool === null) {
        pool = new Pool(config);

        testPool();
    }

    return pool;
}

async function testPool() {
    console.log("Test pool")

    if (pool === null) {
        throw "[POOL TEST] Not connected";
    }

    const errorMessage = "[POOL TEST] Error in \"{MODE}\" mode: {REASON}";
    let client;

    try {
        client = await pool.connect();
    } catch (error) {
        throw errorMessage.replace("{REASON}", "can't connect to database");
    }

    try {
        await client.query("select now()");
    } catch (error) {
        throw errorMessage.replace("{REASON}", "can't query from database");
    } finally {
        await client.end();
        client.release();
    }
}

module.exports = {
    getPool
};