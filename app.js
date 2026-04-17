const express = require('express');
const pool = require('./src/DataBase/database');
const app = express();
const port = 3000;
const logMiddleware = require('./src/Middleware/logMiddleware');
const erroMiddleware = require('./src/Middleware/erroMiddleware');
const Routers = require('./src/Routes/routes');
app.use(express.json());
app.use(logMiddleware)

app.use('/', Routers)

app.use(erroMiddleware)

app.listen(port, () => {
    console.log(`🌍 Servidor rodando em: http://localhost:${port}`);
    console.log(`⌨️  Pressione CTRL + C para desligar o servidor.`);
});

(async () => {
    try
    {
        const [linhas] = await pool.query('SELECT 1 + 1 AS resultado');
        console.log(`Conexão com o banco de dados estabelecida com sucesso: Resultado ${linhas[0].resultado}`);
    }
    catch (erro)
    {
        console.error(`Erro ao conectar com o banco de dados ${erro.message}`);
    }
}) ();