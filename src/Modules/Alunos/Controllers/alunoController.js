const erroMiddleware = require("../../../Middleware/erroMiddleware");
const { AlunosService } = require("../Services/alunosService");
const { relatorioService } = require("../Services/relatorioService");
const { alunoRepository } = require("../Repository/alunoRepository");

class alunoController {
    static async listarTodos(req, res, next) 
    {
        try
        {
            console.log("Iniciando busca...");
            const { status, turma } = req.query;
            const alunos = await relatorioService.filtroAvançado(status, turma);
            res.json(alunos);
        }
        catch (erro)
        {
            next(erro)
        };
    };

    static async listarAlunosComTurma(req, res, next) 
    {
        try
        {
            console.log("Iniciando busca...");
            const alunos = await AlunosService.listaAlunoComTurma();
            res.json(alunos);
        }
        catch (erro)
        {
            next(erro)
        };
    };

    static async encontrarPorId (req, res, next)
    {
        try
        {
            console.log("Encontrando aluno...");
            const id = Number(req.params.id);
            const aluno = await AlunosService.buscarPorId(id);
            res.json(aluno);
        }
        catch (erro)
        {
            erro.status = 404;
            next(erro)
        };
    };

    static async cadastrarAluno (req, res, next) 
    {
        try
        {
            console.log("Cadastrando aluno...");
            const { nome, nota, turma, cpf, email } = req.body;
            const cadastro = await AlunosService.cadastrar(nome, nota, turma, cpf, email);
            res.json(cadastro);
        }
        catch (erro)
        {
            erro.status = 404;
            next(erro)
        };
    };

    static async deletarAluno (req, res, next) 
    {
        try
        {
            console.log("Deletando aluno...")
            const id = Number(req.params.id);
            const deletar = await AlunosService.removerPorId(id);
            res.json(deletar);
        }
        catch (erro)
        { 
            erro.status = 404;
            next(erro)
        };
    };

    static async editarAluno (req, res, next) 
    {
        try
        {
            const id = Number(req.params.id);
            const nome = req.body.nome;
            const nota = req.body.nota;
            const turma = req.body.turma;
            const cpf = req.body.cpf;
            const email = req.body.email;
            const editar = await AlunosService.editar(id, nome, nota, turma, cpf, email);
            res.json(editar);
        }
        catch (erro)
        {
            next(erro);
        };
    };
};

module.exports = 
{
    alunoController
}