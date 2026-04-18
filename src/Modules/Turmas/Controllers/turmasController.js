const erroMiddleware = require('../../../Middleware/erroMiddleware');
const { turmasService } = require('../Services/turmasService');

class turmasController
{
    static async criarTurma(req, res, next)
    {
        try
        {
            const { nome, ano } = req.body
            const turma = await turmasService.cadastrarTurmas(nome, ano);
            res.json(turma);
        }
        catch(erro)
        {
            next(erro);
        };
    };

    static async listarTurmas(req, res, next)
    {
        try
        {
            const turma = await turmasService.listarTurmas()
            res.json(turma)
        }
        catch(erro)
        {
            next(erro)
        };
    };

    static async excluirTurmas(req, res, next)
    {
        try
        {
            const id = Number(req.params.id);
            const excluirTurmas = await turmasService.excluirTurmas(id);
            console.log(id);
            res.json(excluirTurmas);
        }
        catch(erro)
        {
            next(erro);
        };
    };

    static async editarTurmas(req, res, next)
    {
        try{
            const id = Number(req.params.id);
            let nome = req.body.nome;
            let ano = req.body.ano;
            const editarTurmas = await turmasService.editarTurmas(id, nome, ano);
            res.json(editarTurmas);
        }
        catch(erro)
        {
            next(erro);
        };
    };
};

module.exports =
{
    turmasController
}