// repository.js
const pool = require ('../DataBase/database')

class alunoRepository {
    static async obterAlunos() {
        const [alunos] = await pool.query('SELECT * FROM alunos');
            return (alunos.length === 0) ? false : alunos;
    };

    static async encontrarAlunoPorId(id) {
        const [alunos] = await pool.query('SELECT * FROM alunos WHERE id_aluno = ?', [id]);
            return alunos;
    };

    static async excluirAluno(id) {
        const [alunos] = await pool.query('DELETE FROM alunos WHERE id_aluno = ?', [id]);
            return alunos.affectedRows > 0 ? true : false;
    };

    static async adicionarAluno(nome, nota, turma, status) {
        const querySql = 'INSERT INTO alunos(nome_aluno, nota_aluno, turma_aluno, status_aluno) VALUES (?,?,?,?)';
        let [resultado] = await pool.query(querySql, [nome, nota, turma, status]);
            return resultado.insertId
    };

    static async atualizarAluno(id, nome, nota, status) {
        const querySql = 'UPADTE alunos SET nome_aluno = ?, nota_aluno = ?, status_aluno = ? WHERE id_aluno = ?';
        const parametros = [nome, nota, status, id];
        const [resultado] = await pool.query(querySql, parametros);
            return (resultado.affectedRows > 0) ? true : false;
    };

    static async encontrarAlunoPorNome(nome) {
        const [alunos] = await pool.query('SELECT * FROM alunos WHERE nome_aluno = ?', [nome]);
            return (alunos.length > 0) ? alunos[0] : false;
    };
};

module.exports = {
    alunoRepository
};