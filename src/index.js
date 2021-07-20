const express = require('express')
const helmet = require('helmet');

const app = express();
app.use(helmet());//tema de seguridad

const server = require('http').Server(app);

app.get('/', (req, res) => res.status(200).json("El servidor Funciona!"));

app.use('/companies', require('./controllers/companies'));
module.exports= server;
