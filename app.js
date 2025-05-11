const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const middlewares = require('./middlewares');
const rutas = require('./routes');


dotenv.config();


app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoPorDefecto',
  resave: false,
  saveUninitialized: true
}));


rutas.configurarRutas(app);


const PUERTO = 4000;
app.listen(PUERTO, () => {
  console.log(`Servidor funcionando en http://localhost:${PUERTO}`);
});
