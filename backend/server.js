const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Importa os módulos da nova estrutura
const initializeDatabase = require('./src/db/database');
const dataController = require('./src/controllers/dataController');
const apiRoutes = require('./src/routes/api');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serve static frontend files (Caminho corrigido para a pasta 'frontend')
// O caminho é: backend/ -> .. -> frontend
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Rotas da API
app.use('/api', apiRoutes);

// Fallback para index.html para SPA
app.get('*', (req, res) => {
    // Serve o index.html da pasta 'frontend'
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Conecta ao banco de dados e inicia o servidor
initializeDatabase()
    .then(db => {
        dataController.setDatabase(db);
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Falha ao iniciar o servidor devido a erro no banco de dados:', err);
        process.exit(1);
    });
