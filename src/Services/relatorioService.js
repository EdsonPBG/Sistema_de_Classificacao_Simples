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

    static filtroAvançado (status, turma) 
    {
        let lista = obterAlunos();
            if (status) 
            {
                lista = lista.filter(a => a.status.toLowerCase() == status.toLowerCase());
            };

            if (turma)
            {
                lista = lista.filter(a => a.turma?.toLowerCase() == turma.toLowerCase());
                if (lista.length == 0) 
                {
                    const erro = new Error("Nenhum aluno encontrado para essa turma");
                    erro.status = 404;
                    throw erro;
                };
            };
            return lista;
    };
};

module.exports = {
    relatorioService
};