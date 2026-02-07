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

function buscarPorId () {
    let id_aluno = Number(prompt("Informe o ID do aluno para a busca: "));
    let existe = false;

    if (alunos.length == 0) {
            console.log("Não existem alunos cadastrados, por favor, cadastre!");
            return;
        }
    else {
        for (let i = 0; i < alunos.length; i++) {
                if (id_aluno == alunos[i].id) { 
                    existe = true;
                    console.log(alunos[i]);
                };
        };  
            if (existe == false) {
                    console.log(`Aluno com o id: ${id_aluno} não encontrado! Tente novamente`);
                    return;
            };
    };
};

function editarPorId () {
    let id_aluno = Number(prompt("Informe o ID do aluno para a edição: "));
    let existe = false;

    if (alunos.length == 0) {
            console.log("Não existem alunos cadastrados, por favor, cadastre!");
            return;
        }
    else {
        for (let i = 0; i < alunos.length; i++) {
                if (id_aluno == alunos[i].id) { 
                    existe = true;
                    console.log("");
                    console.log("INFORMAÇÕES DO(A) ALUNO(A):");
                    console.log(alunos[i]);
                    console.log("");
                    let newName = prompt("Informe o novo nome: ");
                    let newNota = Number(prompt("Informe a nova nota: "));
                        if (!validarNota(newNota)) {
                            return;
                        };
                    let newStatus = calcularStatus(newNota);

                    alunos[i].name = newName;
                    alunos[i].nota = newNota;
                    alunos[i].status = newStatus;

                    console.log("Aluno Atualizado com sucesso!!");
                };
        };  
            if (existe == false) {
                    console.log(`Aluno com o id: ${id_aluno} não encontrado! Tente novamente`);
                    return;
            };
    };
};

function removerPorId () {
    let id_aluno = Number(prompt("Informe o ID do aluno que deseja remover: "));
    let existe = false;

    if (alunos.length == 0) {
        console.log("Não existem alunos cadastrados, por favor, cadastre!");
        return;
    }
    else {
        for (let i = 0; i < alunos.length; i++) {
                if (id_aluno == alunos[i].id) { 
                    existe = true;
                    console.log("");
                    console.log("INFORMAÇÕES DO(A) ALUNO(A):");
                    console.log(alunos[i]);
                    let resposta = prompt("DESEJA CONTINUAR COM A EXCLUSÃO? (S/N) ");

                    if (resposta == 's') {
                        alunos.splice(i, 1);
                        console.log("Aluno Removido com sucesso!!");
                    };

                    return;
                };
        };  
            if (existe == false) {
                    console.log(`Aluno com o id: ${id_aluno} não encontrado! Tente novamente`);
                    return;
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
console.log("3. Buscar Alunos Por ID");
console.log("4. Editar Aluno Por ID");
console.log("5. Excluir Aluno Por ID");
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
        case 3:
                buscarPorId();
            break;
        case 4:
                editarPorId();
            break;
        case 5:
                removerPorId();
            break;
        case 0: 
                console.log("Saindo...")
            break;
    };
}
while (opcao !== 0);