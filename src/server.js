import express from 'express';
import {promises as fs} from 'fs';
import {people} from './people';
import bodyParser from 'body-parser';

// to run: npx babel-node src/server.js

const app = express();
// bodyParser is a plugin that takes data we supply and add it to the request
// we will use Postman to supply our name to add in the body of the POST request
// in the Postman use POST method, body, raw, JSON and provide new person data
// in the JSON format

app.use(bodyParser.json());

app.post('/people', (req, res) => {
  const newPerson = req.body;
  people.push(newPerson);
  res.json(people);
});

app.get('/hello', (req, res) => {
  res.send('Hello there!');
});

app.get('/people', (req, res) => {
  res.json(people);
});

app.get('/file-data', async (req, res) => {
  const data = await fs.readFile(__dirname + '/' + 'people-data.json');
  const people = JSON.parse(data);
  res.json(people);
});

app.get('/people/:name', (req, res) => {
  const {name} = req.params;
  console.log(name);
  const person = people.find((x) => {
    return x.name === name;
  });
    // let person = people.find(x => x.name === name);
  res.json(person);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
