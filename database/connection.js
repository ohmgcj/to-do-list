const postgres = require('postgres');

const sql = postgres('postgres://postgres:caio1212@localhost:5432/to_do');

module.exports = sql;
