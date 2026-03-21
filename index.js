//  index.js
const prompt = require('prompt-sync')();
const { AlunosService } = require('./service/alunosService');
const { relatorioService } = require('./service/relatorioService');
const { salvar, carregar} = require('./service/repository');

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
            try {
                let nome = String(prompt("Informe o nome do aluno: "));
                let nota = Number(prompt("Informe a nota do aluno (0 a 10): "));

                const mensagem = AlunosService.cadastrar(nome, nota);
                console.log(mensagem);
                salvar();
            } catch (erro) {
                console.error("ALERTA - " + erro.message)
            }
            break;
        case 2:
            try{
                const alunos = AlunosService.listaAlunos()

                alunos.forEach(aluno => {
                    console.log("-- INFORMAÇÕES DO ALUNO(A):");
                    console.log("");
                    console.log(`ID: ${aluno.id}`);
                    console.log(`NOME: ${aluno.nome}`);
                    console.log(`NOTA: ${aluno.nota}`);
                    console.log(`STATUS: ${aluno.status}`);
                    console.log(`--------------------------------------------------`);
                    console.log("")
                });
            } catch (erro) {
                console.error("ALERTA - " + erro.message)
            };
            break;
        case 3:
            try{    
                let id_aluno = Number(prompt("Informe o ID do aluno para a busca: "));
                const aluno = AlunosService.buscarPorId(id_aluno);

                if (aluno) {
                    console.log("-- INFORMAÇÕES DO ALUNO(A):");
                    console.log("");
                    console.log(`ID: ${aluno.id}`);
                    console.log(`NOME: ${aluno.nome}`);
                    console.log(`NOTA: ${aluno.nota}`);
                    console.log(`STATUS: ${aluno.status}`);
                    console.log(`--------------------------------------------------`);
                    console.log("");
                    break;
                };

            } catch (erro) {
                console.error("ALERTA - " + erro.message)
            };
            break;
        case 4:
            try{
                const idAluno = Number(prompt("Informe o ID do aluno para a edição: "));
                const aluno = AlunosService.encontrarAluno(idAluno);

                console.log("");
                console.log("-- INFORMAÇÕES DO(A) ALUNO(A): --");
                console.log(`ID: ${aluno.id}`);
                console.log(`NOME: ${aluno.nome}`);
                console.log(`NOTA: ${aluno.nota}`);
                console.log(`STATUS: ${aluno.status}`);
                console.log(`--------------------------------------------------`);
                console.log("");

                let resposta_edit = prompt("DESEJA CONTINUAR COM A EDIÇÃO? (S/N) ").toLowerCase();

                if (resposta_edit === 's') {
                    let newNome = prompt("Informe o novo nome: ");
                    let newNota = prompt("Informe a nova nota: ");
                    let novaNota = newNota === "" ? undefined : Number(newNota);

                    const mensagem = AlunosService.editar(idAluno, newNome, novaNota);
                    console.log(mensagem)

                    if (mensagem){
                        salvar(); //salva a edição
                    };
                }
            } catch (erro) {
                console.error("ALERTA - " + erro.message)
            };
            break;
        case 5:
        try {
            let id_aluno = Number(prompt("Informe o ID do aluno que deseja remover: "));
            const aluno = AlunosService.encontrarAluno(id_aluno);

            console.log("");
            console.log("INFORMAÇÕES DO(A) ALUNO(A):");
            console.log(`ID: ${aluno.id}`);
            console.log(`NOME: ${aluno.nome}`);
            console.log(`NOTA: ${aluno.nota}`);
            console.log(`STATUS: ${aluno.status}`);
            console.log(`--------------------------------------------------`);
            console.log("");

            let resposta = prompt("DESEJA CONTINUAR COM A EXCLUSÃO? (S/N) ").toLowerCase()

                if (resposta === 's') {
                    const mensagem = AlunosService.removerPorId(id_aluno);
                    console.log(mensagem)
                    salvar(); //salva a remoção
                } else {
                    console.log("Exclusão cancelada");
                };
        } catch (erro) {
            console.error("ERRO NA OPERAÇÃO: " + erro.message); 
        };
            break;
        case 6:
            try
            {
                console.log("");
                console.log("-- OPÇÕES PARA ORDENAÇÃO --");
                console.log("");
                console.log("1. Ordenar por Nome");
                console.log("2. Ordenar por Nota");
                console.log("0. Sair");

                let opcao = Number(prompt("Escolha um numero: "));
                console.log("");

                const listaOrdenada = AlunosService.ordenarAlunos(opcao);

                listaOrdenada.forEach(aluno => {
                    console.log(`[${aluno.id}] ${aluno.nome} - NOTA: ${aluno.nota}`)
                });
            } 
            catch (erro) 
            {
                console.error("ALERTA - " + erro.message)
            }
            break;
        case 7:
            try
            {
                let opcao;
                do 
                {
                    console.log("");
                    console.log("-- OPÇÕES PARA RELATORIOS --");
                    console.log("");
                    console.log("1. Relatorio de media geral");
                    console.log("2. Relatorio do melhor aluno e do pior aluno");
                    console.log("0. Sair");

                    opcao = Number(prompt("Escolha um numero: "));
                    console.log("");

                    if (opcao === 1) 
                    {
                        const media = relatorioService.mediaGeral();
                        console.log(`A média geral da turma é ${media}`);
                    }
                    else if (opcao === 2)
                    {
                        const {melhor, pior} = relatorioService.melhorPiorAluno();
                        console.log(`MELHOR: ${melhor.nome} (${melhor.nota})`);
                        console.log(`PIOR: ${pior.nome} (${pior.nota})`);
                    }
                } while (opcao !== 0);
            } 
            catch (erro) 
            {
                console.error("ALERTA - " + erro.message)
            };
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