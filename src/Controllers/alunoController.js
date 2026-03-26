const { AlunosService } = require("../Services/alunosService");
const { salvar } = require("../Services/repository");

class alunoController {
    static listarTodos (req, res) 
    {
        try
        {
            console.log("Iniciando busca...");
            const alunos = AlunosService.acharAlunos();
            res.json(alunos);
        }
        catch (erro)
        {
            res.status(404).json({ menssagem: erro.message });
        };
    };

    static encontrarPorId (req, res)
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
            res.status(404).json({ menssagem: erro.message });
        };
    };

    static cadastrarAluno (req, res) 
    {
        try
        {
            console.log("Cadastrando aluno...");
            const { nome, nota } = req.body;
            const cadastro = AlunosService.cadastrar(nome, nota);
            res.json(cadastro);
            salvar();
        }
        catch (erro)
        {
            res.status(404).json({ menssagem: erro.message });
        };
    };

    static deletarAluno (req, res) 
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
            res.status(404).json({ menssagem: erro.message });
        };
    };

    static editarAluno (req, res) 
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
            res.status(404).json({ menssagem: erro.message });
        };
    };
};

module.exports = 
{
    alunoController
}