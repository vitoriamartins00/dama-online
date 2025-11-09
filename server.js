require('dotenv').config();     //carrega o env
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/serverConfig');
const connectDB = require('./config/db');
const user = require('./models/user'); 
const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/authmiddle');

const app = express ();  

// estabelece a conexao com bd
connectDB();

app.use(bodyParser.json()); //cnoverte o corpo da requisicao (req.body) em um obj json
app.use(cookieParser());    //permite que o servidor acesse e manipule cookies

app.use(express.static('public'));  

//conectando - rota de autenticacao (cadastro, login...) 
app.use('/api/auth', authRoutes);

//redireciona o usuario para a pag de login
app.get('/', (req,res) =>{
    res.redirect('/login.html');
});

//rota de teste (#excluir depois)
app.get('/api/dados/protegidos', protect, (req, res) =>{
    res.json({
        message: `Autenticado, ${req.userId} `,
        data: 'Seus dados confidenciais'
    });
});

app.listen(config.PORT, () =>{
    console.log(config.SUCESSO_MSG(config.PORT));
})
