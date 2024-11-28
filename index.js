const app = require('./server');

if (!process.env.VERCEL) {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}
