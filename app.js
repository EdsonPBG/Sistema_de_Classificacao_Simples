const express = require('express');
const app = express();
const port = 3000;
app.use(express.json())
const { AlunosService } = require('./service/alunosService');
const { carregar, salvar } = require('./service/repository');

carregar()
app.get('/alunos', (req, res) => {
    try
    {
        console.log("iniciando a procura...")
        const valorRecebido = AlunosService.acharAlunos()
        res.json(valorRecebido)
    } 
    catch (erro) 
    {
        console.error("status 404")
        res.status(404).json({ menssagem: erro.message});
    }
});

app.get('/alunos/:id', (req, res) => {
    try
    {
        const id = req.params.id
        const id_tratado = Number(id)
        const alunoEncontrado = AlunosService.buscarPorId(id_tratado)
        res.json(alunoEncontrado)
    }
    catch (erro) 
    {
        res.status(404).json({ menssagem: erro.message})
    }
});

app.post('/alunos', (req, res) => {
    try 
    {
        const {nome, nota} = req.body
        const cadastro = AlunosService.cadastrar(nome, nota)
        salvar()
        res.json(cadastro)
        console.log(req.body)
    }
    catch (erro)
    {
        res.status(404).json({ menssagem: erro.message })
    };
});

app.listen(port, () => {
    console.log(`\n✅ SUCESSO!`);
    console.log(`🌍 Servidor rodando em: http://localhost:${port}`);
    console.log(`⌨️  Pressione CTRL + C para desligar o servidor.`);
});