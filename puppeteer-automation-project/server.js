const express = require('express');
const app = express();
const port = 8000;

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/home', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
