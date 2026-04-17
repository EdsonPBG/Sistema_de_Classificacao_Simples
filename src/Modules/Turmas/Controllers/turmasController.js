const erroMiddleware = require('../../../Middleware/erroMiddleware');
const { turmasService } = require('../Services/turmasService');

class turmasController
{
    static async criarTurma(req, res, next)
    {
        try
        {
            const { nome, ano } = req.body
            const turma = await turmasService.cadastrarTurma(nome, ano);
            res.json(turma);
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