const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');


app.get('/', (req, res) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash("password", salt, function (err, hash) {
            console.log(hash);

        });
    });

    res.send('Hello World!');
});


app.get('/compare', (req, res) => {
    const password = "password";
    const hash = "$2b$10$/EYwhBoD.G27pwksey3ipu7Ki78Op4rI2kbFLOblbp4UroD77XXR6"; // Example hash, replace with actual hash to compare
    bcrypt.compare(password, hash, function (err, result) {
        if (err) {
            return res.status(500).send('Error comparing passwords');
        }
        if (result) {
            res.send('Password is valid!');
        } else {
            res.send('Invalid password');
        }
    });
});


app.get('/jwt', (req, res) => {

    const token = jwt.sign({ email: "umesh@gmail.com" }, 'secret');

    console.log(token);
    const decoded = jwt.verify(token, 'secret');
    console.log(decoded);
    res.send('JWT example, check console for output');
});


app.get('/jwt-verify', (req, res) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVtZXNoQGdtYWlsLmNvbSIsImlhdCI6MTc1OTMwODQ1Nn0.zorsUVNLoLBVZkQzIxzohwlzJCSNjzztDXwPB8ct17Q";
   
    try {
        const verified = jwt.verify(token, 'secret');
        console.log(verified);
        res.send('Token is valid');
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
});



app.listen(port, () => {
    console.log(` listening at http://localhost:${port}`);
});
