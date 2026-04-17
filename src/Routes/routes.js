const turmasRoutes = require('../Modules/Turmas/Routes/turmasRoutes');
const alunoRoutes = require('../Modules/Alunos/Routes/alunoRoutes');
const { Router } = require('express');
const Routers = Router()

Routers.use('/alunos', alunoRoutes);
Routers.use('/turmas', turmasRoutes);

module.exports = Routers;