const { Router } = require('express');
const { alunoController } = require('../Controllers/alunoController');
const alunoRoutes = Router();


alunoRoutes.get('/', alunoController.listarTodos);
alunoRoutes.get('/:id', alunoController.encontrarPorId);
alunoRoutes.post('/', alunoController.cadastrarAluno);
alunoRoutes.delete('/:id', alunoController.deletarAluno);
alunoRoutes.put('/:id', alunoController.editarAluno)

module.exports = alunoRoutes;