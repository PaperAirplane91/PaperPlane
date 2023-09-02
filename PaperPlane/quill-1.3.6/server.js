const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a connection pool to your MySQL database
const db = mysql.createPool({
  host: 'localhost',
  user: 'Brent',
  password: 'Brent123',
  database: 'quill',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Define a route to receive the HTML content and save it to the MySQL database
app.post('/save', (req, res) => {
  const content = req.body.content; // Assuming you're sending the content in the request body

  // Insert the content into the database
  db.query('INSERT INTO document (html_content) VALUES (?)', [content], (err, results) => {
    if (err) {
      console.error('Error saving content to the database:', err);
      res.status(500).send('Error saving content to the database');
    } else {
      console.log('Content saved to the database');
      res.status(200).json({ success: true, message: 'Content saved successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
