//relatorioService.js
const { obterAlunos } = require("./repository");
class relatorioService
{
    static mediaGeral () {
        const alunos = obterAlunos();
        let soma = 0.0;
        let media = 0.0;

        if (!alunos || alunos.length <= 0) throw new Error("Não existem alunos cadastrados! Por favor, cadastre");

        for (let i = 0; i < alunos.length; i++) 
        {
            let aluno = alunos[i];
            soma = soma + aluno.nota;
        };

        media = ( soma/alunos.length ).toFixed(2);

        return media;
    };

    static melhorPiorAluno () 
    {
        const alunos = obterAlunos();

        if (!alunos || alunos.length <= 0) throw new Error("Não existem alunos cadastrados! Por favor, cadastre");

        let melhorAluno = alunos[0];
        let piorAluno = alunos[0];

        for (let i = 1; i < alunos.length; i++) {
            const aluno = alunos[i]
            if (aluno.nota > melhorAluno.nota)
            {
                melhorAluno = aluno;
            }
            else if (aluno.nota < piorAluno.nota) 
            {
                piorAluno = aluno;
            };
        };
            return { melhor: melhorAluno, pior: piorAluno };
    };
};

module.exports = {
    relatorioService
};