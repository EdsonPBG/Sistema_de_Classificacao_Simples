const prompt = require('prompt-sync')();
const fs = require('fs');


let alunos = []; // Cria um array vazio
let proximoId = 1; 

function salvar () {
    try{
        fs.writeFileSync("alunos.json", JSON.stringify(alunos, null, 2));
        console.log("Dados salvos com sucesso!!");
    }
    catch (erro) {
        console.log("Erro ao salvar os dados!!");
    };
};

function carregar () {
    try{
        let maiorId = 0;
        let conteudo = fs.readFileSync("alunos.json", "utf-8");
        if (!fs.existsSync("alunos.json")) {
            alunos = [];
            proximoId = 1;
            return;
        }
        if (conteudo.trim() === "") {
            alunos = [];
            proximoId = 1;
            return;
        }
        else {
            alunos = JSON.parse(conteudo);
            for (let i = 0; i < alunos.length; i++) {
                if (alunos[i].id > maiorId) {
                    maiorId = alunos[i].id;
                };
            };
            proximoId = maiorId + 1;
    };
    } catch (erro){
        console.log("Erro: Ocorreu um erro inesperado ao carregar");
    };
};


function validarNota (nota) { // Esta função tem o trabalho de validar se a nota esta entre 0 e 10, nada a mais nem a menos
    if (nota < 0 || nota > 10) {
        console.log("ERRO: Nota menor do que zero ou maior do que dez, tente novamente!");
        return false;
    }
    else {
        return true;
    };
};

function calcularStatus (nota) { // Esta função tem o trabalho de verificar as notas e informar ao sistema a situação do aluno, com base nas notas
        if (nota >= 7.0) {
            return "Aprovado";
        }
        else if (nota >= 5.0 && nota < 7.0) {
            return "Em Recuperacao";
        }
        else {
            return "Reprovado";
        };
    };


function listaAlunos () { // Esta função verifica se existem alunos no array, se existir mostrar todos os alunos
    if (alunos.length === 0) {
            console.log("Não existem alunos cadastrados, por favor, cadastre!");
            return;
        }
    else {
        console.log("-- LISTA DOS ALUNOS CADASTRADOS --");
        console.log("");
        for (let i = 0; i < alunos.length; i++) {
                console.log(alunos[i]);
        };  
    };
};

function buscarPorId () { // Esta função tem o trabalho de procurar o aluno pelo id informado.
    let id_aluno = Number(prompt("Informe o ID do aluno para a busca: "));
    let existe = false;

    if (alunos.length === 0) { // Verifica se existe aluno no array
            console.log("Não existem alunos cadastrados, por favor, cadastre!");
            return;
        }
    else { // Se existir, faz um loop e compara o id informado com o id do aluno e mostra o aluno com o id certo
        for (let i = 0; i < alunos.length; i++) {
                if (id_aluno === alunos[i].id) { 
                    existe = true;
                    console.log(`Aluno com o id: ${id_aluno} encontrado com sucesso!`);
                    console.log("");
                    console.log(alunos[i]);
                };
        };  
            if (existe === false) { // Essa verificação serve para identificar que o aluno não foi encontrado ou id não existe
                    console.log(`Aluno com o id: ${id_aluno} não encontrado! Tente novamente`);
                    return;
            };
    };
};

function editarPorId () { // Esta função tem o trabalho de editar o aluno procurando pelo id
    let id_aluno = Number(prompt("Informe o ID do aluno para a edição: "));
    let existe = false;

    if (alunos.length === 0) {
            console.log("Não existem alunos cadastrados, por favor, cadastre!");
            return;
        }
    else { // se existir alunos no array, cria um loop que acha o aluno, mostra o aluno e permite fazer a edição do nome e da nota
        for (let i = 0; i < alunos.length; i++) {
                if (id_aluno === alunos[i].id) { 
                    existe = true;
                    console.log("");
                    console.log("INFORMAÇÕES DO(A) ALUNO(A):");
                    console.log(alunos[i]);
                    console.log("");
                    let resposta = prompt("DESEJA CONTINUAR COM A EDIÇÃO? (S/N) ");

                    if (resposta === 's' || resposta === 'S') {
                        let newName = prompt("Informe o novo nome: ");
                        let newNota = Number(prompt("Informe a nova nota: "));
                            if (!validarNota(newNota)) {
                                return;
                            };
                        let newStatus = calcularStatus(newNota);

                        alunos[i].name = newName;
                        alunos[i].nota = newNota;
                        alunos[i].status = newStatus;
                        console.log("");
                        console.log("Aluno Atualizado com sucesso!!");
                        salvar(); //salva a edição
                    };
                };
        };  
            if (existe === false) {
                    console.log(`Aluno com o id: ${id_aluno} não encontrado! Tente novamente`);
                    return;
            };
    };
};

function removerPorId () {// Esta função serve para remover o aluno existente.
    let id_aluno = Number(prompt("Informe o ID do aluno que deseja remover: "));
    let existe = false;

    if (alunos.length === 0) {
        console.log("Não existem alunos cadastrados, por favor, cadastre!");
        return;
    }
    else {// Se existir aluno cadastrado, mostra o aluno e pergunta se realmente quer excluir, se sim, o aluno é removido do array
        for (let i = 0; i < alunos.length; i++) {
                if (id_aluno === alunos[i].id) { 
                    existe = true;
                    console.log("");
                    console.log("INFORMAÇÕES DO(A) ALUNO(A):");
                    console.log(alunos[i]);
                    let resposta = prompt("DESEJA CONTINUAR COM A EXCLUSÃO? (S/N) ");

                    if (resposta === 's' || resposta === 'S') {
                        alunos.splice(i, 1);
                        console.log("");
                        console.log("Aluno Removido com sucesso!!");
                        salvar(); //salva a remoção
                    };

                    return;
                };
        };  
            if (existe === false) {
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
        salvar(); // salvar o cadastro de alunos
    };

let opcao;
do{
carregar();
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
                salvar();
            break;
        default:
                console.log("Opção incorreta, escolha a opção certa!");
    };
}
while (opcao !== 0);