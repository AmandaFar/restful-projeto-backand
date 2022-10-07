//a pasta util sao para nossas utilidades
//nesse caso para tratar os erros
//criamos uma funcao para os erros
//toda vez q precisarmos exportamos como modulo
module.exports = {
    //metodo send 
    //tem o err, req, res e o cod 400
    send: (err, req, res, code = 400) => {

        //isso eh o que a funcao ira fazer
        console.log('error: ${err}');
        res.status(code).json({
            error:err

        });
    }

};