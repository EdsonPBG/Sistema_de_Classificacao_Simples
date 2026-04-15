// repository.js
const pool = require ('../DataBase/database')

class alunoRepository {
    static async obterAlunos() {
        const [alunos] = await pool.query('SELECT * FROM alunos');
            return (alunos.length === 0) ? false : alunos;
    };

    static async encontrarAlunoPorId(id) {
        const [aluno] = await pool.query('SELECT * FROM alunos WHERE id_aluno = ?', [id]);
            return (aluno.length > 0) ? aluno : false;
    };

    static async excluirAluno(id) {
        const [alunos] = await pool.query('DELETE FROM alunos WHERE id_aluno = ?', [id]);
            return alunos.affectedRows > 0 ? true : false;
    };

    static async adicionarAluno(nome, nota, turma, status, cpf, email) {
        const querySql = 'INSERT INTO alunos(nome_aluno, nota_aluno, turma_aluno, status_aluno, cpf_aluno, email_aluno) VALUES (?,?,?,?,?,?)';
        let [resultado] = await pool.query(querySql, [nome, nota, turma, status, cpf, email]);
            return resultado.insertId
    };

    static async atualizarAluno(id, nome, nota, turma, status, cpf, email) {
        const querySql = 'UPDATE alunos SET nome_aluno = ?, nota_aluno = ?, turma_aluno = ?, status_aluno = ?, cpf_aluno = ?, email_aluno = ? WHERE id_aluno = ?';
        const parametros = [nome, nota, turma, status, cpf, email, id];
        const [resultado] = await pool.query(querySql, parametros);
            return (resultado.affectedRows > 0) ? true : false;
    };

    static async encontrarAlunoPorNome(nome) {
        const [alunos] = await pool.query('SELECT * FROM alunos WHERE nome_aluno = ?', [nome]);
            return (alunos.length > 0) ? alunos[0] : false;
    };

    static async buscarPorCPF(cpf) {
        const [cpf_aluno] = await pool.query('SELECT * FROM alunos WHERE cpf_aluno = ?', [cpf]);
            return (cpf_aluno.length > 0) ? cpf_aluno : null;
    };
};

module.exports = {
    alunoRepository
};