const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../signup.html"));
});

app.listen(3000, function () {
    console.log("Running on port 3000");
});