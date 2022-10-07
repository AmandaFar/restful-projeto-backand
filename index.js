
//exportando o modulo para o index que faz o chamamento
//chama o modulo e informa o q estah exportanto, no o routes, a rota
//entao q vc criar em routes serah exportado para o index principal, o de chamamento, como um modulo
module.exports = (app) =>{

//momento da criacao do servidor com as chamadas e respostas (req, res)
// metodo get para criacao de rotas
//acessivel pelo metodo get na applicacao
//o paramentro '/' é justamente a rota
app.get('/', (req, res) => {

    //qual o status dessa conexao
           //protocolo http
           res.statusCode = 200;

           //enviamos uma resposta, 'res', com um html
           //'content-type', tipo de contexto
           //'text/html' para informar que eh um html
           res.setHeader('Content-Type', 'text/html');
           //processa como html
           res.end('<h1>Olá</h>');

});
}