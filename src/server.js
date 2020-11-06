import express from 'express';
import {people} from "./people"

// to run: npx babel-node src/server.js

let app = express();

app.get("/hello", (req, res) => {
    res.send("Hello there!");
});
app.get("/people", (req, res) => {

    res.json(people);
});

app.get("/people/:name", (req, res) => {

    let {name} = req.params;
    console.log(name)

    let person = people.find((x) => {return x.name === name});
    res.json(person);
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});