const authMiddleware = (req, res, next) => 
    {
        try
        {
            const auth = req.headers['authorization'];
            if (auth == "senha123") {
                return next();
            };

            return res.status(401).json({ mensagem: "Acesso negado: Você não tem permissão para acessar essa sessão" });
        } 
        catch (erro)
        {
            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        };
    };

module.exports = authMiddleware;