const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "VCFwkIkmLQXkVj5nqo2SI8FwMxJANHW",
//     database: "DesafioNginxDb"
// });

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to database:', error);
        return;
    }
    console.log('Connected to the database');
});

const sql = `INSERT INTO people(name) values('Daniel')`
connection.query(sql)


app.get('/', (req, res) => {
    const query = "SELECT * FROM people";

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        let returnHtml = `<h1>Full Cycle Rocks!</h1>\n\nLista de nomes cadastrada no banco de dados:\n<ul>`;

        results.forEach(person => {
            returnHtml += `<li>${person.name}</li>`;
        });

        returnHtml += '</ul>';

        res.send(returnHtml);
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
