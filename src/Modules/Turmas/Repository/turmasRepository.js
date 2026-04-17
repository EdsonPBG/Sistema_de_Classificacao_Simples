//turmasRepository.js
const pool = require('../../../DataBase/database')

class turmasRepository
{
    static async cadastrarTurmas(nome, ano)
    {
        let querySql = 'INSERT INTO turmas (nome_turma, ano_letivo) VALUES (?,?)';
        let [resultado] = await pool.query(querySql, [nome, ano]);
            return resultado.insertId   
    };

        static async buscarPorNomeAno(nome, ano)
    {
        let querySql = 'SELECT nome_turma as nome, ano_letivo as ano FROM turmas WHERE nome_turma = ? AND ano_letivo = ?';
        let [resultado] = await pool.query(querySql, [nome, ano]);
            return resultado;
    };
};

module.exports =
{
    turmasRepository
};