//  index.js
const prompt = require('prompt-sync')();
const { listaAlunos, buscarPorId, editarPorId, removerPorId, cadastrarAlunos, ordenarAlunos, encontrarAluno, alunos, acharAlunos } = require('./service/alunosService');
const { gerarEstatisticaGeral } = require('./service/relatorioService');
const { salvar, carregar, encontraProximoId } = require('./service/repository');
const { validarNome, validarCadastroNome, validarNota } = require('./utils/validacoes');

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
            let nome = String(prompt("Informe o nome do aluno: "));
            let nota = Number(prompt("Informe a nota do aluno (0 a 10): "));

            const resultado = cadastrarAlunos(nome, nota);
            console.log(resultado.mensagem);
            
            if (resultado.sucesso){
                salvar();
            };
            break;
        case 2:
                listaAlunos();
            break;
        case 3:
                buscarPorId();
            break;
        case 4:
            const idAluno = Number(prompt("Informe o ID do aluno para a edição: "));

            const alunos = acharAlunos()
                if (!alunos.sucesso) {
                    console.log(alunos.mensagem)
                    break
                };

            const edit_encontrado = encontrarAluno(idAluno);
                if (!edit_encontrado.sucesso) {
                    console.log(edit_encontrado.mensagem);
                    break;
                };
            const edit_aluno = edit_encontrado.dados;

            console.log("");
            console.log("-- INFORMAÇÕES DO(A) ALUNO(A): --");
            console.log(`ID: ${edit_aluno.id}`);
            console.log(`NOME: ${edit_aluno.nome}`);
            console.log(`NOTA: ${edit_aluno.nota}`);
            console.log(`STATUS: ${edit_aluno.status}`);
            console.log(`--------------------------------------------------`);
            console.log("");

                let resposta_edit = prompt("DESEJA CONTINUAR COM A EDIÇÃO? (S/N) ");
                resposta = resposta_edit.toLowerCase();

            if (resposta === 's') {
                let newNome = prompt("Informe o novo nome: ");
                let newNota = prompt("Informe a nova nota: ");
                let novaNota = newNota === "" ? undefined : Number(newNota);

                const resultado = editarPorId(idAluno, newNome, novaNota)
                console.log(resultado.mensagem)

                if (resultado.sucesso){
                    salvar(); //salva a edição
                };
            };
            break;
        case 5:
                let id_aluno = Number(prompt("Informe o ID do aluno que deseja remover: "));
                    const achado = acharAlunos();
                        if (!achado.sucesso) {
                            console.log(achado.mensagem);
                            break;
                        };

                    const encontrado = encontrarAluno(id_aluno);
                        if (!encontrado.sucesso) {
                            console.log(encontrado.mensagem);
                            break;  
                        };
                    const aluno = encontrado.dados;

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
                            const resultado = removerPorId(id_aluno);
                            console.log(resultado.mensagem)
                            salvar(); //salva a remoção
                        };
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