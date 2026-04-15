//validacoes.js
const { alunoRepository } = require("../Services/repository");

class validacoes {
    static validarNome(nome) {
        if (nome.trim() === "" || !isNaN(nome) || nome.length < 3) {
            return false;
        };
            return true;
    };

    static async validarCadastroNome(nome) {
        const alunoExistente = await alunoRepository.encontrarAlunoPorNome(nome);
        if (alunoExistente) {
            return false;
        };
            return true;
    };

    static validarNota (nota) { // Esta função tem o trabalho de validar se a nota esta entre 0 e 10, nada a mais nem a menos
        if (!isNaN(nota)) {
            if (nota < 0 || nota > 10) {
                return false;
            };
        };
                return true;
    };

    static async validarId(id) {
        if (Number.isNaN(id) || id <= 0) {
            return false;
        };
            const rows = await alunoRepository.encontrarAlunoPorId(id);
            return (rows.length > 0) ? rows[0] : null;
    };

    static calcularStatus (nota) { // Esta função tem o trabalho de verificar as notas e informar ao sistema a situação do aluno, com base nas notas
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
}
module.exports = { 
    validacoes
};