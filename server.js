const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();



// Question 1 goes here
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


// Question 2 goes here
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


// Question 3 goes here
app.get('/patients/:first_name', (req, res) => {
    const { first_name } = req.params;
    const query = 'SELECT * FROM patients WHERE first_name = ?';
    db.query(query, [first_name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


// Question 4 goes here
app.get('/providers/specialty/:provider_specialty', (req, res) => {
    const { provider_specialty } = req.params;
    const query = 'SELECT * FROM providers WHERE provider_specialty = ?';
    db.query(query, [provider_specialty], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});



// listen to the server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`server is runnig on http://localhost:${PORT}`)
})

dotenv.config();


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL Database:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});


app.use(express.json());