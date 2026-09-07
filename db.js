const { Pool } = require("pg");

const pool = new Pool({
    user: "farzanashsan",
    host: "localhost",
    database: "mukta_foundation",
    port: 5432,
});

module.exports = pool;