require('dotenv').config();     //carrega o env
const express = require('express');
const config = require('./config/serverConfig');
const connectDB = require('./config/db');

const app = express ();

app.get('/', (req,res) =>{
    res.send('teste de corno')
});

app.listen(config.PORT, () =>{
    console.log(config.SUCESSO_MSG(config.PORT));
})
