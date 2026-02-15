// repository.js
const fs = require('fs');

let alunos = [];
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
        if (!fs.existsSync("alunos.json")) {
            alunos = [];
            proximoId = 1;
            return;
        };

        let conteudo = fs.readFileSync("alunos.json", "utf-8");

        if (conteudo.trim() === "") {
            alunos = [];
            proximoId = 1;
            return;
        }
        else {
            alunos = JSON.parse(conteudo);
            encontraProximoId()
            console.log("carregando...");
    };
    } catch (erro){
        console.log("Erro: Ocorreu um erro inesperado ao carregar");
    };
};

function obterAlunos () {
    if (alunos.length === 0) {
            return false;
        };
            return alunos;
};

function encontrarAlunoPorId(id) {
    return alunos.find(aluno => aluno.id === id) || null;
};

function excluirAluno (id) {
    const indice = alunos.findIndex(aluno => aluno.id === id);
        if(indice >= 0){
            alunos.splice(indice, 1);
            return true;
        };
            return false;
};

function adicionarAluno (aluno) {
    alunos.push(aluno);
};

function encontraProximoId () {
    let maiorId = 0;
    for(let i = 0; i < alunos.length; i++) {
        if (alunos[i].id > maiorId) {
            maiorId = alunos[i].id
        };
    };
    return maiorId + 1;
};

module.exports = {
    salvar,
    carregar,
    obterAlunos,
    encontrarAlunoPorId,
    excluirAluno,
    adicionarAluno,
    encontraProximoId,
};