const express = require('express');
const app = express();
const port = 3000;
const { carregar } = require('./src/Services/repository');
const alunoRoutes = require('./src/Routes/alunoRoutes');
const logMiddleware = require('./src/Middleware/logMiddleware');
app.use(express.json());
app.use(logMiddleware)

app.use('/alunos', alunoRoutes)

app.listen(port, () => {
    carregar()
    console.log(`🌍 Servidor rodando em: http://localhost:${port}`);
    console.log(`⌨️  Pressione CTRL + C para desligar o servidor.`);
});