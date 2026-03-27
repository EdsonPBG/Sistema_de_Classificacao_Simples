const logMiddleware = (req, res, next) =>
    {
        console.log(`[${new Date().toLocaleString()}] ${req.method} em ${req.url}`);
        next()
    };

module.exports = logMiddleware;