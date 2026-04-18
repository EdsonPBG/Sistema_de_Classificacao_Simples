//turmasService.js
const { validacoes } = require('../../../utils/validacoes');
const { turmasRepository } = require('../Repository/turmasRepository');

class turmasService
{
    static async cadastrarTurmas(nome, ano)
    {
        if (!validacoes.validarNome(nome)) throw new Error("Falha na validação do nome: Nome muito curto ou inválido.");

        const turmaExistente = await turmasRepository.buscarPorNomeAno(nome, ano);
            if (turmaExistente.length > 0) throw new Error("Turma com nome e ano ja existente");

        const turma = await turmasRepository.cadastrarTurmas(nome, ano);
            return {
                id_turma: turma,
                nome,
                ano
            };
    };

    static async listarTurmas()
    {
        const turma = await turmasRepository.listarTurmas();
            if (!turma) throw new Error("Não existem turmas cadastradas!");

        return turma
    };

    static async excluirTurmas(id)
    {
        const contarTurmas = await turmasRepository.contarTurmas(id);
            if (contarTurmas > 0) throw new Error("Não é possível apagar uma turma com alunos dentro!");
        const excluirTurmas = await turmasRepository.excluirTurmas(id);
            if (!excluirTurmas) throw new Error(`Aluno com o id: ${id} não encontrado! Tente novamente`);

        return "Turma excluída com sucesso!";
    };

    static async editarTurmas(id, nome, ano)
    {
        const turma = await validacoes.validarIdTurma(id);
        if (!turma) throw new Error("Id informado não existe!!");        
        
        let novoNome = nome ?? turma.nome_turma;
        let novoAno = (ano !== undefined && ano !== "") ? ano : turma.ano_letivo;
        
        console.log("DADOS PARA UPDATE:", { id, novoNome, novoAno });
        const resultado = await turmasRepository.editarTurmas(id, novoNome, novoAno);
            if(!resultado) throw new Error(`Erro ao atualizar os dados do banco`);

        return { 
            id, 
            novoNome, 
            novoAno
        };
    };
};

module.exports = 
{
    turmasService
};