"use strict";

const dbConfig = require("../config/dbconnect.json");
const {getPool} = require("./pg/pool");

const pool = getPool(dbConfig);


module.exports = {
}