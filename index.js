//ESSE index que faz o chamamento, eh o index principal

//criaando um servidor web
//criacao da constante e uso do modulo express
//o express ja chama o http internamente
//o modulo express tem varios recursos:
//Gerenciar requisições de diferentes verbos HTTP em diferentes URLs.
//Definir as configurações comuns da aplicação web,
// como a porta a ser usada para conexão e a localização dos modelos que são usados para renderizar a resposta, etc.
const express= require('express');


//a biblioteca do consign é sugerida para
//facilitar o gerenciamento de rotas no express
//criacao da constante e uso do modulo consign
const consign = require('consign');

//solicitando o body parser, p/ interpretação do metodo post
//criacao da const
//body- parser eh nome do modulo
const bodyparser = require('body-parser');

//metodo para validacoes
//criacao da const
const expressValidator = require('express-validator');


//variavel para invocar o express e saber tdas as informacoes funcionanda dentro
let app = express();

//para dependendo da condificacao q vier, ele vai entender tb
app.use(bodyparser.urlencoded({extended: false}));

//transforma o objeto em json
app.use(bodyparser.json());

//para invocar o metodo
app.use(expressValidator());

//invocar o consign e inclui a pasta routes dentro do app
//inclui todos os arquivo dessa pasta
//inclui todos os arquivos da pasta util
consign().include('routes').include('utils').into(app);


//ouvir o servidor na porta 3000, o ip local e funcao do que ele tem q executar
app.listen(3000, '127.0.0.1', () => {

    console.log("servidor rodando!");

});