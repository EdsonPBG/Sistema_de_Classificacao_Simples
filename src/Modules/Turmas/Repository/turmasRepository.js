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

    static async listarTurmas()
    {
        const [turmas] = await pool.query('SELECT * FROM turmas');
            return (turmas.length === 0) ? false : turmas
    };

    static async excluirTurmas(id)
    {
        const [turmas] = await pool.query('DELETE FROM turmas WHERE id_turma = ?', [id])
            return (turmas.affectedRows > 0) ? true : false;
    };

    static async editarTurmas(id, nome, ano)
    {
        let querySql = 'UPDATE turmas SET nome_turma = ?, ano_letivo = ? WHERE id_turma = ?';
        let parametros = [nome, ano, id];
        const [resultado] = await pool.query(querySql, parametros);
            return (resultado.affectedRows > 0) ? true : false;
    };

    static async buscarPorNomeAno(nome, ano)
    {
        let querySql = 'SELECT nome_turma as nome, ano_letivo as ano FROM turmas WHERE nome_turma = ? AND ano_letivo = ?';
        let [resultado] = await pool.query(querySql, [nome, ano]);
            return resultado;
    };

    static async contarTurmas(id)
    {
        let querySql = 'SELECT COUNT(*) AS total FROM alunos WHERE id_turma = ?';
        let [resultado] = await pool.query(querySql, [id]);
            return (resultado.length === 0) ? false : resultado[0].total;
    };

    static async encontrarTurmaPorId(id)
    {
        const [turma] = await pool.query('SELECT * FROM turmas WHERE id_turma = ?', [id]);
            return (turma.length > 0) ? turma[0] : false;
    };
};

module.exports =
{
    turmasRepository
};