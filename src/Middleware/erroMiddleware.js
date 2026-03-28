const erroMiddleware = (err, req, res, next) => 
    {
        const status = err.status || 500;
        const mensagem = err.message || "Erro interno no servidor";

        console.log(`[ERRO]: ${req.method} ${req.url}: ${mensagem}`);

        res.status(status).json({ 
            erro: true,
            status: status,
            mensagem: mensagem
        });
    };

module.exports = erroMiddleware 