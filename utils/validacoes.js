function validarNome (nome) {
    if (nome.trim() === "" || !isNaN(nome) || nome.length < 3) {
        console.log("Erro: Nome invalido! Tente novamente");
        return false;
    };
        return true;
};

function validarNota (nota) { // Esta função tem o trabalho de validar se a nota esta entre 0 e 10, nada a mais nem a menos
    if (!isNaN(nota)) {
        if (nota < 0 || nota > 10) {
            console.log("ERRO: Nota menor do que zero ou maior do que dez, tente novamente!");
            return false;
        };
    };
            return true;
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

module.exports = { 
    validarNome, 
    validarNota, 
    calcularStatus
};