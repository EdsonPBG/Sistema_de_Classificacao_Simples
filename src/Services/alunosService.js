// alunosService.js
const prompt = require('prompt-sync')();
const { validarNome, validarNota, calcularStatus, validarCadastroNome, validarId } = require('../../utils/validacoes');
const pool = require('../DataBase/database');
const { encontrarAlunoPorId, excluirAluno, adicionarAluno, encontraProximoId, obterAlunos, encontrarAlunoPorNome } = require('./repository'); 

class AlunosService {
    static async cadastrar(nome, nota, turma = "sem turma") {
        if (!validarNome(nome)) {
            throw new Error("Falha na validação do nome: Nome muito curto ou inválido.");
        };
        if (!validarCadastroNome(nome)) {
            throw new Error("ERRO: Já existe um aluno com esse nome no sistema.");    
        };
        if (!validarNota(nota)){
            throw new Error("ERRO: Nota menor do que zero ou maior do que dez, tente novamente!");
        };
        let status = calcularStatus(nota);
        let querySql = 'INSERT INTO alunos (nome_aluno, nota_aluno, turma_aluno, status_aluno) VALUES (?,?,?,?)';
        let parametros = [nome, nota, turma, status];

        const [aluno] = await pool.query(querySql, parametros)
        return {
            id_aluno: aluno.insertId,
            nome,
            nota, 
            turma,
            status    
        };
    };

    static async editar(id, nome, nota) {
        const [alunoAtual] = await pool.query('SELECT * FROM alunos WHERE id_aluno = ?', [id]);
        if (alunoAtual.length === 0) throw new Error("Id informado não existe!!");

        let aluno = alunoAtual[0];
        let novoNome = nome || aluno.nome_aluno
        let novaNota = (nota !== undefined && nota !== "") ? nota : aluno.nota_aluno
        let novoStatus = calcularStatus(novaNota)

        let querySql = 'UPDATE alunos SET nome_aluno = ?, nota_aluno = ?, status_aluno = ? WHERE id_aluno = ?';
        let parametros = [novoNome, novaNota, novoStatus, id];
        const [resultado] = await pool.query(querySql, parametros);
            if(resultado.affectedRows === 0)
            {
                throw new Error(`Aluno com o id: ${id} não encontrado! Tente novamente`);
            }

        return { id, novoNome, novaNota, status: novoStatus };
    };

    static async removerPorId (id) {// Esta função serve para remover o aluno existente.
        let querySql = 'DELETE FROM alunos WHERE id_aluno = ?';
        let parametros = [id];
        const [resultado] = await pool.query(querySql, parametros);
            if (resultado.affectedRows === 0) 
            {
                throw new Error(`Aluno com o id: ${id} não encontrado! Tente novamente`);
            };

        return "Aluno Excluido com sucesso!";
    };

    static listaAlunos () { // Esta função verifica se existem alunos no array, se existir mostrar todos os alunos
        const alunos = obterAlunos();
        if (!alunos || alunos.length === 0) 
        {
            throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
        }
        return alunos;
    };

    static buscarPorId (id) { // Esta função tem o trabalho de procurar o aluno pelo id informado.
        const alunos = obterAlunos()

        validarId(id)
        const aluno = encontrarAlunoPorId(id);

        if (!alunos) {
            throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
        };

        if (!aluno) { // Essa verificação serve para identificar que o aluno não foi encontrado ou id não existe
                throw new Error(`Aluno com o id: ${id} não encontrado! Tente novamente`);
        };

        return aluno;
    };

    static encontrarAluno(id) {
        const encontrado = encontrarAlunoPorId(id);

        if (!encontrado) {
            throw new Error(`Aluno com o id: ${id} não encontrado! Tente novamente`);
        };
            return encontrado;
    };

    static acharAlunos() {
        const achado = obterAlunos();

        if (!achado) {
            throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
        };
            return achado;
    };

    static ordenarPorNome () {
        const alunos = obterAlunos();
        if (!alunos) {
            throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
        };

        return[...alunos].sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
    };

    static ordenarPorNota () {
        const alunos = obterAlunos();
        if (!alunos) {
            throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
        };
        return [...alunos].sort((a, b) => b.nota - a.nota);
    };

    static ordenarAlunos (opcao) {
        const alunos = obterAlunos()
        if (alunos.length === 0) throw new Error("Lista Vazia!")
            
        switch (opcao) {
            case 1:
                   return this.ordenarPorNome();
            case 2:
                   return this.ordenarPorNota();
            case 0:
                    console.log("Saindo...");
                break;
            default:
                throw new Error("Opção incorreta, escolha a opção certa!");
        };
    };
};

module.exports = {
    AlunosService
};