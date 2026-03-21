const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1> Servidor de alunos online! </h1> <p>O back - end esta rodando</p>')
});

app.listen(port, () => {
    console.log(`\n✅ SUCESSO!`);
    console.log(`🌍 Servidor rodando em: http://localhost:${port}`);
    console.log(`⌨️  Pressione CTRL + C para desligar o servidor.`);
});