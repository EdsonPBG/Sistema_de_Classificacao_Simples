const { Router } = require('express');
const { turmasController } = require('../Controllers/turmasController');
const authMiddleware = require('../../../Middleware/authMiddleware');
const turmasRoutes = Router();

turmasRoutes.get('/', turmasController.listarTurmas);
turmasRoutes.post('/', turmasController.criarTurma);
turmasRoutes.delete('/:id', authMiddleware, turmasController.excluirTurmas);
turmasRoutes.put('/:id', authMiddleware, turmasController.editarTurmas);

module.exports = turmasRoutes;