// alunosService.js
const prompt = require('prompt-sync')();
const { validacoes } = require('../utils/validacoes');
const pool = require('../DataBase/database');
const { alunoRepository } = require('./repository');

class AlunosService {
    static async cadastrar(nome, nota, turma = "sem turma", cpf, email) {
        if (!validacoes.validarNome(nome)) throw new Error("Falha na validação do nome: Nome muito curto ou inválido.");
        if (!(await validacoes.validarCadastroNome(nome))) throw new Error("ERRO: Já existe um aluno com esse nome no sistema.");    
        if (!validacoes.validarNota(nota)) throw new Error("ERRO: Nota menor do que zero ou maior do que dez, tente novamente!");
        if ((await alunoRepository.buscarPorCPF(cpf))) throw new Error("ERRO: Já existe um aluno com esse CPF no sistema. Favor tente novamente");

        let status = validacoes.calcularStatus(nota);
        const aluno = await alunoRepository.adicionarAluno(nome, nota, turma, status, cpf, email)
        return {
            id_aluno: aluno,
            nome,
            nota,
            turma,
            status,
            cpf,
            email
        };
    };

    static async editar(id, nome, nota, turma, cpf, email) {
        const aluno = await validacoes.validarId(id)
        console.log(aluno);
        if (!aluno) throw new Error("Id informado não existe!!");

        let novoNome = nome ?? aluno.nome_aluno;
        let novaNota = (nota !== undefined && nota !== "") ? nota : aluno.nota_aluno;
        let novaTurma = turma ?? aluno.turma_aluno;
        let novoCpf = (cpf !== undefined && cpf !== "") ? cpf : aluno.cpf_aluno;
        let novoEmail = email ?? aluno.email_aluno;
        let novoStatus = validacoes.calcularStatus(novaNota);
        console.log("DADOS PARA UPDATE:", { id, novoNome, novaNota, novaTurma, novoStatus, novoCpf, novoEmail });
        const resultado = await alunoRepository.atualizarAluno(id, novoNome, novaNota, novaTurma, novoStatus, novoCpf, novoEmail);
            if(!resultado) throw new Error(`Erro ao atualizar os dados do banco`);

        return { 
            id, 
            novoNome, 
            novaNota, 
            novaTurma, 
            status: novoStatus, 
            novoCpf, 
            novoEmail 
        };
    };

    static async removerPorId(id) {// Esta função serve para remover o aluno existente.
        const resultado = await alunoRepository.excluirAluno(id);
            if (resultado === 0) throw new Error(`Aluno com o id: ${id} não encontrado! Tente novamente`);

        return "Aluno Excluido com sucesso!";
    };

    static async listaAlunos() { // Esta função verifica se existem alunos no array, se existir mostrar todos os alunos
        const alunos = await alunoRepository.obterAlunos();
        if (!alunos) throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
            return alunos;
    };

    static async buscarPorId(id) { // Esta função tem o trabalho de procurar o aluno pelo id informado.
        const aluno = await alunoRepository.encontrarAlunoPorId(id)
        
        if (!aluno) throw new Error(`Aluno com o id: ${id} não encontrado! Tente novamente`);
            return aluno;
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