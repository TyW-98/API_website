const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../signup.html"));
});

app.post('/', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    console.log(firstName + " " + lastName + " " + email)
});

app.listen(3000, function () {
    console.log("Running on port 3000");
});