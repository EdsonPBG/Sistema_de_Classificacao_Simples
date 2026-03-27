const { Router } = require('express');
const { alunoController } = require('../Controllers/alunoController');
const authMiddleware = require('../Middleware/authMiddleware');
const alunoRoutes = Router();


alunoRoutes.get('/', alunoController.listarTodos);
alunoRoutes.get('/:id', alunoController.encontrarPorId);
alunoRoutes.post('/', alunoController.cadastrarAluno);
alunoRoutes.delete('/:id', authMiddleware, alunoController.deletarAluno);
alunoRoutes.put('/:id', authMiddleware, alunoController.editarAluno)

module.exports = alunoRoutes;