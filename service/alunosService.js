// alunosService.js
const prompt = require('prompt-sync')();
const { validarNome, validarNota, calcularStatus, validarCadastroNome, validarId } = require('../utils/validacoes');
const { encontrarAlunoPorId, excluirAluno, adicionarAluno, encontraProximoId, obterAlunos } = require('./repository'); 

class AlunosService {
    static cadastrar(nome, nota) {
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

        const aluno = {
            id: encontraProximoId(),
            nome: nome,
            nota: nota,
            status: status
        };

        adicionarAluno(aluno);
        return "Aluno Cadastrado!"
    };

    static editar(id, nome, nota) {
        const encontrado = encontrarAlunoPorId(id);
        if (!encontrado) {
            return {sucesso: false, mensagem: `Aluno com o id: ${id} não encontrado! Tente novamente`};
        };

        if (nome !== undefined && nome !== "") {
            if (!validarNome(nome) || !validarCadastroNome(nome)) {
                return {sucesso: false, mensagem: "Nome novo invalido ou já existente"};
            };
            encontrado.nome = nome
        };

        if (nota !== undefined && nota !== "") {
            if (!validarNota(nota)) {
                return {sucesso: false, mensagem: "Nova nota invalida"};
            };
            encontrado.nota = nota
            encontrado.status = calcularStatus(encontrado.nota)
        };
        return {sucesso: true, mensagem: "Aluno editado com sucesso"};
    };

    static removerPorId (id) {// Esta função serve para remover o aluno existente.
        if (!validarId(id)) {
            throw new Error("Erro: Id invalido! Tente novamente");
        };

        if (!excluirAluno(id)) {
            throw new Error("Erro: Falha ao tentar excluir o aluno");
        };

        return "Aluno Excluido com sucesso!";
    };

    static listaAlunos () { // Esta função verifica se existem alunos no array, se existir mostrar todos os alunos
        const alunos = obterAlunos();
        if (!alunos) {
            console.log("Não existem alunos cadastrados, por favor, cadastre!");
            return;
        };

        for (let i = 0; i < alunos.length; i++) {
            const aluno = alunos[i];
            console.log("-- INFORMAÇÕES DO ALUNO(A):");
            console.log("");
            console.log(`ID: ${aluno.id}`);
            console.log(`NOME: ${aluno.nome}`);
            console.log(`NOTA: ${aluno.nota}`);
            console.log(`STATUS: ${aluno.status}`);
            console.log(`--------------------------------------------------`);
            console.log("")
        };
    };

    static buscarPorId () { // Esta função tem o trabalho de procurar o aluno pelo id informado.
        const id_aluno = Number(prompt("Informe o ID do aluno para a busca: "));
        if (!validarId(id_aluno)) {
            return;
        };
        const aluno = encontrarAlunoPorId(id_aluno);
        const alunos = obterAlunos()
        if (!alunos) {
            console.log("Não existem alunos cadastrados, por favor, cadastre!");
            return;
        };

        if (aluno) {
            console.log("-- INFORMAÇÕES DO ALUNO(A):");
            console.log("");
            console.log(`ID: ${aluno.id}`);
            console.log(`NOME: ${aluno.nome}`);
            console.log(`NOTA: ${aluno.nota}`);
            console.log(`STATUS: ${aluno.status}`);
            console.log(`--------------------------------------------------`);
            console.log("")
            return;
        };

        if (!aluno) { // Essa verificação serve para identificar que o aluno não foi encontrado ou id não existe
                console.log(`Aluno com o id: ${id_aluno} não encontrado! Tente novamente`);
                return;
        };
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
            return {sucesso: false, mensagem: "Não existem alunos cadastrados, por favor, cadastre!"};
        };
            return {sucesso: true};
    };

    static ordenarPorNome () {
        const alunos = obterAlunos();
        if (!alunos) {
                console.log("Não existem alunos cadastrados, por favor, cadastre!");
            return;
        };

        alunos.sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
        this.listaAlunos();
    };

    static ordenarPorNota () {
        const alunos = obterAlunos();
        if (!alunos) {
                console.log("Não existem alunos cadastrados, por favor, cadastre!");
            return;
        };
        alunos.sort((a, b) => b.nota - a.nota);
        this.listaAlunos();
    };

    static ordenarAlunos () {
        let opcao;
        do {
            console.log("");
            console.log("-- OPÇÕES PARA ORDENAÇÃO --");
            console.log("");
            console.log("1. Ordenar por Nome");
            console.log("2. Ordenar por Nota");
            console.log("0. Sair");
            opcao = Number(prompt("Escolha um numero: "));
            console.log("");
            switch (opcao) {
                case 1:
                        this.ordenarPorNome();
                    break;
                case 2:
                        this.ordenarPorNota();
                    break;
                case 0:
                        console.log("Saindo...");
                    break;
                default:
                    console.log("Opção incorreta, escolha a opção certa!");
                
            };
        } while (opcao !== 0);
    };

};

module.exports = {
    AlunosService
};