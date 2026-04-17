const { Router } = require('express');
const { turmasController } = require('../Controllers/turmasController');
const authMiddleware = require('../../../Middleware/authMiddleware');
const turmasRoutes = Router();

turmasRoutes.post('/', turmasController.criarTurma);

module.exports = turmasRoutes;