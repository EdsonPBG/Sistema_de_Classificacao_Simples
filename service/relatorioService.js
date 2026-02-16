const { obterAlunos } = require("./repository");
const prompt = require('prompt-sync')();

function gerarEstatisticaGeral () {
    let opcao;
    do {
        console.log("");
        console.log("-- OPÇÕES PARA RELATORIOS --");
        console.log("");
        console.log("1. Relatorio de media geral");
        console.log("2. Relatorio do melhor aluno e do pior aluno");
        console.log("0. Sair");
        opcao = Number(prompt("Escolha um numero: "));
        console.log("");
        switch (opcao) {
            case 1:
                    mediaGeral();
                break;
            case 2:
                    melhorPiorAluno();
                break;
            case 0:
                    console.log("Saindo...");
                break;
            default:
                console.log("Opção incorreta, escolha a opção certa!");
            
        };
    } while (opcao !== 0);
};

function mediaGeral () {
    const alunos = obterAlunos();
    let soma = 0.0;
    let media = 0.0;

    if (!alunos || alunos.length <= 0) {
        console.log("Não existem alunos cadastrados! Por favor, cadastre");
        return;
    };
        for (let i = 0; i < alunos.length; i++) {
            let aluno = alunos[i];
            soma = soma + aluno.nota;
        };
        media = ( soma/alunos.length );

        console.log(`A média geral dos alunos é: ${media.toFixed(2)}`);
};

function melhorPiorAluno () {
    const alunos = obterAlunos();

    if (!alunos || alunos.length <= 0) {
        console.log("Não existem alunos cadastrados! Por favor, cadastre");
        return;
    };

    let melhorAluno = alunos[0];
    let piorAluno = alunos[0];
    let soma = alunos[0].nota;
    let media = 0.0;
    for (let i = 1; i < alunos.length; i++) {
        const aluno = alunos[i];
        soma = soma + aluno.nota;

        if (aluno.nota > melhorAluno.nota) {
            melhorAluno = aluno;
        }
        else if (aluno.nota < piorAluno.nota) {
            piorAluno = aluno;
        };
    };
    media = ( soma/alunos.length )
    console.log(`A média das notas é: ${media.toFixed(2)}`);
    console.log(`Melhor aluno(a): ${melhorAluno.nome}, sua nota foi ${melhorAluno.nota}.`);
    console.log(`Pior aluno(a): ${piorAluno.nome}, sua nota foi: ${piorAluno.nota}`);
};

module.exports = {
    gerarEstatisticaGeral,
    mediaGeral,
    melhorPiorAluno
};