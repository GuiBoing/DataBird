const { MongoClient } = require("mongodb");
const express = require('express');
const env = require('./env.js');

const app = express();
app.use(express.json());

const client = new MongoClient(env.mongoURI);
var database, collectionCores;

app.listen(env.port, () => {
    console.log("DataBird started on port", env.port);
    database = client.db('passaros');
    collectionCores = database.collection('cores');
});

app.post('/cores', (req, res) => {
    console.log('POST', 'Cores');
    collectionCores.insertOne({ nome: req.body.nome, valor: req.body.valor });
    res.send(`criado cor ${req.body.nome}, valor hex ${req.body.valor}`);
});

app.get('/cores', async (req, res) => {
    let results = await collectionCores.find({}).toArray();
    res.send(results).status(200);
});