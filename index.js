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


function listaAlunos () {
    if (alunos.length == 0) {
            console.log("Não existem alunos cadastrados, por favor, cadastre!");
            return;
        }
    else {
        for (let i = 0; i < alunos.length; i++) {
                console.log(alunos[i]);
        };  
    };
};

function cadastrarAlunos () {
    let nome = String(prompt("Informe o nome do aluno: "));
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
console.log("2. Listar Alunos");
console.log("0. sair");
console.log("");
    opcao = Number(prompt("Escolha um numero: "));

    switch (opcao) {
        case 1: 
                cadastrarAlunos();
            break;
        case 2:
                listaAlunos();
            break;
        case 0: 
                console.log("Saindo...")
            break;
    };
}
while (opcao !== 0);