// alunosService.js
const prompt = require('prompt-sync')();
const { validarNome, validarNota, calcularStatus, validarCadastroNome, validarId } = require('../../utils/validacoes');
const { encontrarAlunoPorId, excluirAluno, adicionarAluno, encontraProximoId, obterAlunos } = require('./repository'); 

class AlunosService {
    static cadastrar(nome, nota) {
        if (!validarNome(nome)) {
            throw new Error("Falha na validação do nome: Nome muito curto ou inválido.");
        };
        if (!validarCadastroNome(nome)) {
            throw new Error("ERRO: Já existe um aluno com esse nome no sistema.");    
        };
        if (!validarNota(nota)){
            throw new Error("ERRO: Nota menor do que zero ou maior do que dez, tente novamente!");
        };

        let status = calcularStatus(nota);

        const aluno = {
            id: encontraProximoId(),
            nome: nome,
            nota: nota,
            status: status
        };

        adicionarAluno(aluno);
        return aluno
    };

    static editar(id, nome, nota) {
        const encontrado = encontrarAlunoPorId(id);
        if (!encontrado) {
            throw new Error(`Aluno com o id: ${id} não encontrado! Tente novamente`);
        };

        if (nome && nome.trim() !== "") 
        {
            if (!validarCadastroNome(nome)) throw new Error("Nome novo invalido ou já existente"); 
            { 
                encontrado.nome = nome
            };
        };

        if (nota !== undefined && nota !== "") 
        {
            if (!validarNota(nota)) throw new Error("Nova nota invalida"); 
            {
                encontrado.nota = nota
                encontrado.status = calcularStatus(encontrado.nota)
            };
        };
        return encontrado;
    };

    static removerPorId (id) {// Esta função serve para remover o aluno existente.
        if (!validarId(id)) {
            throw new Error("Erro: Id invalido! Tente novamente");
        };

        if (!excluirAluno(id)) {
            throw new Error("Erro: Falha ao tentar excluir o aluno");
        };

        return "Aluno Excluido com sucesso!";
    };

    static listaAlunos () { // Esta função verifica se existem alunos no array, se existir mostrar todos os alunos
        const alunos = obterAlunos();
        if (!alunos || alunos.length === 0) 
        {
            throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
        }
        return alunos;
    };

    static buscarPorId (id) { // Esta função tem o trabalho de procurar o aluno pelo id informado.
        const alunos = obterAlunos()

        validarId(id)
        const aluno = encontrarAlunoPorId(id);

        if (!alunos) {
            throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
        };

        if (!aluno) { // Essa verificação serve para identificar que o aluno não foi encontrado ou id não existe
                throw new Error(`Aluno com o id: ${id} não encontrado! Tente novamente`);
        };

        return aluno;
    };

    static encontrarAluno(id) {
        const encontrado = encontrarAlunoPorId(id);

        if (!encontrado) {
            throw new Error(`Aluno com o id: ${id} não encontrado! Tente novamente`);
        };
            return encontrado;
    };

    static acharAlunos() {
        const achado = obterAlunos();

        if (!achado) {
            throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
        };
            return achado;
    };

    static ordenarPorNome () {
        const alunos = obterAlunos();
        if (!alunos) {
            throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
        };

        return[...alunos].sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
    };

    static ordenarPorNota () {
        const alunos = obterAlunos();
        if (!alunos) {
            throw new Error("Não existem alunos cadastrados, por favor, cadastre!");
        };
        return [...alunos].sort((a, b) => b.nota - a.nota);
    };

    static ordenarAlunos (opcao) {
        const alunos = obterAlunos()
        if (alunos.length === 0) throw new Error("Lista Vazia!")
            
        switch (opcao) {
            case 1:
                   return this.ordenarPorNome();
            case 2:
                   return this.ordenarPorNota();
            case 0:
                    console.log("Saindo...");
                break;
            default:
                throw new Error("Opção incorreta, escolha a opção certa!");
        };
    };

};

module.exports = {
    AlunosService
};