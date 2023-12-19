const { MongoClient } = require("mongodb");
const express = require('express');
const env = require('./env.js');

const app = express();
app.use(express.json());

const client = new MongoClient(env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
let database, collectionCores;

client.connect()
  .then(() => {
    database = client.db('passaros');
    collectionCores = database.collection('cores');
    
    app.listen(env.port, () => {
      console.log("DataBird started on port", env.port);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

app.post('/cores', async (req, res) => {
  console.log('POST', 'Cores');
  
  try {
    await collectionCores.insertOne({ nome: req.body.nome, valor: req.body.valor });
    res.status(200).json({ code: 200, message: "Operação concluída com sucesso" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ code: 500, message: "Erro interno no servidor" });
  }
});

app.get('/cores', async (req, res) => {
  try {
    let results = await collectionCores.find({}).toArray();
    res.status(200).json({ code: 200, message: "Operação concluída com sucesso", data: results });
  } catch (e) {
    console.error(e);
    res.status(500).json({ code: 500, message: "Erro interno no servidor" });
  }
});