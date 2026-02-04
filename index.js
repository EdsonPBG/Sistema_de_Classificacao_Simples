const prompt = require('prompt-sync')();

let alunos = [];
let proximoId = 1;

function validarNota (nota) {
    if (nota < 0 || nota > 10) {
        console.log("ERRO: Nota menor do que zero ou maior do que dez, tente novamente!");
        return false;
    }
    else {
        return true;
    }
};

function validarNome (nome) {
    if (!nome || nome.trim().length < 2) {
        console.log("ERRO: Nome invalido")
        return false;
    }
    else {
        return false;
    }
}

function calcularStatus (nota) {
        if (nota >= 7.0) {
            return "Aprovado";
        }
        else if (nota >= 5.0 && nota < 7.0) {
            return "Em Recuperacao";
        }
        else {
            return "Reprovado";
        }
    };

function cadastrarAlunos () {
    let nome = String(prompt("Informe o nome do aluno: "));
    if (!validarNome(nome)){
        return;
    }
    let nota = Number(prompt("Informe a nota do aluno (0 a 10): "));
    if (!validarNota(nota)){
        return;
    };

    let status = calcularStatus(nota);

        const aluno = {
            id: proximoId,
            name: nome,
            nota: nota,
            status: status
        };

        alunos.push(aluno);
        proximoId++;

        console.log("Aluno Cadastrado com sucesso!!");
    };

let opcao;
do{
console.log("-- Menu dos alunos --");
console.log("");
console.log("1. Cadastrar Aluno");
console.log("0. sair");
console.log("");
    opcao = Number(prompt("Escolha um numero: "));

    switch (opcao) {
        case 1: 
            cadastrarAlunos();
        break;
        case 0: 
            console.log("Saindo...")
        break;
    };
}
while (opcao !== 0);