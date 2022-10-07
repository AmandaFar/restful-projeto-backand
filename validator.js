//modulo para validacao

module.exports = {

    // validacao de usuarios
    user: (app, req, res) =>{

        //verifica os campos do body e faz a validacao
            //no parametro informa o nome do campo e uma mensagem de err caso o campo nao seja valido
            //o metodo notEmpty() é para validacao, nao vazio
            //isEmail()para saber se é um email
            req.assert('name', 'O nome é obrigatório.').notEmpty();
            req.assert('email', 'O e-mail está inválido.').notEmpty().isEmail();

            //variavel para verificar os erros e validar os erros
            let errors = req.validationErrors();

            //verificado se essa variavel está existindo
            //se existir retorna o array, se nao retorna false
            if (errors){

                //mostra o erro na tela
                app.utils.error.send(errors, req, res);

                //parar a execucao para nao ficar fazendo insert
                return false;

            }else {

                return true;
            }
    }
}