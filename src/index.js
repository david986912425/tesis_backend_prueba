const express = require("express");
const fileUpload = require('express-fileupload');
const http = require("http");
const cors = require('cors');
const router = require('./routes/faceRoutes.js');
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Bienvenido al backend de Reconocimiento Facial');
});


app.use(cors());
app.use(express.json());
app.use(express.static('./app/public'));
app.use(fileUpload());

app.use('/web-api/face', router );


server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});