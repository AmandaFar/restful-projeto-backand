//O código de status de resposta HTTP 400 Bad Request indica que o servidor não pode 
//ou não irá processar a requisição devido a alguma coisa que foi entendida como um erro do cliente 
//(por exemplo, sintaxe de requisição mal formada, enquadramento de mensagem de requisição inválida)


//O código HTTP 200 OK é a resposta de status de sucesso que indica que a requisição foi bem sucedida. 
//Uma resposta 200 é cacheável por padrão. O significado de sucesso depende do método de requisição HTTP: 
//GET : O recurso foi carregado e transmitido no corpo da mensagem


//requisicao bando de dados javascript -> NeDB
let NeDB = require('nedb');

//criando o bando de dados -> NeDB
let db = new NeDB ({

    //o arquvio q queremos colocar em disco
    filename: 'users.db',
    
    //se o arquivo existir ja carrega
    autoload: true
});

//exportando o modulo para o index que faz o chamamento
//chama o modulo e informa o q estah exportanto, no o routes, a rota
//entao q vc criar em routes serah exportado para o index principal, o de chamamento, como um modulo
//funcao (arrew funtion) q recebe o app qdo for invocado
module.exports = (app) =>{

    //para a parte de rotas
    //rota padrao /users
    let route = app.route('/users');

    //barra users
    route.get((req, res) =>{

        //para listar usuarios no banco
        // find -> para encontar, 
        //sort-> para ordenar pelo nome, 1 para crescente e -1 para decrescente
        //exec -> executa caso tenha erro e passa dados do usuario
        db.find({}).sort({name:1}).exec ((err, users) =>{

            if (err) {
                //ja trata no metodo send da pasta utils
                app.utils.error.send(err, req, res);

            }else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');

            //enviamos o json
            //responde com o json
            res.json({
                users

                });

            }


        })
             

});
//barra users/admin
route.post((req, res) =>{

    //para para validar e parar a execução
    //se for falso retorná falso
    if (!app.utils.validator.user(app, req, res)) return false;

            //INSERINDO USUARIO/ metodo GET/POST
            //para salvar no banco
            //passa um objeto json {} q eu quero salvar como parametro 
            //e uma funcao para caso der erro no registro e tb responde com os dados do usuario
            //os campos q enviamos via post ficam dentro de req.body
            db.insert(req.body, (err, user) =>{

                //se o parametro der erro, exibir uma mensagem no console
                if (err){
                     //ja trata no metodo send da pasta utils
                    app.utils.error.send(err, req, res);

                    //caso nao aconteca o erro, retorna com os dados do usuario no objeto json
                } else {

                    res.status(200).json(user);

                }
            });

     });

     //para retornar apenas um registro, um usuario
     let routeId = app.route('/users/:id');

     //tratamento do restistro
     //o que deve fazer
     routeId.get((req, res) =>{

        //usando o metodo DB findOne onde localiza somente um registro
        //como parametro o ID
        //exec para executar o erro ou os dados do usuario
        db.findOne({_id:req.params.id}).exec((err, user) =>{

              //se o parametro der erro, exibir uma mensagem no console
              if (err){
                //ja trata no metodo send da pasta utils
               app.utils.error.send(err, req, res);

               //caso nao aconteca o erro, retorna com os dados do usuario no objeto json
           } else {

               res.status(200).json(user);

           }
       
        });
     });

        //EDICAO- USANDO O metodo PUT/UPDATE
      //tratamento do restistro
     //o que deve fazer
     routeId.put((req, res) =>{

             //para para validar e parar a execução
            //se for falso retorná falso
            if (!app.utils.validator.user(app, req, res)) return false;
        
        //update, atualizando os dados do usuario
        //como parametro o ID e os dados do usuario req.body
        //funcao de callback, os dados do usuario, retorna o erro
        db.update({_id:req.params.id}, req.body, err =>{

              //se o parametro der erro, exibir uma mensagem no console
              if (err){
                //ja trata no metodo send da pasta utils
               app.utils.error.send(err, req, res);

               //caso nao aconteca o erro, retorna com os dados do usuario no objeto json
           } else {
                //para juntar as duas informacoes, req.params e red.body
                // usamos o assign
               res.status(200).json(Object.assign(req.params, req.body));

           }
       
        });

     });
     //EXCLUINDO usuario, metodo DELETE

     routeId.delete((req, res)=>{

        //informamos os parametros do serah removido
        //params.id vindo da rota
        //{} pode ser um ou varios usuarios, passamos vazio nesse caso
        //funcao de callback para saber s deu erro ou se funcionou
        db.remove({_id: req.params.id}, {}, err=>{

            //se o parametro der erro, exibir uma mensagem no console
            if (err){
                //ja trata no metodo send da pasta utils
               app.utils.error.send(err, req, res);

               //caso nao aconteca o erro, retorna com os dados do usuario no objeto json
           } else {
                // req.params para informar qual id excluido
               res.status(200).json(req.params);

           }
        });
     })
};
