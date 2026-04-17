//turmasService.js
const { validacoes } = require('../../../utils/validacoes');
const { turmasRepository } = require('../Repository/turmasRepository');

class turmasService
{
    static async cadastrarTurma(nome, ano)
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
};

module.exports = 
{
    turmasService
};