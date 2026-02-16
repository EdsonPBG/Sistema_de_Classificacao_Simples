const prompt = require('prompt-sync')();
const { listaAlunos, buscarPorId, editarPorId, removerPorId, cadastrarAlunos, ordenarAlunos } = require('./service/alunosService');
const { gerarEstatisticaGeral } = require('./service/relatorioService');
const { salvar, carregar } = require('./service/repository');

carregar();
let opcao;
do{
console.log("-- Menu dos alunos --");
console.log("");
console.log("1. Cadastrar Aluno");
console.log("2. Listar Alunos");
console.log("3. Buscar Alunos Por ID");
console.log("4. Editar Aluno Por ID");
console.log("5. Excluir Aluno Por ID");
console.log("6. Ordenar Alunos");
console.log("7. Relatorios");
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
        case 6:
                ordenarAlunos();
            break;
        case 7:
                gerarEstatisticaGeral();
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