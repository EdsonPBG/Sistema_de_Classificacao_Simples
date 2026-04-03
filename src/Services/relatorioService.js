//relatorioService.js
const { obterAlunos } = require("./repository");
const pool = require('../DataBase/database');
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

static async filtroAvançado (status, turma) 
    {
        let querySql = 'SELECT * FROM alunos WHERE 1 = 1';
        let parametros = [];
        
            if (status) 
            {
                querySql += ' AND status = ?';
                parametros.push(status);
            };

            if (turma)
            {
                querySql += ' AND turma = ?';
                parametros.push(turma);
            };
            const [lista] = await pool.query(querySql, parametros);

            if (lista.length == 0) 
                {
                    const erro = new Error("Nenhum aluno encontrado para essa turma");
                    erro.status = 404;
                    throw erro;
                };
            
            return lista;
    };
}

module.exports = {
    relatorioService
};