const {Pool} = require('pg');

const pool = new Pool({
    port: 5432,
    host: "localhost",
    database: "postgres",
    user: "postgres",
    password: "fernandezPAMA01",
});

pool.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err.stack);
    } else {
        console.log(`Conexión establecida con la base de datos`);
    }
});

module.exports = pool;