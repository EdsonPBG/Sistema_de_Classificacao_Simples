const erroMiddleware = require("../Middleware/erroMiddleware");
const { AlunosService } = require("../Services/alunosService");
const { relatorioService } = require("../Services/relatorioService");
const { salvar } = require("../Services/repository");

class alunoController {
    static listarTodos (req, res, next) 
    {
        try
        {
            console.log("Iniciando busca...");
            const { status, turma } = req.query;
            const alunos = relatorioService.filtroAvançado(status, turma);
            res.json(alunos);
        }
        catch (erro)
        {
            erro.status = 404;
            next(erro)
        };
    };

    static encontrarPorId (req, res, next)
    {
        try
        {
            console.log("Encontrando aluno...");
            const id = Number(req.params.id);
            const aluno = AlunosService.buscarPorId(id);
            res.json(aluno);
        }
        catch (erro)
        {
            erro.status = 404;
            next(erro)
        };
    };

    static cadastrarAluno (req, res, next) 
    {
        try
        {
            console.log("Cadastrando aluno...");
            const { nome, nota, turma } = req.body;
            const cadastro = AlunosService.cadastrar(nome, nota, turma);
            res.json(cadastro);
            salvar();
        }
        catch (erro)
        {
            erro.status = 404;
            next(erro)
        };
    };

    static deletarAluno (req, res, next) 
    {
        try
        {
            console.log("Deletando aluno...")
            const id = Number(req.params.id);
            const deletar = AlunosService.removerPorId(id);
            res.json(deletar);
            salvar();
        }
        catch (erro)
        {
            erro.status = 404;
            next(erro)
        };
    };

    static editarAluno (req, res, next) 
    {
        try
        {
            const id = Number(req.params.id);
            const nome = req.body.nome;
            const nota = req.body.nota;
            const editar = AlunosService.editar(id, nome, nota);
            res.json(editar);
            salvar();
        }
        catch (erro)
        {
            erro.status = 404;
            next(erro);
        };
    };
};

module.exports = 
{
    alunoController
}