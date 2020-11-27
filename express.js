const express = require('express');
const app = express();
let bodyParser = require("body-parser");

let scale = 100; //How much will the random number scale
let base = 0; //What is the smallest value that can be outputted


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}))

//Return a random number given current paramaters.
app.get('/random', (req, res) => {
    const randomNumberResult = Math.floor((Math.random() * scale) + base);
    let objReturn = {
        random_number: randomNumberResult,
    }
    res.json(JSON.stringify(objReturn));
})

//Change the current paramaters for generating a random number.
app.post('/random', (req, res) => {
    const reqScale = parseInt(req.body.scale);
    const reqBase = parseInt(req.body.base);


    if(isNaN(reqScale) || isNaN(reqBase)) { //If empty or improper input
        res.sendStatus(404);
        return; //End after send status
    }

    scale = reqScale;
    base = reqBase;
    
    res.sendStatus(200);
    return;
})


app.listen(8080, () => {
})