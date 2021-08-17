const express = require('express')
const helmet = require('helmet');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

const server = require('http').Server(app);

app.get('/', (req, res) => res.status(200).json("El servidor Funciona!"));

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());//tema de seguridad
app.use('/auth', require('./controllers/auth'));

app.use(require('./middleware/auth'))
app.use('/companies', require('./controllers/companies'));
app.use('/movies', require('./controllers/movies'));
app.use('/heroes', require('./controllers/heroes'));
app.use('/publications', require('./controllers/publications'));
module.exports= server;
