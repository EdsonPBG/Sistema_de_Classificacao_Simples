// alunosService.js
const prompt = require('prompt-sync')();
const { validarNome, validarNota, calcularStatus } = require('../utils/validacoes');
const { salvar, obterAlunos, encontrarAlunoPorId, excluirAluno, adicionarAluno, encontraProximoId } = require('./repository'); 

function listaAlunos () { // Esta função verifica se existem alunos no array, se existir mostrar todos os alunos
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

function buscarPorId () { // Esta função tem o trabalho de procurar o aluno pelo id informado.
    const id_aluno = Number(prompt("Informe o ID do aluno para a busca: "));
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

function editarPorId () { // Esta função tem o trabalho de editar o aluno procurando pelo id
    const id_aluno = Number(prompt("Informe o ID do aluno para a edição: "));
    const aluno = encontrarAlunoPorId(id_aluno);
    const alunos = obterAlunos()
    if (!alunos) {
        console.log("Não existem alunos cadastrados, por favor, cadastre!");
        return;
    };

    if(!aluno) {
        console.log(`Aluno com o id: ${id_aluno} não encontrado! Tente novamente`);
            return;
    };
        console.log("");
        console.log("-- INFORMAÇÕES DO(A) ALUNO(A): --");
        console.log(`ID: ${aluno.id}`);
        console.log(`NOME: ${aluno.nome}`);
        console.log(`NOTA: ${aluno.nota}`);
        console.log(`STATUS: ${aluno.status}`);
        console.log(`--------------------------------------------------`);
        console.log("");
            let resposta = prompt("DESEJA CONTINUAR COM A EDIÇÃO? (S/N) ");
            resposta = resposta.toLowerCase();

        if (resposta === 's') {
            let newNome = prompt("Informe o novo nome: ");
                if (!validarNome(newNome)){
                    return;
                };
            let newNota = Number(prompt("Informe a nova nota: "));
                if (!validarNota(newNota)) {
                    return;
                };
            let newStatus = calcularStatus(newNota);
        
            aluno.nome = newNome;
            aluno.nota = newNota;
            aluno.status = newStatus;
            console.log("");
            console.log("Aluno Atualizado com sucesso!!");
            salvar(); //salva a edição
        };
};

function removerPorId () {// Esta função serve para remover o aluno existente.
    const id_aluno = Number(prompt("Informe o ID do aluno que deseja remover: "));
    const aluno = encontrarAlunoPorId(id_aluno);
    const alunos = obterAlunos()
    if (!alunos) {
        console.log("Não existem alunos cadastrados, por favor, cadastre!");
        return;
    };

    if (!aluno) {
        console.log(`Aluno com o id: ${id_aluno} não encontrado! Tente novamente`);
        return;
    };

    console.log("");
    console.log("INFORMAÇÕES DO(A) ALUNO(A):");
    console.log(`ID: ${aluno.id}`);
    console.log(`NOME: ${aluno.nome}`);
    console.log(`NOTA: ${aluno.nota}`);
    console.log(`STATUS: ${aluno.status}`);
    console.log(`--------------------------------------------------`);
    console.log("");

    let resposta = prompt("DESEJA CONTINUAR COM A EXCLUSÃO? (S/N) ");
    resposta = resposta.toLowerCase();

        if (resposta === 's') {
            excluirAluno(id_aluno);
            console.log("");
            console.log("Aluno Removido com sucesso!!");
            salvar(); //salva a remoção
        };
};

function cadastrarAlunos () {
    let nome = String(prompt("Informe o nome do aluno: "));
    if (!validarNome(nome)) {
        return;
    };

    let nota = Number(prompt("Informe a nota do aluno (0 a 10): "));
    if (!validarNota(nota)){
        return;
    };

    let status = calcularStatus(nota);

    const aluno = {
        id: encontraProximoId(),
        nome: nome,
        nota: nota,
        status: status
    };

    adicionarAluno(aluno);
    console.log("Aluno Cadastrado com sucesso!!");
    salvar(); // salvar o cadastro de alunos
};

function ordenarPorNome () {
    const alunos = obterAlunos();
    if (!alunos) {
            console.log("Não existem alunos cadastrados, por favor, cadastre!");
        return;
    };

    alunos.sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
    listaAlunos();
};
    
function ordenarPorNota () {
    const alunos = obterAlunos();
    if (!alunos) {
            console.log("Não existem alunos cadastrados, por favor, cadastre!");
        return;
    };
    alunos.sort((a, b) => b.nota - a.nota);
    listaAlunos();
};

function ordenarAlunos () {
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
                    ordenarPorNome();
                break;
            case 2:
                    ordenarPorNota();
                break;
            case 0:
                    console.log("Saindo...");
                break;
            default:
                console.log("Opção incorreta, escolha a opção certa!");
            
        };
    } while (opcao !== 0);
};

module.exports = { 
    listaAlunos, 
    buscarPorId, 
    editarPorId, 
    removerPorId, 
    cadastrarAlunos, 
    ordenarAlunos,
};