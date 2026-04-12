// alunosService.js
const prompt = require('prompt-sync')();
const { validacoes } = require('../../utils/validacoes');
const pool = require('../DataBase/database');
const { alunoRepository } = require('./repository');

class AlunosService {
    static async cadastrar(nome, nota, turma = "sem turma") {
        if (!validacoes.validarNome(nome)) throw new Error("Falha na validação do nome: Nome muito curto ou inválido.");
        if (!(await validacoes.validarCadastroNome(nome))) throw new Error("ERRO: Já existe um aluno com esse nome no sistema.");    
        if (!validacoes.validarNota(nota)) throw new Error("ERRO: Nota menor do que zero ou maior do que dez, tente novamente!");

        let status = validacoes.calcularStatus(nota);
        const aluno = await alunoRepository.adicionarAluno(nome, nota, turma, status)
        return {
            id_aluno: aluno,
            nome,
            nota, 
            turma,
            status    
        };
    };

    static async editar(id, nome, nota) {
        const aluno = await validacoes.validarId(id)
        if (!aluno) throw new Error("Id informado não existe!!");

        let novoNome = nome || aluno.nome_aluno;
        let novaNota = (nota !== undefined && nota !== "") ? nota : aluno.nota_aluno;
        let novoStatus = validacoes.calcularStatus(novaNota);

        const resultado = await alunoRepository.atualizarAluno(id, novoNome, novaNota, novoStatus);
            if(!resultado) throw new Error(`Erro ao atualizar os dados do banco`);

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